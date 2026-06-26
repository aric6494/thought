import siteConfig from "./src/lib/config";

const config = siteConfig({
	title: "笔迹",
	prologue: "勇气、不完美、乐观与个性",
	author: {
		name: "aric",
		email: "hgdihs670@gmail.coml",
		link: "https://github.com/aric6494"
	},
	description: "",
	copyright: {
		type: "CC BY-NC-ND 4.0",
		year: "2025-2026"
	},
	timezone: "UTC",
	i18n: {
		locales: ["zh-cn", "en"],
		defaultLocale: "zh-cn"
	},
	pagination: {
		note: 10,
		jotting: 24
	},
	heatmap: {
		unit: "day",
		weeks: 20
	},
	feed: {
		section: "*",
		limit: 20
	},
	latest: "*"
});

export const monolocale = Number(config.i18n.locales.length) === 1;

export default config;
