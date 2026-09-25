// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import customizationInit from "../src/commands/customization/init.ts";
import { silenceLogger } from "./util.ts";

describe.sequential("customization init", () => {
  const originalWorkingDirectory = process.cwd();
  const temporaryDirectories: string[] = [];

  beforeAll(() => {
    silenceLogger();
  });

  afterEach(async () => {
    process.chdir(originalWorkingDirectory);
    await Promise.all(
      temporaryDirectories
        .splice(0)
        .map((directory) => rm(directory, { force: true, recursive: true })),
    );
  });

  it("moves a new generated source tree under src and creates a stable root entry point", async () => {
    const packageDirectory = await createPackage({
      scripts: {
        "generate:client":
          "tsp-client update && dev-tool customization apply --skip index.ts && npm run format",
        customize: "dev-tool customization apply -s ./generated -t ./src && npm run format",
      },
      imports: {
        "#platform/*": {
          browser: "./src/*-browser.mts",
          default: "./src/*.ts",
        },
      },
      exports: {
        ".": {
          import: "./dist/esm/index.js",
        },
        "./models": {
          import: "./dist/esm/models/index.js",
          require: "./dist/commonjs/models/index.js",
        },
      },
      "//metadata": {
        constantPaths: [{ path: "src/api/client.ts", prefix: "userAgentInfo" }],
      },
    });
    await writeSource(packageDirectory, "index.ts", "export const root = true;\n");
    await writeSource(packageDirectory, "models/index.ts", "export const model = true;\n");
    await writeFile(
      path.join(packageDirectory, "warp.config.yml"),
      'exports:\n  "./models": "./src/models/index.ts"\n',
    );
    process.chdir(packageDirectory);
    await expect(customizationInit()).resolves.toBe(true);

    await expect(
      readFile(path.join(packageDirectory, "src/generated/index.ts"), "utf-8"),
    ).resolves.toBe("export const root = true;\n");
    await expect(
      readFile(path.join(packageDirectory, "src/generated/models/index.ts"), "utf-8"),
    ).resolves.toBe("export const model = true;\n");
    await expect(readFile(path.join(packageDirectory, "src/index.ts"), "utf-8")).resolves.toContain(
      'export * from "./generated/index.js";',
    );
    await expect(
      readFile(path.join(packageDirectory, "src/models/index.ts"), "utf-8"),
    ).rejects.toThrow();
    const packageJson = JSON.parse(
      await readFile(path.join(packageDirectory, "package.json"), "utf-8"),
    );
    expect(packageJson.scripts["generate:client"]).toBe("tsp-client update && npm run format");
    expect(packageJson.scripts.customize).toBeUndefined();
    expect(packageJson.imports["#platform/*"]).toEqual({
      browser: "./src/generated/*-browser.mts",
      default: "./src/generated/*.ts",
    });
    expect(packageJson.exports["."]).toEqual({
      import: "./dist/esm/index.js",
    });
    expect(packageJson.exports["./models"]).toEqual({
      import: "./dist/esm/generated/models/index.js",
      require: "./dist/commonjs/generated/models/index.js",
    });
    expect(packageJson["//metadata"].constantPaths[0].path).toBe("src/generated/api/client.ts");
    expect(await readFile(path.join(packageDirectory, "warp.config.yml"), "utf-8")).toContain(
      "./src/generated/models/index.ts",
    );
  });

  it("does not replace existing customization entry points", async () => {
    const packageDirectory = await createPackage({});
    await writeSource(packageDirectory, "generated/index.ts", "export const generated = true;\n");
    await writeSource(packageDirectory, "index.ts", "export const customized = true;\n");

    process.chdir(packageDirectory);
    await expect(customizationInit()).resolves.toBe(true);

    await expect(readFile(path.join(packageDirectory, "src/index.ts"), "utf-8")).resolves.toBe(
      "export const customized = true;\n",
    );
  });

  it("moves a legacy generated baseline without changing handwritten source paths", async () => {
    const packageDirectory = await createPackage({
      scripts: {
        "generate:client": "tsp-client update && dev-tool customization apply && npm run format",
      },
      imports: {
        "#platform/*": {
          default: "./src/*.ts",
        },
      },
      "//metadata": {
        constantPaths: [{ path: "src/constants.ts", prefix: "SDK_VERSION" }],
      },
    });
    await writeSource(packageDirectory, "index.ts", "export const customized = true;\n");
    await mkdir(path.join(packageDirectory, "generated"), { recursive: true });
    await writeFile(
      path.join(packageDirectory, "generated/index.ts"),
      "export const generated = true;\n",
    );

    process.chdir(packageDirectory);
    await expect(customizationInit()).resolves.toBe(true);

    await expect(readFile(path.join(packageDirectory, "src/index.ts"), "utf-8")).resolves.toBe(
      "export const customized = true;\n",
    );
    await expect(
      readFile(path.join(packageDirectory, "src/generated/index.ts"), "utf-8"),
    ).resolves.toBe("export const generated = true;\n");

    const packageJson = JSON.parse(
      await readFile(path.join(packageDirectory, "package.json"), "utf-8"),
    );
    expect(packageJson.scripts["generate:client"]).toBe("tsp-client update && npm run format");
    expect(packageJson.imports["#platform/*"].default).toBe("./src/*.ts");
    expect(packageJson["//metadata"].constantPaths[0].path).toBe("src/constants.ts");
  });

  async function createPackage(extra: Record<string, unknown>): Promise<string> {
    const packageDirectory = await mkdtemp(path.join(tmpdir(), "dev-tool-customization-"));
    temporaryDirectories.push(packageDirectory);
    await writeFile(
      path.join(packageDirectory, "package.json"),
      JSON.stringify({
        name: "@azure/customization-test",
        version: "1.0.0",
        scripts: {},
        ...extra,
      }),
    );
    return packageDirectory;
  }

  async function writeSource(
    packageDirectory: string,
    relativePath: string,
    content: string,
  ): Promise<void> {
    const filePath = path.join(packageDirectory, "src", relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content);
  }
});
