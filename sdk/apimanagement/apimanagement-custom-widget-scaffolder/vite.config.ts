import * as path from "path"
import {defineConfig} from "vite"
import virtual from "vite-plugin-virtual"
import generateScaffoldingDescription from "./scripts/generateScaffoldingDescription"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Custom widget scaffolder",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    virtual({
      "virtual:templates": generateScaffoldingDescription("templates"),
    }),
  ],
  define: {
    "__CONFIG_DEPLOY__": {
      // deploy config for widgets scaffolded locally
      subscriptionId: "<subscription-id>",
      resourceGroupName: "<resource-group>",
      serviceName: "<service-name>",
      managementApiEndpoint: "<management api endpoint>", // e.g. management.azure.com
      apiVersion: "<api version>", // e.g. 2020-06-01-preview
    },
  },
})
