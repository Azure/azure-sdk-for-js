// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import initializeCustomization from "../src/commands/customization/init.ts";

const fixtures: string[] = [];

afterEach(async () => {
  vi.restoreAllMocks();
  for (const directory of fixtures.splice(0)) {
    await fs.rm(directory, { recursive: true, force: true });
  }
});

describe("customization init", () => {
  it("initializes separate generated source while preserving the public root entry point", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const sourceDirectory = path.join(directory, "src");
    await fs.mkdir(sourceDirectory);
    const source = {
      "index.ts": 'export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";\n',
      "widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
    };
    for (const [file, contents] of Object.entries(source)) {
      await fs.writeFile(path.join(sourceDirectory, file), contents);
    }
    const manifest = {
      name: "@azure/customization-init-fixture",
      version: "1.0.0",
      type: "module",
      exports: {
        "./package.json": "./package.json",
        ".": { import: "./dist/esm/index.js" },
      },
      scripts: { build: "echo build" },
    };
    await fs.writeFile(path.join(directory, "package.json"), JSON.stringify(manifest));
    await fs.writeFile(
      path.join(directory, "warp.config.json"),
      JSON.stringify({
        exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
        targets: [{ name: "esm", tsconfig: "./tsconfig.src.json" }],
      }),
    );
    await fs.writeFile(
      path.join(directory, "tsconfig.src.json"),
      JSON.stringify({
        compilerOptions: { rootDir: "./src", outDir: "./dist/esm" },
        include: ["./src/**/*.ts"],
      }),
    );
    vi.spyOn(process, "cwd").mockReturnValue(directory);

    await expect(initializeCustomization()).resolves.toBe(true);

    expect((await fs.readdir(sourceDirectory)).sort()).toEqual(["generated", "index.ts"]);
    for (const [file, contents] of Object.entries(source)) {
      await expect(
        fs.readFile(path.join(sourceDirectory, "generated", file), "utf8"),
      ).resolves.toBe(contents);
    }
    expect(await fs.readFile(path.join(sourceDirectory, "index.ts"), "utf8")).toContain(
      'export * from "./generated/index.js";',
    );
    expect(await fs.readdir(directory)).not.toContain("generated");
    const updatedManifest = JSON.parse(
      await fs.readFile(path.join(directory, "package.json"), "utf8"),
    );
    expect(updatedManifest.scripts).toEqual(manifest.scripts);
  });

  it("preserves a nested public entry point during initialization", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const source = {
      "index.ts": 'export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";\n',
      "widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
      "api/widgets/index.ts": 'export { getWidget } from "./operations.js";\n',
      "api/widgets/operations.ts": 'export const getWidget = () => ({ name: "example-widget" });\n',
    };
    for (const [file, contents] of Object.entries(source)) {
      const destination = path.join(directory, "src", file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, contents);
    }
    const exports = {
      "./package.json": "./package.json",
      ".": { import: "./dist/esm/index.js" },
      "./api/widgets": { import: "./dist/esm/api/widgets/index.js" },
    };
    await fs.writeFile(
      path.join(directory, "package.json"),
      JSON.stringify({
        name: "@azure/customization-init-fixture",
        version: "1.0.0",
        type: "module",
        exports,
        scripts: { build: "echo build" },
      }),
    );
    await fs.writeFile(
      path.join(directory, "warp.config.json"),
      JSON.stringify({
        exports: {
          "./package.json": "./package.json",
          ".": "./src/index.ts",
          "./api/widgets": "./src/api/widgets/index.ts",
        },
        targets: [{ name: "esm", tsconfig: "./tsconfig.src.json" }],
      }),
    );
    await fs.writeFile(
      path.join(directory, "tsconfig.src.json"),
      JSON.stringify({
        compilerOptions: { rootDir: "./src", outDir: "./dist/esm" },
        include: ["./src/**/*.ts"],
      }),
    );
    vi.spyOn(process, "cwd").mockReturnValue(directory);

    await expect(initializeCustomization()).resolves.toBe(true);

    await expect(
      fs.readFile(path.join(directory, "src", "api", "widgets", "index.ts"), "utf8"),
    ).resolves.toContain('export * from "../../generated/api/widgets/index.js";');
    for (const file of ["api/widgets/index.ts", "api/widgets/operations.ts"] as const) {
      await expect(
        fs.readFile(path.join(directory, "src", "generated", file), "utf8"),
      ).resolves.toBe(source[file]);
    }
    const updatedManifest = JSON.parse(
      await fs.readFile(path.join(directory, "package.json"), "utf8"),
    );
    expect(updatedManifest.exports).toEqual(exports);
  });
});
