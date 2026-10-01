// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import ts from "typescript";
import { parse } from "yaml";
import generateApiReviewCommand from "../src/commands/run/generate-api-review.ts";
import { generateApiReview } from "../src/util/apiReview.ts";
import { resolveProject } from "../src/util/resolveProject.ts";

vi.mock("../src/util/resolveProject.ts", () => ({ resolveProject: vi.fn() }));

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

function dependency(name: string, declarations: string): Record<string, string> {
  return {
    [`node_modules/${name}/package.json`]: JSON.stringify({ name, types: "./index.d.ts" }),
    [`node_modules/${name}/index.d.ts`]: declarations,
  };
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

  it("lists conditions in a fixed order regardless of package.json key order", () => {
    const root = fixture(
      {
        "dist/browser/index.d.ts": "export declare const value: string;",
        "dist/react-native/index.d.ts": "export declare const value: string;",
        "dist/esm/index.d.ts": "export declare const value: string;",
        "dist/commonjs/index.d.ts": "export declare const value: string;",
      },
      {
        exports: {
          ".": {
            browser: { types: "./dist/browser/index.d.ts" },
            "react-native": { types: "./dist/react-native/index.d.ts" },
            import: { types: "./dist/esm/index.d.ts" },
            require: { types: "./dist/commonjs/index.d.ts" },
          },
        },
      },
    );

    const { apiMd } = generateApiReview(root);

    expect(apiMd).toContain("| `.` | `import`, `require`, `browser`, `react-native` |");
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

    it("records the package, parser and TypeScript versions in the metadata", () => {
      const { metadata } = generateApiReview(fixture(index, { version: "1.2.3" }));

      expect(metadata).toEqual({
        apiMdSha256: expect.stringMatching(/^[0-9a-f]{64}$/),
        packageVersion: "1.2.3",
        parserVersion: expect.stringMatching(/^\d+\.\d+\.\d+$/),
        typescriptVersion: ts.version,
      });
    });

    it("keeps version fields out of the hash", () => {
      const before = generateApiReview(fixture(index, { version: "1.2.3" }));
      const after = generateApiReview(fixture(index, { version: "1.2.4" }));

      expect(after.metadata.apiMdSha256).toBe(before.metadata.apiMdSha256);
    });

    it("omits the Dependencies section when there are none", () => {
      const { apiMd } = generateApiReview(singleExportRoot);

      expect(apiMd).not.toContain("## Dependencies");
    });
  });

  describe("subpaths", () => {
    const types = (file: string): { import: { types: string } } => ({ import: { types: file } });

    it("skips the ./package.json export", () => {
      const root = fixture(
        { "dist/esm/index.d.ts": "export declare const value: string;\n" },
        {
          exports: {
            "./package.json": "./package.json",
            ".": types("./dist/esm/index.d.ts"),
          },
        },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("| --- | --- |\n| `.` | `import` |\n\n");
    });

    it("prints declarations only a subpath exposes under Not exported from `.`", () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": "export declare class NotificationHubsClient {\n}",
          "dist/esm/api/index.d.ts":
            "export declare function createClientContext(connectionString: string, hubName: string): void;",
        },
        {
          exports: {
            ".": types("./dist/esm/index.d.ts"),
            "./api": types("./dist/esm/api/index.d.ts"),
          },
        },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Export `./api`",
          "",
          "### Not exported from `.`",
          "",
          "```ts",
          "export declare function createClientContext(connectionString: string, hubName: string): void;",
          "```",
        ].join("\n"),
      );
    });

    it("lists declarations already shown under `.` by name instead of repeating them", () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": 'export * from "./models/index.js";',
          "dist/esm/models/index.d.ts":
            "export interface AdmInstallation {\n    platform: string;\n}",
        },
        {
          exports: {
            ".": types("./dist/esm/index.d.ts"),
            "./models": types("./dist/esm/models/index.d.ts"),
          },
        },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Export `./models`",
          "",
          "### Also exported from `.`",
          "",
          "Definitions are shown under Export `.`.",
          "",
          "- `AdmInstallation`",
        ].join("\n"),
      );
      expect(apiMd.split("export interface AdmInstallation").length - 1).toBe(1);
    });

    it("names the earliest subpath that shows a declaration not exported from `.`", () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": "export declare class ComputeManagementClient {\n}",
          "dist/esm/models/index.d.ts": 'export * from "./compute/index.js";',
          "dist/esm/models/compute/index.d.ts":
            "export interface VirtualMachine {\n    vmId: string;\n}",
        },
        {
          exports: {
            ".": types("./dist/esm/index.d.ts"),
            "./models": types("./dist/esm/models/index.d.ts"),
            "./models/compute": types("./dist/esm/models/compute/index.d.ts"),
          },
        },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Export `./models/compute`",
          "",
          "### Also exported from `./models`",
          "",
          "Definitions are shown under Export `./models`.",
          "",
          "- `VirtualMachine`",
        ].join("\n"),
      );
      expect(apiMd.split("export interface VirtualMachine").length - 1).toBe(1);
    });

    describe("export path order", () => {
      const files = {
        "dist/esm/index.d.ts": "export declare const value: string;",
        "dist/esm/shared.d.ts": "export declare function createLoggerContext(): void;",
        "dist/esm/internal/logger.d.ts": 'export { createLoggerContext } from "../shared.js";',
        "dist/esm/internal/util.d.ts": 'export { createLoggerContext } from "../shared.js";',
      };
      const unsortedExports = {
        "./internal/util": types("./dist/esm/internal/util.d.ts"),
        "./internal/logger": types("./dist/esm/internal/logger.d.ts"),
        ".": types("./dist/esm/index.d.ts"),
      };

      it("orders export paths with `.` first, then by path, regardless of package.json key order", () => {
        const { apiMd } = generateApiReview(fixture(files, { exports: unsortedExports }));

        expect(apiMd).toContain(
          [
            "| `.` | `import` |",
            "| `./internal/logger` | `import` |",
            "| `./internal/util` | `import` |",
          ].join("\n"),
        );
        const headings = apiMd.match(/^## Export .*$/gm);
        expect(headings).toEqual([
          "## Export `.`",
          "## Export `./internal/logger`",
          "## Export `./internal/util`",
        ]);
      });

      it("shows a declaration shared by two subpaths under the alphabetically first one", () => {
        const { apiMd } = generateApiReview(fixture(files, { exports: unsortedExports }));

        expect(apiMd).toContain(
          [
            "## Export `./internal/logger`",
            "",
            "### Not exported from `.`",
            "",
            "```ts",
            "export declare function createLoggerContext(): void;",
            "```",
          ].join("\n"),
        );
        expect(apiMd).toContain(
          [
            "## Export `./internal/util`",
            "",
            "### Also exported from `./internal/logger`",
            "",
            "Definitions are shown under Export `./internal/logger`.",
            "",
            "- `createLoggerContext`",
          ].join("\n"),
        );
      });

      it("produces the same hash regardless of package.json exports order", () => {
        const sortedExports = Object.fromEntries(
          Object.entries(unsortedExports).sort(([a], [b]) => a.localeCompare(b)),
        );

        const unsorted = generateApiReview(fixture(files, { exports: unsortedExports }));
        const sorted = generateApiReview(fixture(files, { exports: sortedExports }));

        expect(unsorted.metadata.apiMdSha256).toBe(sorted.metadata.apiMdSha256);
      });
    });

    it("shows a subpath declaration that shares a root export's name under Differs from `.`", () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": "export interface ClientOptions {\n    endpoint: string;\n}",
          "dist/esm/models/index.d.ts":
            "export interface ClientOptions {\n    apiVersion: string;\n}",
        },
        {
          exports: {
            ".": types("./dist/esm/index.d.ts"),
            "./models": types("./dist/esm/models/index.d.ts"),
          },
        },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Export `./models`",
          "",
          "### Differs from `.`",
          "",
          "Same name as an Export `.` export, but a different declaration.",
          "",
          "```ts",
          "export interface ClientOptions {",
          "    apiVersion: string;",
          "}",
          "```",
        ].join("\n"),
      );
    });
  });

  describe("references", () => {
    it("collects external types used in signatures into a References import block", () => {
      const root = fixture(
        {
          ...dependency("@azure/core-auth", "export interface TokenCredential {\n}"),
          "dist/esm/index.d.ts": [
            'import type { TokenCredential } from "@azure/core-auth";',
            "export declare class KeyClient {",
            "    constructor(vaultUrl: string, credential: TokenCredential);",
            "}",
          ].join("\n"),
        },
        { dependencies: { "@azure/core-auth": "^1.9.0" } },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## References",
          "",
          "```ts",
          'import { TokenCredential } from "@azure/core-auth";',
          "```",
        ].join("\n"),
      );
      expect(apiMd).not.toContain("interface TokenCredential");
    });

    it("prints re-exports of external declarations as export-from lines", () => {
      const root = fixture(
        {
          ...dependency(
            "@azure/core-paging",
            [
              "export interface PageSettings {\n}",
              "export interface PagedAsyncIterableIterator {\n}",
            ].join("\n"),
          ),
          "dist/esm/index.d.ts":
            'export { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";',
        },
        { dependencies: { "@azure/core-paging": "^1.6.2" } },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "export {",
          "    PagedAsyncIterableIterator,",
          "    PageSettings,",
          '} from "@azure/core-paging";',
        ].join("\n"),
      );
      expect(apiMd).not.toContain("interface PageSettings");
    });

    it("uses an external type's exported name, not a local import alias", () => {
      const root = fixture(
        {
          ...dependency("@opentelemetry/api", "export interface Context {\n}"),
          "dist/esm/index.d.ts": [
            'import { Context as OTContext } from "@opentelemetry/api";',
            "export declare function startSpan(name: string, context?: OTContext): void;",
          ].join("\n"),
        },
        { dependencies: { "@opentelemetry/api": "^1.9.0" } },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain('import { Context } from "@opentelemetry/api";');
      expect(apiMd).toContain(
        "export declare function startSpan(name: string, context?: Context): void;",
      );
      expect(apiMd).not.toContain("OTContext");
    });

    it("rewrites namespace-qualified external types to their exported names", () => {
      const root = fixture(
        {
          ...dependency("@azure-rest/core-client", "export interface OperationOptions {\n}"),
          "dist/esm/index.d.ts": [
            'import type * as coreClient from "@azure-rest/core-client";',
            "export interface CreateKeyOptions extends coreClient.OperationOptions {",
            "    keySize?: number;",
            "}",
          ].join("\n"),
        },
        { dependencies: { "@azure-rest/core-client": "^2.3.3" } },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export interface CreateKeyOptions extends OperationOptions {");
      expect(apiMd).toContain('import { OperationOptions } from "@azure-rest/core-client";');
      expect(apiMd).not.toContain("coreClient");
    });

    it("rewrites import() types from dependencies to their exported names", () => {
      const root = fixture(
        {
          ...dependency("@azure/logger", "export interface AzureLogger {\n}"),
          "dist/esm/index.d.ts":
            'export declare const logger: import("@azure/logger").AzureLogger;',
        },
        { dependencies: { "@azure/logger": "^1.1.4" } },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export declare const logger: AzureLogger;");
      expect(apiMd).toContain('import { AzureLogger } from "@azure/logger";');
    });

    it("rewrites package-local import() types without file paths", () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'export { logger } from "./log.js";',
          'export type { TypeSpecRuntimeLogger } from "./logger/logger.js";',
        ].join("\n"),
        "dist/esm/log.d.ts":
          'export declare const logger: import("./logger/logger.js").TypeSpecRuntimeLogger;',
        "dist/esm/logger/logger.d.ts": "export interface TypeSpecRuntimeLogger {\n}",
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("export declare const logger: TypeSpecRuntimeLogger;");
      expect(apiMd).not.toContain("logger.js");
    });

    it("follows local re-export hops to the dependency that declares a re-export", () => {
      const root = fixture(
        {
          ...dependency("@azure/core-paging", "export interface PageSettings {\n}"),
          "dist/esm/index.d.ts": 'export { PageSettings } from "./paging.js";',
          "dist/esm/paging.d.ts": 'export { PageSettings } from "@azure/core-paging";',
        },
        { dependencies: { "@azure/core-paging": "^1.6.2" } },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain('export { PageSettings } from "@azure/core-paging";');
      expect(apiMd).not.toContain("paging.js");
    });
  });

  describe("forgotten exports", () => {
    it("warns above each member that uses a forgotten declaration", () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export type { DatasetsOperations } from "./datasets.js";',
        "dist/esm/datasets.d.ts": [
          "export interface DatasetUploadOptions {",
          "    connectionName?: string;",
          "}",
          "export interface DatasetsOperations {",
          "    uploadFile: (name: string, filePath: string, options?: DatasetUploadOptions) => Promise<void>;",
          "    uploadFolder: (name: string, folderPath: string, options?: DatasetUploadOptions) => Promise<void>;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "```ts",
          "export interface DatasetsOperations {",
          "    // Warning: (arh-forgotten-export: DatasetUploadOptions)",
          "    uploadFile: (name: string, filePath: string, options?: DatasetUploadOptions) => Promise<void>;",
          "    // Warning: (arh-forgotten-export: DatasetUploadOptions)",
          "    uploadFolder: (name: string, folderPath: string, options?: DatasetUploadOptions) => Promise<void>;",
          "}",
          "```",
        ].join("\n"),
      );
    });

    it("warns above a top-level declaration whose heritage uses a forgotten declaration", () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export { BlobClient } from "./Clients.js";',
        "dist/esm/StorageClient.d.ts": [
          "export declare abstract class StorageClient {",
          "    readonly url: string;",
          "}",
        ].join("\n"),
        "dist/esm/Clients.d.ts": [
          'import { StorageClient } from "./StorageClient.js";',
          "export declare class BlobClient extends StorageClient {",
          "    get containerName(): string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        "// Warning: (arh-forgotten-export: StorageClient)\nexport class BlobClient extends StorageClient {",
      );
    });

    it("warns only about unexported package-local declarations", () => {
      const root = fixture({
        "node_modules/@azure/core-auth/package.json": JSON.stringify({
          name: "@azure/core-auth",
          types: "./index.d.ts",
        }),
        "node_modules/@azure/core-auth/index.d.ts": "export interface TokenCredential {\n}",
        "dist/esm/index.d.ts": 'export { KeyClient, KeyClientOptions } from "./keyClient.js";',
        "dist/esm/keyClient.d.ts": [
          'import type { TokenCredential } from "@azure/core-auth";',
          "export interface KeyClientOptions {",
          "    apiVersion?: string;",
          "}",
          "export declare function _sendRequest(): void;",
          "export declare class KeyClient {",
          "    constructor(credential: TokenCredential, options?: KeyClientOptions);",
          "    purgeDeletedKey(name: string): Promise<void>;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = generateApiReview(root);

      expect(apiMd).not.toContain("arh-forgotten-export");
      expect(apiMd).not.toContain("_sendRequest");
    });
  });

  describe("runtime differences", () => {
    const coreAuthExports = {
      ".": {
        browser: { types: "./dist/browser/index.d.ts" },
        import: { types: "./dist/esm/index.d.ts" },
        require: { types: "./dist/commonjs/index.d.ts" },
      },
    };
    const accessToken = "export interface AccessToken {\n    token: string;\n}";

    it("lists conditions whose declarations match the ESM view as identical", () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": accessToken,
          "dist/commonjs/index.d.ts": accessToken,
          "dist/browser/index.d.ts": accessToken,
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        "## Runtime differences\n\nIdentical to the ESM view: `require`, `browser`.",
      );
    });

    it("reads each condition's own declaration files", () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": accessToken,
          "dist/commonjs/index.d.ts": accessToken,
          "dist/browser/index.d.ts":
            "export interface AccessToken {\n    token: string | undefined;\n}",
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain("Identical to the ESM view: `require`.");
    });

    it("omits Runtime differences for import-only packages", () => {
      const { apiMd } = generateApiReview(singleExportRoot);

      expect(apiMd).not.toContain("## Runtime differences");
    });

    it("shows a changed member as a hunk under its declaration header", () => {
      const esm = [
        "export declare class AzureCliCredential {",
        "    constructor(options?: string);",
        "    getToken(scopes: string | string[]): Promise<string>;",
        "}",
        "export interface AzureCliCredentialOptions {",
        "    tenantId?: string;",
        "}",
      ].join("\n");
      const root = fixture(
        {
          "dist/esm/index.d.ts": esm,
          "dist/commonjs/index.d.ts": esm,
          "dist/browser/index.d.ts": esm.replace(
            "getToken(scopes: string | string[]): Promise<string>;",
            "getToken(_scopes: string | string[]): Promise<string | null>;",
          ),
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "Identical to the ESM view: `require`.",
          "",
          "### `browser`",
          "",
          "#### Export `.`",
          "",
          "```diff",
          " export class AzureCliCredential {",
          "     constructor(options?: string);",
          "-    getToken(scopes: string | string[]): Promise<string>;",
          "+    getToken(_scopes: string | string[]): Promise<string | null>;",
          " }",
          "```",
        ].join("\n"),
      );
    });

    it("shows a declaration missing from a condition as removed lines", () => {
      const queueClient =
        "export declare class QueueClient {\n    getProperties(): Promise<void>;\n}";
      const esm = [
        queueClient,
        "export declare function generateAccountSASQueryParameters(accountSASSignatureValues: object): string;",
      ].join("\n");
      const root = fixture(
        {
          "dist/esm/index.d.ts": esm,
          "dist/commonjs/index.d.ts": esm,
          "dist/browser/index.d.ts": queueClient,
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "#### Export `.`",
          "",
          "```diff",
          "-export declare function generateAccountSASQueryParameters(accountSASSignatureValues: object): string;",
          "```",
        ].join("\n"),
      );
    });

    it("shows a declaration only a condition has as added lines", () => {
      const esm = [
        "export declare class AvroReadableFromStream {",
        "    constructor(readable: NodeJS.ReadableStream);",
        "}",
      ].join("\n");
      const root = fixture(
        {
          "dist/esm/index.d.ts": esm,
          "dist/commonjs/index.d.ts": esm,
          "dist/browser/index.d.ts": [
            "export declare class AvroReadableFromBlob {",
            "    constructor(blob: Blob);",
            "}",
          ].join("\n"),
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "```diff",
          "+export class AvroReadableFromBlob {",
          "+    constructor(blob: Blob);",
          "+}",
          "",
          "-export class AvroReadableFromStream {",
          "-    constructor(readable: NodeJS.ReadableStream);",
          "-}",
          "```",
        ].join("\n"),
      );
    });

    it("elides lines far from a change with @@ but keeps the header", () => {
      const esm = [
        "export declare class KeyClient {",
        "    getKey(name: string): Promise<string>;",
        "    backupKey(name: string): Promise<Uint8Array | undefined>;",
        "    restoreKeyBackup(backup: Uint8Array): Promise<string>;",
        "    getRandomBytes(count: number): Promise<Uint8Array>;",
        "    rotateKey(name: string): Promise<string>;",
        "    releaseKey(name: string, targetAttestationToken: string): Promise<string>;",
        "    purgeDeletedKey(name: string): Promise<void>;",
        "}",
      ].join("\n");
      const root = fixture(
        {
          "dist/esm/index.d.ts": esm,
          "dist/commonjs/index.d.ts": esm,
          "dist/browser/index.d.ts": esm.replace(
            "Promise<Uint8Array>;",
            "Promise<Uint8Array | undefined>;",
          ),
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = generateApiReview(root);

      expect(apiMd).toContain(
        [
          "```diff",
          " export class KeyClient {",
          "@@",
          "     backupKey(name: string): Promise<Uint8Array | undefined>;",
          "     restoreKeyBackup(backup: Uint8Array): Promise<string>;",
          "-    getRandomBytes(count: number): Promise<Uint8Array>;",
          "+    getRandomBytes(count: number): Promise<Uint8Array | undefined>;",
          "     rotateKey(name: string): Promise<string>;",
          "     releaseKey(name: string, targetAttestationToken: string): Promise<string>;",
          "@@",
          "```",
        ].join("\n"),
      );
    });
  });

  describe("fail closed", () => {
    it("throws when a module specifier can't be resolved", () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'import type { TokenCredential } from "@azure/core-auth";',
          "export declare class KeyClient {",
          "    constructor(credential: TokenCredential);",
          "}",
        ].join("\n"),
      });

      expect(() => generateApiReview(root)).toThrow(
        "[import] dist/esm/index.d.ts: Cannot find module '@azure/core-auth' or its corresponding type declarations.",
      );
    });

    it("throws when a re-exported name doesn't exist in its module", () => {
      const root = fixture({
        ...dependency(
          "@azure/storage-common",
          "export declare class StorageSharedKeyCredential {\n}",
        ),
        "dist/esm/index.d.ts":
          'export { StorageSharedKeyCredentialPolicy } from "@azure/storage-common";',
      });

      expect(() => generateApiReview(root)).toThrow(
        `[import] dist/esm/index.d.ts: '"@azure/storage-common"' has no exported member named 'StorageSharedKeyCredentialPolicy'. Did you mean 'StorageSharedKeyCredential'?`,
      );
    });

    it("resolves the require view with CommonJS conditions", () => {
      const index = [
        'import type { Widget } from "@example/esm-only";',
        "export declare function makeWidget(): Widget;",
      ].join("\n");
      const root = fixture(
        {
          "node_modules/@example/esm-only/package.json": JSON.stringify({
            name: "@example/esm-only",
            type: "module",
            exports: { ".": { import: { types: "./index.d.ts" } } },
          }),
          "node_modules/@example/esm-only/index.d.ts": "export interface Widget {\n}",
          "dist/esm/package.json": JSON.stringify({ type: "module" }),
          "dist/esm/index.d.ts": index,
          "dist/commonjs/package.json": JSON.stringify({ type: "commonjs" }),
          "dist/commonjs/index.d.ts": index,
        },
        {
          exports: {
            ".": {
              import: { types: "./dist/esm/index.d.ts" },
              require: { types: "./dist/commonjs/index.d.ts" },
            },
          },
        },
      );

      expect(() => generateApiReview(root)).toThrow(
        "[require] dist/commonjs/index.d.ts: Cannot find module '@example/esm-only' or its corresponding type declarations.",
      );
    });

    describe("Node.js built-in modules", () => {
      const nodeTypes = {
        "node_modules/@types/node/package.json": JSON.stringify({
          name: "@types/node",
          types: "./index.d.ts",
        }),
        "node_modules/@types/node/index.d.ts":
          'declare module "node:stream" {\n    export class Readable {\n    }\n}',
      };
      const clients = [
        'import type { Readable } from "node:stream";',
        "export declare function download(): Readable;",
      ].join("\n");

      it("resolves Node.js built-in modules with the package's @types/node", () => {
        const root = fixture({ ...nodeTypes, "dist/esm/index.d.ts": clients });

        const { apiMd } = generateApiReview(root);

        expect(apiMd).toContain('import { Readable } from "node:stream";');
      });

      it("resolves Node.js built-ins in browser views too", () => {
        const root = fixture(
          {
            ...nodeTypes,
            "dist/esm/index.d.ts": clients,
            "dist/browser/index.d.ts": clients,
          },
          {
            exports: {
              ".": {
                browser: { types: "./dist/browser/index.d.ts" },
                import: { types: "./dist/esm/index.d.ts" },
              },
            },
          },
        );

        const { apiMd } = generateApiReview(root);

        expect(apiMd).toContain("Identical to the ESM view: `browser`.");
      });
    });

    it("throws when implementation .ts files are pulled into the program", () => {
      const root = fixture(
        {
          "src/types.ts": "export interface PipelineRequest {\n    url: string;\n}",
          "dist/esm/index.d.ts": [
            'import type { PipelineRequest } from "#platform/types";',
            "export declare function sendRequest(request: PipelineRequest): void;",
          ].join("\n"),
        },
        { imports: { "#platform/*": "./src/*.ts" } },
      );

      expect(() => generateApiReview(root)).toThrow(
        "[import] src/types.ts: Implementation file is part of the review program",
      );
    });
  });
});

