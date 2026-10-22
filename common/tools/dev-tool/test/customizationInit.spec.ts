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
        include: ["./src/index.ts"],
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
        include: ["./src/index.ts", "./src/api/widgets/index.ts"],
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

  it("rejects a legacy merge-based package without changing files", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const files = {
      "package.json": JSON.stringify({
        name: "@azure/customization-init-fixture",
        version: "1.0.0",
        type: "module",
        exports: {
          "./package.json": "./package.json",
          ".": { import: "./dist/esm/index.js" },
        },
        scripts: {
          build: "echo build",
          customize: "dev-tool customization apply && npm run format",
        },
      }),
      "warp.config.json": JSON.stringify({
        exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
        targets: [{ name: "esm", tsconfig: "./tsconfig.src.json" }],
      }),
      "tsconfig.src.json": JSON.stringify({
        compilerOptions: { rootDir: "./src", outDir: "./dist/esm" },
        include: ["./src/**/*.ts"],
      }),
      "generated/index.ts": 'export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";\n',
      "generated/widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
      "src/index.ts": 'export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";\n',
      "src/widgetAnalyticsClient.ts": `export class WidgetAnalyticsClient {
  customMethod() {
    return "This is a custom method!";
  }
}
`,
    };
    for (const [file, contents] of Object.entries(files)) {
      const destination = path.join(directory, file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, contents);
    }
    vi.spyOn(process, "cwd").mockReturnValue(directory);

    await expect(initializeCustomization()).resolves.toBe(false);

    for (const [file, contents] of Object.entries(files)) {
      await expect(fs.readFile(path.join(directory, file), "utf8")).resolves.toBe(contents);
    }
    expect((await fs.readdir(directory)).sort()).toEqual([
      "generated",
      "package.json",
      "src",
      "tsconfig.src.json",
      "warp.config.json",
    ]);
    for (const source of ["src", "generated"]) {
      expect((await fs.readdir(path.join(directory, source))).sort()).toEqual([
        "index.ts",
        "widgetAnalyticsClient.ts",
      ]);
    }
  });

  it("rejects compiler metadata that omits a public source entry point without changing files", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const source = {
      "index.ts": `export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";
export type { Widget } from "./models/index.js";
`,
      "widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
      "models/index.ts": 'export type { Widget } from "./models.js";\n',
      "models/models.ts": "export interface Widget { name: string; }\n",
    };
    for (const [file, contents] of Object.entries(source)) {
      const destination = path.join(directory, "src", file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, contents);
    }
    await fs.writeFile(
      path.join(directory, "package.json"),
      JSON.stringify({
        name: "@azure/customization-init-fixture",
        version: "1.0.0",
        type: "module",
        exports: {
          "./package.json": "./package.json",
          ".": {
            import: "./dist/esm/index.js",
            require: "./dist/commonjs/index.js",
          },
          "./models": {
            import: "./dist/esm/models/index.js",
            require: "./dist/commonjs/models/index.js",
          },
        },
        scripts: { build: "warp build" },
      }),
    );
    await fs.writeFile(
      path.join(directory, "warp.config.json"),
      JSON.stringify({
        exports: {
          "./package.json": "./package.json",
          ".": "./src/index.ts",
          "./models": "./src/models/index.ts",
        },
        targets: [
          { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
          {
            name: "commonjs",
            condition: "require",
            tsconfig: "./tsconfig.commonjs.json",
            moduleType: "commonjs",
          },
        ],
      }),
    );
    for (const [target, module] of [
      ["esm", "NodeNext"],
      ["commonjs", "Node16"],
    ]) {
      await fs.writeFile(
        path.join(directory, `tsconfig.${target}.json`),
        JSON.stringify({
          compilerOptions: {
            rootDir: "./src",
            outDir: `./dist/${target}`,
            module,
            moduleResolution: module,
            target: "ES2023",
            declaration: true,
            strict: true,
          },
          include: ["./src/index.ts"],
        }),
      );
    }
    const originals = new Map<string, string>();
    for (const file of [
      "package.json",
      "warp.config.json",
      "tsconfig.esm.json",
      "tsconfig.commonjs.json",
      ...Object.keys(source).map((file) => path.join("src", file)),
    ]) {
      originals.set(file, await fs.readFile(path.join(directory, file), "utf8"));
    }
    const originalTree = (await fs.readdir(directory, { recursive: true })).sort();
    vi.spyOn(process, "cwd").mockReturnValue(directory);
    const output = vi.spyOn(console, "log");

    await expect(initializeCustomization()).resolves.toBe(false);

    const diagnostic = output.mock.calls.map((args) => args.join(" ")).join("\n");
    expect(diagnostic).toContain("tsconfig.esm.json");
    expect(diagnostic).toContain("src/models/index.ts");
    expect(diagnostic).toContain("Regenerate");
    expect(diagnostic).toContain("current emitter");
    expect((await fs.readdir(directory, { recursive: true })).sort()).toEqual(originalTree);
    for (const [file, contents] of originals) {
      await expect(fs.readFile(path.join(directory, file), "utf8")).resolves.toBe(contents);
    }
  });

  it("rejects a missing public source file without changing the package", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const files = {
      "package.json": JSON.stringify({
        name: "@azure/customization-init-fixture",
        version: "1.0.0",
        type: "module",
        exports: {
          "./package.json": "./package.json",
          ".": { import: "./dist/esm/index.js" },
          "./models": { import: "./dist/esm/models/index.js" },
        },
        scripts: { build: "echo build" },
      }),
      "warp.config.json": JSON.stringify({
        exports: {
          "./package.json": "./package.json",
          ".": "./src/index.ts",
          "./models": "./src/models/index.ts",
        },
        targets: [{ name: "esm", tsconfig: "./tsconfig.src.json" }],
      }),
      "tsconfig.src.json": JSON.stringify({
        compilerOptions: { rootDir: "./src", outDir: "./dist/esm" },
        include: ["./src/index.ts", "./src/models/index.ts"],
      }),
      "src/index.ts": `export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";
export type { Widget } from "./models/index.js";
`,
      "src/widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
      "src/models/models.ts": "export interface Widget { name: string; }\n",
    };
    for (const [file, contents] of Object.entries(files)) {
      const destination = path.join(directory, file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, contents);
    }
    const originalTree = (await fs.readdir(directory, { recursive: true })).sort();
    vi.spyOn(process, "cwd").mockReturnValue(directory);
    const output = vi.spyOn(console, "log");

    await expect(initializeCustomization()).resolves.toBe(false);

    const diagnostic = output.mock.calls.map((args) => args.join(" ")).join("\n");
    expect(diagnostic).toContain("src/models/index.ts");
    expect((await fs.readdir(directory, { recursive: true })).sort()).toEqual(originalTree);
    for (const [file, contents] of Object.entries(files)) {
      await expect(fs.readFile(path.join(directory, file), "utf8")).resolves.toBe(contents);
    }
  });

  it("rejects a public package export without a Warp source mapping", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const files = {
      "package.json": JSON.stringify({
        name: "@azure/customization-init-fixture",
        version: "1.0.0",
        type: "module",
        exports: {
          "./package.json": "./package.json",
          ".": { import: "./dist/esm/index.js" },
          "./models": { import: "./dist/esm/models/index.js" },
        },
        scripts: { build: "echo build" },
      }),
      "warp.config.json": JSON.stringify({
        exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
        targets: [{ name: "esm", tsconfig: "./tsconfig.src.json" }],
      }),
      "tsconfig.src.json": JSON.stringify({
        compilerOptions: { rootDir: "./src", outDir: "./dist/esm" },
        include: ["./src/index.ts", "./src/models/index.ts"],
      }),
      "src/index.ts": `export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";
export type { Widget } from "./models/index.js";
`,
      "src/widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
      "src/models/index.ts": 'export type { Widget } from "./models.js";\n',
      "src/models/models.ts": "export interface Widget { name: string; }\n",
    };
    for (const [file, contents] of Object.entries(files)) {
      const destination = path.join(directory, file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, contents);
    }
    const originalTree = (await fs.readdir(directory, { recursive: true })).sort();
    vi.spyOn(process, "cwd").mockReturnValue(directory);
    const output = vi.spyOn(console, "log");

    await expect(initializeCustomization()).resolves.toBe(false);

    const diagnostic = output.mock.calls.map((args) => args.join(" ")).join("\n");
    expect(diagnostic).toContain("./models");
    expect(diagnostic).toContain("Warp");
    expect((await fs.readdir(directory, { recursive: true })).sort()).toEqual(originalTree);
    for (const [file, contents] of Object.entries(files)) {
      await expect(fs.readFile(path.join(directory, file), "utf8")).resolves.toBe(contents);
    }
  });

  it("rejects an existing source-separated layout with a clear diagnostic", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-customization-init-"));
    fixtures.push(directory);
    const files = {
      "package.json": JSON.stringify({
        name: "@azure/customization-init-fixture",
        version: "1.0.0",
        type: "module",
        exports: {
          "./package.json": "./package.json",
          ".": { import: "./dist/esm/index.js" },
        },
        scripts: { build: "echo build" },
      }),
      "warp.config.json": JSON.stringify({
        exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
        targets: [{ name: "esm", tsconfig: "./tsconfig.src.json" }],
      }),
      "tsconfig.src.json": JSON.stringify({
        compilerOptions: { rootDir: "./src", outDir: "./dist/esm" },
        include: ["./src/index.ts"],
      }),
      "src/index.ts": `export * from "./generated/index.js";
export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";
`,
      "src/widgetAnalyticsClient.ts": `import { WidgetAnalyticsClient as GeneratedWidgetAnalyticsClient } from "./generated/widgetAnalyticsClient.js";
export class WidgetAnalyticsClient extends GeneratedWidgetAnalyticsClient {
  customMethod() {
    return "This is a custom method!";
  }
}
`,
      "src/generated/index.ts":
        'export { WidgetAnalyticsClient } from "./widgetAnalyticsClient.js";\n',
      "src/generated/widgetAnalyticsClient.ts": "export class WidgetAnalyticsClient {}\n",
    };
    for (const [file, contents] of Object.entries(files)) {
      const destination = path.join(directory, file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, contents);
    }
    const originalTree = (await fs.readdir(directory, { recursive: true })).sort();
    vi.spyOn(process, "cwd").mockReturnValue(directory);
    const output = vi.spyOn(console, "log");

    await expect(initializeCustomization()).resolves.toBe(false);

    const diagnostic = output.mock.calls.map((args) => args.join(" ")).join("\n");
    expect(diagnostic).toContain("src/generated");
    expect(diagnostic).toContain("freshly generated");
    expect((await fs.readdir(directory, { recursive: true })).sort()).toEqual(originalTree);
    for (const [file, contents] of Object.entries(files)) {
      await expect(fs.readFile(path.join(directory, file), "utf8")).resolves.toBe(contents);
    }
  });
});
