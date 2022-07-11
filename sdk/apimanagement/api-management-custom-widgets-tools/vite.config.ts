import * as path from "path"
import {defineConfig} from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Custom widget tools",
      fileName: (format) => `index.${format}.js`,
    },
  },
})