describe("generate-api-review command", () => {
  const index = { "dist/esm/index.d.ts": "export declare const value: string;\n" };

  function readReview(directory: string): { apiMd: string; metadata: unknown } {
    return {
      apiMd: readFileSync(path.join(directory, "api.md"), "utf8"),
      metadata: parse(readFileSync(path.join(directory, "api.metadata.yml"), "utf8")),
    };
  }

  it("writes api.md and api.metadata.yml to the output directory", async () => {
    const root = fixture(index);
    const outputDir = path.join(root, "out");

    const succeeded = await generateApiReviewCommand(
      "--package-root",
      root,
      "--output-dir",
      outputDir,
    );

    expect(succeeded).toBe(true);
    expect(readReview(outputDir)).toEqual(generateApiReview(root));
  });

  it("writes to the package root when --output-dir is omitted", async () => {
    const root = fixture(index);

    const succeeded = await generateApiReviewCommand("--package-root", root);

    expect(succeeded).toBe(true);
    expect(readReview(root)).toEqual(generateApiReview(root));
  });

  it("finds the package from the current directory when --package-root is omitted", async () => {
    const root = fixture(index);
    vi.mocked(resolveProject).mockResolvedValue({
      name: "@example/review",
      version: "1.0.0",
      path: root,
      packageJson: {} as never,
    });

    const succeeded = await generateApiReviewCommand();

    expect(succeeded).toBe(true);
    expect(readReview(root)).toEqual(generateApiReview(root));
  });

  it("writes nothing and fails when generation throws", async () => {
    const root = fixture(index, { exports: undefined });
    const outputDir = path.join(root, "out");

    const succeeded = await generateApiReviewCommand(
      "--package-root",
      root,
      "--output-dir",
      outputDir,
    );

    expect(succeeded).toBe(false);
    expect(existsSync(path.join(outputDir, "api.metadata.yml"))).toBe(false);
  });
});
