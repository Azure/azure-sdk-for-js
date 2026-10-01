// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateApiReview } from "../src/util/apiReview.ts";

const roots: string[] = [];

function fixture(
  files: Record<string, string>,
  packageJsonOverrides: Record<string, unknown> = {},
): string {
  const root = mkdtempSync(path.join(tmpdir(), "api-review-"));
  roots.push(root);
  const packageJson = {
    name: "@example/review",
    type: "module",
    exports: { ".": { import: { types: "./dist/esm/index.d.ts" } } },
    ...packageJsonOverrides,
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

  describe("export resolution", () => {
    it("follows export * into other declaration files", () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export * from "./keyClient.js";',
        "dist/esm/keyClient.d.ts": [
          "export declare class KeyClient {",
          "    readonly vaultUrl: string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export class KeyClient {\n    readonly vaultUrl: string;\n}");
    });

    it("prints only the names a named re-export exposes", () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export { KeyClient } from "./keyClient.js";',
        "dist/esm/keyClient.d.ts": [
          "export declare class KeyClient {",
          "    readonly vaultUrl: string;",
          "}",
          "export declare function createKeyClientHelper(): void;",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export class KeyClient {\n    readonly vaultUrl: string;\n}");
      expect(apiMd).not.toContain("createKeyClientHelper");
    });

    it("prints an aliased re-export under its public name", () => {
      const root = fixture({
        "dist/esm/index.d.ts":
          'export type { RestorePollerOptions as WorkspaceClientRestorePollerOptions } from "./restorePollerHelpers.js";',
        "dist/esm/restorePollerHelpers.d.ts": [
          "export interface RestorePollerOptions {",
          "    updateIntervalInMs?: number;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        "export interface WorkspaceClientRestorePollerOptions {\n    updateIntervalInMs?: number;\n}",
      );
      expect(apiMd).not.toContain("interface RestorePollerOptions");
    });

    it("resolves re-exports through several hops", () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export * from "./models/index.js";',
        "dist/esm/models/index.d.ts": 'export type { Widget as WidgetModel } from "./models.js";',
        "dist/esm/models/models.d.ts": ["export interface Widget {", "    name: string;", "}"].join(
          "\n",
        ),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export interface WidgetModel {\n    name: string;\n}");
    });
  });

  describe("dependencies and hash", () => {
    const index = { "dist/esm/index.d.ts": "export declare const value: string;\n" };

    it("lists runtime and peer dependencies with verbatim specifiers, sorted by name", () => {
      const root = fixture(index, {
        dependencies: { "@azure/core-auth": "workspace:^", "@azure/abort-controller": "^2.1.2" },
        peerDependencies: { "@azure/core-client": "^1.10.0" },
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Dependencies",
          "",
          "Specifiers are verbatim from package.json. The review hash covers dependency names and major versions only.",
          "",
          "| Package | Version | Type |",
          "| --- | --- | --- |",
          "| `@azure/abort-controller` | `^2.1.2` | runtime |",
          "| `@azure/core-auth` | `workspace:^` | runtime |",
          "| `@azure/core-client` | `^1.10.0` | peer |",
        ].join("\n"),
      );
    });

    it("hashes api.md with SHA-256 when there are no dependencies", () => {
      const { apiMd, metadata } = generateApiReview(singleExportRoot);

      expect(metadata.apiMdSha256).toBe(createHash("sha256").update(apiMd).digest("hex"));
    });

    it("ignores minor and patch dependency bumps in the hash", () => {
      const before = generateApiReview(fixture(index, { dependencies: { tslib: "^1.9.0" } }));
      const after = generateApiReview(fixture(index, { dependencies: { tslib: "^1.10.2" } }));

      expect(after.apiMd).not.toBe(before.apiMd);
      expect(after.metadata.apiMdSha256).toBe(before.metadata.apiMdSha256);
    });

    it("changes the hash on a major dependency bump", () => {
      const before = generateApiReview(fixture(index, { dependencies: { tslib: "^1.9.0" } }));
      const after = generateApiReview(fixture(index, { dependencies: { tslib: "^2.0.0" } }));

      expect(after.metadata.apiMdSha256).not.toBe(before.metadata.apiMdSha256);
    });

    it("changes the hash on a 0.x minor bump", () => {
      const runtime = "@typespec/ts-http-runtime";
      const before = generateApiReview(fixture(index, { dependencies: { [runtime]: "^0.3.8" } }));
      const after = generateApiReview(fixture(index, { dependencies: { [runtime]: "^0.4.0" } }));

      expect(after.metadata.apiMdSha256).not.toBe(before.metadata.apiMdSha256);
    });

    it("ignores 0.x patch bumps in the hash", () => {
      const runtime = "@typespec/ts-http-runtime";
      const before = generateApiReview(fixture(index, { dependencies: { [runtime]: "^0.3.0" } }));
      const after = generateApiReview(fixture(index, { dependencies: { [runtime]: "^0.3.8" } }));

      expect(after.metadata.apiMdSha256).toBe(before.metadata.apiMdSha256);
    });

    it("keeps exact prerelease specifiers in the hash", () => {
      const common = "@azure/maps-common";
      const before = generateApiReview(
        fixture(index, { dependencies: { [common]: "1.0.0-beta.2" } }),
      );
      const after = generateApiReview(
        fixture(index, { dependencies: { [common]: "1.0.0-beta.3" } }),
      );

      expect(after.metadata.apiMdSha256).not.toBe(before.metadata.apiMdSha256);
    });

    it("omits the Dependencies section when there are none", () => {
      const { apiMd } = generateApiReview(singleExportRoot);

      expect(apiMd).not.toContain("## Dependencies");
    });
  });
});
