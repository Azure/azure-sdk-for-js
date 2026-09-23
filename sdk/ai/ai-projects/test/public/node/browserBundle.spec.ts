// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isBuiltin } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { describe, expect, it } from "vitest";

describe("browser package exports", () => {
  it.each(["VoiceAgentRealtimeClient", "AIProjectClient"])(
    "bundles %s from the package root without Node.js modules",
    async (exportName) => {
      const modules = new Set<string>();
      const root = fileURLToPath(new URL("../../../", import.meta.url));
      const entry = "virtual:ai-projects-browser-entry";

      await build({
        configFile: false,
        root,
        logLevel: "silent",
        plugins: [
          {
            name: "ai-projects-browser-regression",
            enforce: "pre",
            resolveId(id) {
              if (isBuiltin(id)) {
                throw new Error(`Unexpected Node.js module in browser bundle: ${id}`);
              }
              if (id === entry) {
                return entry;
              }
              return undefined;
            },
            load(id) {
              if (id === entry) {
                return `export { ${exportName} } from "@azure/ai-projects";`;
              }
              return undefined;
            },
            moduleParsed(info) {
              modules.add(info.id);
            },
          },
        ],
        build: {
          write: false,
          minify: false,
          lib: { entry, formats: ["es"] },
          rollupOptions: { input: entry },
        },
      });

      expect(modules).toContain(
        fileURLToPath(new URL("../../../dist/browser/index.js", import.meta.url)).replaceAll(
          "\\",
          "/",
        ),
      );
    },
  );
});
