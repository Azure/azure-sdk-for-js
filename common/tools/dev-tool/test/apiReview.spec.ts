// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
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
    function dependency(name: string, declarations: string): Record<string, string> {
      return {
        [`node_modules/${name}/package.json`]: JSON.stringify({ name, types: "./index.d.ts" }),
        [`node_modules/${name}/index.d.ts`]: declarations,
      };
    }

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
