import { defineConfig } from "vite";
// note to self... the official vite vue2 plugin (@vitejs/plugin-vue2) does not
// return correct line number on errors.. the community plugin (vite-plugin-vue2)
// appears to do a better job without any known downsides.
import { createVuePlugin as vue} from "vite-plugin-vue2";
import { visualizer } from "rollup-plugin-visualizer";
import typescript from "@rollup/plugin-typescript";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [vue(), typescript()];

  if (mode === "report") {
    plugins.push(
      visualizer({
        filename: "./dist/report.html",
        open: true,
        brotliSize: true,
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "VueDataScreener",
        fileName: "index",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
});
