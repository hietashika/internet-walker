// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), playformCompress()],
	devToolbar: {
		enabled: false,
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@use "@styles/tools/_mixin.scss" as *;
					@use "@styles/tools/_function.scss" as *;`,
				},
			},
		},
	},
});
