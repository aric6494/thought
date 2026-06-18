<script lang="ts">
import { onMount } from "svelte";

interface Props {
	repo: string;
	repoId: string;
	category: string;
	categoryId: string;
	mapping?: "pathname" | "url" | "title" | "og:title" | "number" | "specific";
	term?: string;
	strict?: boolean;
	reactions?: boolean;
	inputPosition?: "top" | "bottom";
	lightTheme?: string;
	darkTheme?: string;
	lang?: string;
}

let {
	repo,
	repoId,
	category,
	categoryId,
	mapping = "pathname",
	term,
	strict = true,
	reactions = true,
	inputPosition = "top",
	lightTheme = "light",
	darkTheme = "dark",
	lang = "zh-CN"
}: Props = $props();

let giscusContainer: HTMLDivElement | undefined = $state();

const sendMessage = (message: any) => {
	const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement;
	if (!iframe) return;
	iframe.contentWindow?.postMessage({ giscus: message }, "https://giscus.app");
};

const getCurrentTheme = (): string => {
	const isDark = document.documentElement.dataset.theme === "dark";
	return isDark ? darkTheme : lightTheme;
};

const handleThemeChange = () => {
	const currentTheme = getCurrentTheme();
	sendMessage({ setConfig: { theme: currentTheme } });
};

onMount(() => {
	if (!giscusContainer) return;

	const script = document.createElement("script");
	script.src = "https://giscus.app/client.js";
	script.async = true;
	script.crossOrigin = "anonymous";

	const initialTheme = getCurrentTheme();
	script.setAttribute("data-repo", repo);
	script.setAttribute("data-repo-id", repoId);
	script.setAttribute("data-category", category);
	script.setAttribute("data-category-id", categoryId);
	script.setAttribute("data-mapping", mapping);
	if (term) script.setAttribute("data-term", term);
	script.setAttribute("data-strict", String(strict));
	script.setAttribute("data-reactions-enabled", String(reactions));
	script.setAttribute("data-emit-metadata", "0");
	script.setAttribute("data-input-position", inputPosition);
	script.setAttribute("data-theme", initialTheme);
	script.setAttribute("data-lang", lang);

	giscusContainer.appendChild(script);

	// 监听主题变化
	const observer = new MutationObserver(() => {
		handleThemeChange();
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"]
	});

	return () => observer.disconnect();
});
</script>

<div bind:this={giscusContainer} class="giscus-container"></div>

<style>
	:global(.giscus-container) {
		margin-top: 2rem;
	}

	:global(.giscus) {
		color-scheme: light dark;
	}
</style>