// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateApiReview } from "../src/util/apiReview.ts";

const roots: string[] = [];

function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(path.join(tmpdir(), "api-review-"));
  roots.push(root);
  const packageJson = {
    name: "@example/review",
    type: "module",
    exports: { ".": { import: { types: "./dist/esm/index.d.ts" } } },
  };
  const allFiles = { "package.json": JSON.stringify(packageJson), ...files };
  for (const [file, text] of Object.entries(allFiles)) {
    const target = path.join(root, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, text);
  }
  return root;
}

afterAll(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("generateApiReview", () => {
  let singleExportRoot: string;

  beforeAll(() => {
    singleExportRoot = fixture({ "dist/esm/index.d.ts": "export declare const value: string;\n" });
  });

  it("titles the review with the package name", () => {
    const { apiMd } = generateApiReview(singleExportRoot);

    expect(apiMd).toMatch(/^# API review: `@example\/review`\n/);
  });

  it("lists each export path with its conditions", () => {
    const { apiMd } = generateApiReview(singleExportRoot);

    expect(apiMd).toContain(
      [
        "## Entry points",
        "",
        "| Export path | Conditions |",
        "| --- | --- |",
        "| `.` | `import` |",
      ].join("\n"),
    );
  });

  it("prints exported declarations under their export path", () => {
    const { apiMd } = generateApiReview(singleExportRoot);

    expect(apiMd).toContain(
      ["## Export `.`", "", "```ts", "export declare const value: string;", "```"].join("\n"),
    );
  });

  it("sorts declarations by name, not source order", () => {
    const root = fixture({
      "dist/esm/index.d.ts": [
        "export interface Zebra {}",
        "export declare function alpha(): void;",
      ].join("\n"),
    });

    const { apiMd } = generateApiReview(root);

    expect(apiMd).toContain(
      [
        "```ts",
        "export declare function alpha(): void;",
        "",
        "export interface Zebra {",
        "}",
        "```",
      ].join("\n"),
    );
  });

  describe("printing", () => {
    it("keeps status tags as line comments and drops prose", () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "/**",
          " * Prose here.",
          " * @beta",
          " */",
          "export declare function preview(): void;",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("// @beta\nexport declare function preview(): void;");
      expect(apiMd).not.toContain("Prose here");
    });

    it("keeps status tags on individual overloads", () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "export declare class CryptographyClient {",
          "    /**",
          "     * Encrypts the given plaintext with the specified encryption parameters.",
          "     */",
          "    encrypt(parameters: object): Promise<Uint8Array>;",
          "    /**",
          "     * Encrypts the given plaintext with the specified cryptography algorithm.",
          "     * @deprecated Use `encrypt({ algorithm, plaintext }, options)` instead.",
          "     */",
          "    encrypt(algorithm: string, plaintext: Uint8Array): Promise<Uint8Array>;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "export class CryptographyClient {",
          "    encrypt(parameters: object): Promise<Uint8Array>;",
          "    // @deprecated",
          "    encrypt(algorithm: string, plaintext: Uint8Array): Promise<Uint8Array>;",
          "}",
        ].join("\n"),
      );
    });

    it("omits private members and prints classes without declare", () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "export declare class KeyClient {",
          "    private readonly client;",
          "    readonly vaultUrl: string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export class KeyClient {\n    readonly vaultUrl: string;\n}");
    });

    it("omits the #private brand that tsc emits for ES private fields", () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "export declare class Stack {",
          "    #private;",
          "    name: string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export class Stack {\n    name: string;\n}");
    });
  });
});
