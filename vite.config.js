import { defineConfig } from "vite";
import postcssShortColor from "postcss-short-color";
import postcssAutoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import postcssImports from "postcss-import";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssShortColor,
        postcssNesting,
        postcssAutoprefixer,
        postcssImports,
      ],
    },
  },
});
