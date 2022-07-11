import {defineConfig} from "vitest/config"
import {EDITOR_DATA_KEY} from "./src"
import valuesUrl from "./test/valuesUrl.json"

export default defineConfig({
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: `http://localhost:8080/?${EDITOR_DATA_KEY}=${JSON.stringify(valuesUrl)}`,
      },
    },
  },
})
