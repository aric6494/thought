import siteConfig from "./src/utils/config";

const config = siteConfig({
	title: "笔迹",
	prologue: "不完美、谦逊、乐观与个性",
	author: {
		name: "aric",
		email: "hgdihs670@gmail.com",
		link: "https://github.com/aric6494"
	},
	description: "",
	copyright: {
		type: "CC BY-NC-ND 4.0",
		year: "2025"
	},
	i18n: {
		locales: ["en", "zh-cn"],
		defaultLocale: "zh-cn"
	},
	feed: {
		section: "*",
		limit: 20
	},
	latest: "*"
});

export const monolocale = Number(config.i18n.locales.length) === 1;

export default config;
