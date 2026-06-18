import fs from "node:fs";
import path from "node:path";

// 本地字体目录
const FONT_DIR = path.resolve(process.cwd(), "src/fonts");

const fonts: Record<string, string> = {
	en: "NotoSerif-Regular.ttf",
	"zh-cn": "NotoSerifSC-Regular.ttf",
	ja: "NotoSerifJP-Regular.ttf"
};

/**
 * Load local font
 * @param locale locale code
 * @returns ArrayBuffer
 */
export async function loadFont(locale: string) {
	const fileName = fonts[locale];

	if (!fileName) {
		throw new Error(`No font found for locale: ${locale}`);
	}

	const filePath = path.join(FONT_DIR, fileName);

	if (!fs.existsSync(filePath)) {
		throw new Error(`Font file not found: ${filePath}`);
	}

	const buffer = await fs.promises.readFile(filePath);

	return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
