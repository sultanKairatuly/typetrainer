import { defineConfig } from "vite";
import postcssShortColor from "postcss-short-color";
import postcssAutoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import postcssImports from "postcss-import";
import postcssVars from "postcss-css-variables";
import postcssSimpleVars from "postcss-simple-vars";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssShortColor,
        postcssNesting,
        postcssAutoprefixer,
        postcssImports,
        postcssSimpleVars,
      ],
    },
  },
});
