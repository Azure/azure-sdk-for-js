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
import type * as ResolveProjectModule from "../src/util/resolveProject.ts";

vi.mock("../src/util/resolveProject.ts", async (importOriginal) => ({
  ...(await importOriginal<typeof ResolveProjectModule>()),
  resolveProject: vi.fn(),
}));

const roots: string[] = [];

function fixture(
  files: Record<string, string>,
  packageJsonOverrides: Record<string, unknown> = {},
): string {
  const workspace = mkdtempSync(path.join(tmpdir(), "api-review-"));
  roots.push(workspace);
  writeFileSync(path.join(workspace, "pnpm-workspace.yaml"), "");
  const root = path.join(workspace, "sdk", "example", "review");
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

  it("distinguishes retargeted aliases on a repeated export path", async () => {
    const review = (target: string): Promise<Awaited<ReturnType<typeof generateApiReview>>> =>
      generateApiReview(
        fixture(
          {
            "dist/esm/index.d.ts":
              "export interface A { a: string; } export interface B { b: number; }",
            "dist/esm/subpath.d.ts": `export { ${target} as C } from "./index.js";`,
          },
          {
            exports: {
              ".": { import: { types: "./dist/esm/index.d.ts" } },
              "./subpath": { import: { types: "./dist/esm/subpath.d.ts" } },
            },
          },
        ),
      );
    const before = await review("A");
    const after = await review("B");
    expect(before.apiMd).toContain("A as C");
    expect(after.apiMd).toContain("B as C");
    expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
  });

  it("does not report global script declarations as forgotten exports", async () => {
    const root = fixture({
      "dist/esm/index.d.ts": 'import "./globals.js"; export {};',
      "dist/esm/globals.d.ts": "interface CustomGlobal { value: string; }",
    });
    expect((await generateApiReview(root)).apiMd).not.toContain("arh-forgotten-export");
  });

  beforeAll(() => {
    singleExportRoot = fixture({ "dist/esm/index.d.ts": "export declare const value: string;\n" });
  });

  it("titles the review with the package name", async () => {
    const { apiMd } = await generateApiReview(singleExportRoot);

    expect(apiMd).toMatch(/^# API review: `@example\/review`\n/);
  });

  it("lists each export path with its conditions", async () => {
    const { apiMd } = await generateApiReview(singleExportRoot);

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

  it("lists conditions in package.json resolution order", async () => {
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

    const { apiMd } = await generateApiReview(root);

    expect(apiMd).toContain("| `.` | `browser`, `react-native`, `import`, `require` |");
  });

  it("changes the hash when overlapping export conditions change precedence", async () => {
    const files = {
      "dist/esm/index.d.ts": "export declare const value: string;",
      "dist/browser/index.d.ts": "export declare const value: number;",
    };
    const imports = { types: "./dist/esm/index.d.ts" };
    const browser = { types: "./dist/browser/index.d.ts" };
    const before = await generateApiReview(
      fixture(files, { exports: { ".": { browser, import: imports } } }),
    );
    const after = await generateApiReview(
      fixture(files, { exports: { ".": { import: imports, browser } } }),
    );

    expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
  });

  it("prints exported declarations under their export path", async () => {
    const { apiMd } = await generateApiReview(singleExportRoot);

    expect(apiMd).toContain(
      ["## Export `.`", "", "```ts", "export declare const value: string;", "```"].join("\n"),
    );
  });

  it("sorts declarations by name, not source order", async () => {
    const root = fixture({
      "dist/esm/index.d.ts": [
        "export interface Zebra {}",
        "export declare function alpha(): void;",
      ].join("\n"),
    });

    const { apiMd } = await generateApiReview(root);

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
    it("keeps status tags as line comments and drops prose", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "/**",
          " * Prose here.",
          " * @beta",
          " */",
          "export declare function preview(): void;",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("// @beta\nexport declare function preview(): void;");
      expect(apiMd).not.toContain("Prose here");
    });

    it("keeps status tags on individual overloads", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("prints a status tag on an exported variable once, above the statement", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "/**",
          " * A constant that indicates whether the environment the code is running is a Node.js compatible environment.",
          " *",
          " * @deprecated",
          " *",
          " * Use `isNodeLike` instead.",
          " */",
          "export declare const isNode: boolean;",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("// @deprecated\nexport declare const isNode: boolean;");
      expect(apiMd.split("// @deprecated").length - 1).toBe(1);
    });

    it("omits private members and prints classes without declare", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "export declare class KeyClient {",
          "    private readonly client;",
          "    readonly vaultUrl: string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export class KeyClient {\n    readonly vaultUrl: string;\n}");
    });

    it("omits the #private brand that tsc emits for ES private fields", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "export declare class Stack {",
          "    #private;",
          "    name: string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export class Stack {\n    name: string;\n}");
    });
  });

  describe("export resolution", () => {
    it("follows export * into other declaration files", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export * from "./keyClient.js";',
        "dist/esm/keyClient.d.ts": [
          "export declare class KeyClient {",
          "    readonly vaultUrl: string;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export class KeyClient {\n    readonly vaultUrl: string;\n}");
    });

    it("prints only the names a named re-export exposes", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export { KeyClient } from "./keyClient.js";',
        "dist/esm/keyClient.d.ts": [
          "export declare class KeyClient {",
          "    readonly vaultUrl: string;",
          "}",
          "export declare function createKeyClientHelper(): void;",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export class KeyClient {\n    readonly vaultUrl: string;\n}");
      expect(apiMd).not.toContain("createKeyClientHelper");
    });

    it("prints an aliased re-export under its public name", async () => {
      const root = fixture({
        "dist/esm/index.d.ts":
          'export type { RestorePollerOptions as WorkspaceClientRestorePollerOptions } from "./restorePollerHelpers.js";',
        "dist/esm/restorePollerHelpers.d.ts": [
          "export interface RestorePollerOptions {",
          "    updateIntervalInMs?: number;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        "export interface WorkspaceClientRestorePollerOptions {\n    updateIntervalInMs?: number;\n}",
      );
      expect(apiMd).not.toContain("interface RestorePollerOptions");
    });

    it("uses a local type's public export name in method signatures", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": `export type {
    AddPolicyOptions as AddPipelineOptions,
    Pipeline,
    PipelinePolicy,
} from "./pipeline.js";`,
        "dist/esm/pipeline.d.ts": `export interface AddPolicyOptions {
    afterPolicies?: string[];
}
export interface PipelinePolicy {
    name: string;
}
export interface Pipeline {
    addPolicy(policy: PipelinePolicy, options?: AddPolicyOptions): void;
}`,
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        "export interface AddPipelineOptions {\n    afterPolicies?: string[];\n}",
      );
      expect(apiMd).toContain(
        "addPolicy(policy: PipelinePolicy, options?: AddPipelineOptions): void;",
      );
      expect(apiMd).not.toContain("AddPolicyOptions");
    });

    it("resolves re-exports through several hops", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export * from "./models/index.js";',
        "dist/esm/models/index.d.ts": 'export type { Widget as WidgetModel } from "./models.js";',
        "dist/esm/models/models.d.ts": ["export interface Widget {", "    name: string;", "}"].join(
          "\n",
        ),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export interface WidgetModel {\n    name: string;\n}");
    });
  });

  describe("dependencies and hash", () => {
    const index = { "dist/esm/index.d.ts": "export declare const value: string;\n" };

    it("lists runtime and peer dependencies, sorted by name", async () => {
      const root = fixture(index, {
        dependencies: { "@azure/core-auth": "^1.9.0", "@azure/abort-controller": "^2.1.2" },
        peerDependencies: { "@azure/core-client": "^1.10.0" },
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Dependencies",
          "",
          "Only Hashed version is part of the review hash.",
          "",
          "| Package | Version specifier | Resolved version | Hashed version | Type |",
          "| --- | --- | --- | --- | --- |",
          "| `@azure/abort-controller` | `^2.1.2` | `^2.1.2` | `2` | runtime |",
          "| `@azure/core-auth` | `^1.9.0` | `^1.9.0` | `1` | runtime |",
          "| `@azure/core-client` | `^1.10.0` | `^1.10.0` | `1` | peer |",
        ].join("\n"),
      );
    });

    it("includes optional runtime dependencies in the review hash", async () => {
      const before = await generateApiReview(fixture(index));
      const after = await generateApiReview(
        fixture(index, { optionalDependencies: { "optional-package": "^1.0.0" } }),
      );

      expect(after.apiMd).toContain(
        "| `optional-package` | `^1.0.0` | `^1.0.0` | `1` | optional |",
      );
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("distinguishes optional peer dependencies from required peers", async () => {
      const peerDependencies = { pg: ">=8.0.0" };
      const required = await generateApiReview(fixture(index, { peerDependencies }));
      const optional = await generateApiReview(
        fixture(index, { peerDependencies, peerDependenciesMeta: { pg: { optional: true } } }),
      );

      expect(optional.apiMd).toContain(
        "| `pg` | `>=8.0.0` | `>=8.0.0` | `>=8.0.0` | optional peer |",
      );
      expect(optional.metadata.apiHash).not.toBe(required.metadata.apiHash);
    });

    it("shows each dependency's specifier, resolved version and hashed version", async () => {
      const root = fixture(index, { dependencies: { "@azure/core-auth": "^1.9.0" } });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("| `@azure/core-auth` | `^1.9.0` | `^1.9.0` | `1` | runtime |");
    });

    describe("catalogs", () => {
      const workspaceManifest = [
        "catalog:",
        "  tslib: ^2.8.1",
        "catalogs:",
        "  testing:",
        "    vitest: ^3.2.0",
      ].join("\n");

      it("resolves catalog: specifiers from the workspace catalog", async () => {
        const root = fixture(
          { ...index, "pnpm-workspace.yaml": workspaceManifest },
          { dependencies: { tslib: "catalog:" } },
        );

        const { apiMd } = await generateApiReview(root);

        expect(apiMd).toContain("| `tslib` | `catalog:` | `^2.8.1` | `2` | runtime |");
      });

      it("resolves named catalogs", async () => {
        const root = fixture(
          { ...index, "pnpm-workspace.yaml": workspaceManifest },
          { dependencies: { vitest: "catalog:testing" } },
        );

        const { apiMd } = await generateApiReview(root);

        expect(apiMd).toContain("| `vitest` | `catalog:testing` | `^3.2.0` | `3` | runtime |");
      });

      it("fails closed when a catalog entry is missing", async () => {
        const root = fixture(
          { ...index, "pnpm-workspace.yaml": workspaceManifest },
          { dependencies: { "@azure/core-util": "catalog:" } },
        );

        await expect(generateApiReview(root)).rejects.toThrow(
          "Unexpected input when resolving from catalog. (alias: @azure/core-util bareSpecifier: catalog:)",
        );
      });
    });

    it("resolves workspace:^ to the installed workspace package's version, like pnpm pack", async () => {
      const root = fixture(
        {
          ...index,
          "node_modules/@azure/core-auth/package.json": JSON.stringify({
            name: "@azure/core-auth",
            version: "1.11.0",
          }),
        },
        { dependencies: { "@azure/core-auth": "workspace:^" } },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("| `@azure/core-auth` | `workspace:^` | `^1.11.0` | `1` | runtime |");
    });

    it("hashes api.md with SHA-256 when there are no dependencies", async () => {
      const { apiMd, metadata } = await generateApiReview(singleExportRoot);

      expect(metadata.apiHash).toBe(createHash("sha256").update(apiMd).digest("hex"));
    });

    it("ignores minor and patch dependency bumps in the hash", async () => {
      const before = await generateApiReview(fixture(index, { dependencies: { tslib: "^1.9.0" } }));
      const after = await generateApiReview(fixture(index, { dependencies: { tslib: "^1.10.2" } }));

      expect(after.apiMd).not.toBe(before.apiMd);
      expect(after.metadata.apiHash).toBe(before.metadata.apiHash);
    });

    it("changes the hash on a major dependency bump", async () => {
      const before = await generateApiReview(fixture(index, { dependencies: { tslib: "^1.9.0" } }));
      const after = await generateApiReview(fixture(index, { dependencies: { tslib: "^2.0.0" } }));

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("changes the hash on a 0.x minor bump", async () => {
      const runtime = "@typespec/ts-http-runtime";
      const before = await generateApiReview(
        fixture(index, { dependencies: { [runtime]: "^0.3.8" } }),
      );
      const after = await generateApiReview(
        fixture(index, { dependencies: { [runtime]: "^0.4.0" } }),
      );

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("ignores 0.x patch bumps in the hash", async () => {
      const runtime = "@typespec/ts-http-runtime";
      const before = await generateApiReview(
        fixture(index, { dependencies: { [runtime]: "^0.3.0" } }),
      );
      const after = await generateApiReview(
        fixture(index, { dependencies: { [runtime]: "^0.3.8" } }),
      );

      expect(after.metadata.apiHash).toBe(before.metadata.apiHash);
    });

    it("does not collapse a union of dependency ranges to its lowest major version", async () => {
      const before = await generateApiReview(fixture(index, { dependencies: { pg: "^1.0.0" } }));
      const after = await generateApiReview(
        fixture(index, { dependencies: { pg: "^1.0.0 || ^2.0.0" } }),
      );

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("does not collapse a range spanning multiple major versions", async () => {
      const before = await generateApiReview(fixture(index, { dependencies: { pg: ">=1 <2" } }));
      const after = await generateApiReview(fixture(index, { dependencies: { pg: ">=1 <3" } }));

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("keeps exact prerelease specifiers in the hash", async () => {
      const common = "@azure/maps-common";
      const before = await generateApiReview(
        fixture(index, { dependencies: { [common]: "1.0.0-beta.2" } }),
      );
      const after = await generateApiReview(
        fixture(index, { dependencies: { [common]: "1.0.0-beta.3" } }),
      );

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("records the package, parser and TypeScript versions in the metadata", async () => {
      const { metadata } = await generateApiReview(fixture(index, { version: "1.2.3" }));

      expect(metadata).toEqual({
        apiHash: expect.stringMatching(/^[0-9a-f]{64}$/),
        packageVersion: "1.2.3",
        packageRelativePath: expect.any(String),
        parserVersion: expect.stringMatching(/^\d+\.\d+\.\d+$/),
        typescriptVersion: ts.version,
      });
    });

    it("records the package path relative to the workspace root", async () => {
      const { metadata } = await generateApiReview(fixture(index));

      expect(metadata.packageRelativePath).toBe("sdk/example/review");
    });

    it("keeps version fields out of the hash", async () => {
      const before = await generateApiReview(fixture(index, { version: "1.2.3" }));
      const after = await generateApiReview(fixture(index, { version: "1.2.4" }));

      expect(after.metadata.apiHash).toBe(before.metadata.apiHash);
    });

    it("omits the Dependencies section when there are none", async () => {
      const { apiMd } = await generateApiReview(singleExportRoot);

      expect(apiMd).not.toContain("## Dependencies");
    });
  });

  describe("export modifiers", () => {
    it("marks a declaration exported through a separate export statement as exported", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export type { ChatEventId } from "./events.js";',
        "dist/esm/events.d.ts": [
          'type ChatEventId = "chatMessageReceived" | "chatMessageEdited";',
          "export type { ChatEventId };",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        'export type ChatEventId = "chatMessageReceived" | "chatMessageEdited";',
      );
    });

    it("marks a variable exported through a separate export statement as exported", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          "declare const getConnectOptions: () => Promise<void>;",
          "export { getConnectOptions };",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export declare const getConnectOptions: () => Promise<void>;");
    });

    it("prints a default class re-exported under a name as a named export", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export { default as GeographyPoint } from "./geographyPoint.js";',
        "dist/esm/geographyPoint.d.ts": [
          "export default class GeographyPoint {",
          "    latitude: number;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export class GeographyPoint {\n    latitude: number;\n}");
      expect(apiMd).not.toContain("export default");
    });

    it("prints a default export as export default with its declared name", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'import PurviewDataMapClient from "./purviewDataMapClient.js";',
          "export default PurviewDataMapClient;",
        ].join("\n"),
        "dist/esm/purviewDataMapClient.d.ts":
          "export default function createClient(endpointParam: string): void;",
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export default function createClient(endpointParam: string): void;");
      expect(apiMd).not.toContain("function default");
    });

    it("prints a default-exported class with its declared name", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export { default } from "./reporter.js";',
        "dist/esm/reporter.d.ts": [
          "export default class PlaywrightReporter {",
          "    onEnd(): Promise<void>;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export default class PlaywrightReporter {");
      expect(apiMd).not.toContain("class default");
    });

    it("marks a value-bearing declaration that is exported only as a type", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export type { KnownApiVersions } from "./models.js";',
        "dist/esm/models.d.ts": ["export enum KnownApiVersions {", '    v1 = "v1"', "}"].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        ["// type-only export", "export enum KnownApiVersions {", '    v1 = "v1"', "}"].join("\n"),
      );
    });

    it("distinguishes wildcard type-only exports from value exports", async () => {
      const files = { "dist/esm/models.d.ts": "export declare class Client {}" };
      const before = await generateApiReview(
        fixture({ ...files, "dist/esm/index.d.ts": 'export * from "./models.js";' }),
      );
      const after = await generateApiReview(
        fixture({ ...files, "dist/esm/index.d.ts": 'export type * from "./models.js";' }),
      );

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("preserves type-only external re-exports", async () => {
      const root = fixture({
        "node_modules/@types/node/package.json": JSON.stringify({
          name: "@types/node",
          types: "./index.d.ts",
        }),
        "node_modules/@types/node/index.d.ts":
          'declare module "node:stream" {\n    export class Readable {\n    }\n}',
        "dist/esm/index.d.ts": 'export type { Readable } from "node:stream";',
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('export { type Readable } from "node:stream";');
    });

    it("preserves a type-only default import re-exported under a name", async () => {
      const root = fixture({
        ...dependency("@example/external", "export default class External {}"),
        "dist/esm/index.d.ts": [
          'import type External from "@example/external";',
          "export { External };",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('export { type default as External } from "@example/external";');
    });
  });

  describe("module objects", () => {
    it("distinguishes type-only members of exported module objects", async () => {
      const review = (typeOnly: boolean): Promise<Awaited<ReturnType<typeof generateApiReview>>> =>
        generateApiReview(
          fixture({
            "dist/esm/index.d.ts": 'export * as ns from "./bar.js";',
            "dist/esm/bar.d.ts": `export ${typeOnly ? "type " : ""}{ Foo } from "./foo.js";`,
            "dist/esm/foo.d.ts": "export declare class Foo {}",
          }),
        );
      const value = await review(false);
      const type = await review(true);
      expect(type.apiMd).toContain("// type-only export");
      expect(type.metadata.apiHash).not.toBe(value.metadata.apiHash);
    });

    it("rejects a type query on an unreviewed local module object", async () => {
      const root = fixture({
        "dist/esm/index.d.ts":
          'import * as internal from "./internal.js"; export type API = typeof internal;',
        "dist/esm/internal.d.ts": "export declare const value: string;",
      });
      await expect(generateApiReview(root)).rejects.toThrow("unreviewed local module object");
    });

    it("allows a type query on a local module object already exported for review", async () => {
      const root = fixture({
        "dist/esm/index.d.ts":
          'import * as internal from "./internal.js"; export { internal }; export type API = typeof internal;',
        "dist/esm/internal.d.ts": "export declare const value: string;",
      });
      expect((await generateApiReview(root)).apiMd).toContain("value: string;");
    });

    it("prints export * as a namespace block of the module's exports", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": 'export * as fn from "./fn.js";',
        "dist/esm/expressions.d.ts": "export type Expression = string;",
        "dist/esm/fn.d.ts": [
          'import { type Expression } from "./expressions.js";',
          "/** Adds two numbers as a deploy-time expression. */",
          "export declare function add(left: number, right: number): number;",
          "export declare function sub(left: number, right: number): number;",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        [
          "```ts",
          "export declare namespace fn {",
          "    export declare function add(left: number, right: number): number;",
          "",
          "    export declare function sub(left: number, right: number): number;",
          "}",
          "```",
        ].join("\n"),
      );
      expect(apiMd).not.toContain("import { type Expression");
      expect(apiMd).not.toContain("fn.js");
    });

    it("prints import * as X re-exported as a namespace block", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'import * as PurviewAccount from "./account/index.js";',
          "export { PurviewAccount };",
        ].join("\n"),
        "dist/esm/account/index.d.ts":
          "export declare function createClient(endpoint: string): void;",
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        [
          "export declare namespace PurviewAccount {",
          "    export declare function createClient(endpoint: string): void;",
          "}",
        ].join("\n"),
      );
      expect(apiMd).not.toContain("account/index.js");
    });

    it("nests module objects inside namespace blocks", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'import * as PurviewAccount from "./account/index.js";',
          "export { PurviewAccount };",
        ].join("\n"),
        "dist/esm/account/index.d.ts": [
          'import * as Models from "./models.js";',
          "export declare function createClient(endpoint: string): void;",
          "export { Models };",
        ].join("\n"),
        "dist/esm/account/models.d.ts": "export interface Account {\n    name: string;\n}",
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        [
          "    export declare namespace Models {",
          "        export interface Account {",
          "            name: string;",
          "        }",
          "    }",
        ].join("\n"),
      );
    });

    it("doesn't report namespace members as forgotten exports", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'export * as types from "./types.js";',
          'export { KeyVaultService } from "./service.js";',
        ].join("\n"),
        "dist/esm/types.d.ts": 'export type SkuName = "standard" | "premium";',
        "dist/esm/service.d.ts": [
          'import type { SkuName } from "./types.js";',
          "export declare class KeyVaultService {",
          "    sku: SkuName;",
          "}",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).not.toContain("arh-forgotten-export");
    });
  });

  describe("subpaths", () => {
    const types = (file: string): { import: { types: string } } => ({ import: { types: file } });

    it("records whether package.json is exported", async () => {
      const root = fixture(
        { "dist/esm/index.d.ts": "export declare const value: string;\n" },
        {
          exports: {
            "./package.json": "./package.json",
            ".": types("./dist/esm/index.d.ts"),
          },
        },
      );

      const { apiMd } = await generateApiReview(root);
      const withoutExport = await generateApiReview(
        fixture({ "dist/esm/index.d.ts": "export declare const value: string;\n" }),
      );

      expect(apiMd).toContain("| `./package.json` | `json` |");
      expect((await generateApiReview(root)).metadata.apiHash).not.toBe(
        withoutExport.metadata.apiHash,
      );
    });

    it("prints declarations only a subpath exposes under Not exported from `.`", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("lists declarations already shown under `.` by name instead of repeating them", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("names the earliest subpath that shows a declaration not exported from `.`", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

      it("orders export paths with `.` first, then by path, regardless of package.json key order", async () => {
        const { apiMd } = await generateApiReview(fixture(files, { exports: unsortedExports }));

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

      it("shows a declaration shared by two subpaths under the alphabetically first one", async () => {
        const { apiMd } = await generateApiReview(fixture(files, { exports: unsortedExports }));

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

      it("produces the same hash regardless of package.json exports order", async () => {
        const sortedExports = Object.fromEntries(
          Object.entries(unsortedExports).sort(([a], [b]) => a.localeCompare(b)),
        );

        const unsorted = await generateApiReview(fixture(files, { exports: unsortedExports }));
        const sorted = await generateApiReview(fixture(files, { exports: sortedExports }));

        expect(unsorted.metadata.apiHash).toBe(sorted.metadata.apiHash);
      });
    });

    it("shows a subpath declaration that shares a root export's name under Differs from `.`", async () => {
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

      const { apiMd } = await generateApiReview(root);

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
    function clientOptionsFixture(swapped: boolean = false): string {
      return fixture({
        ...dependency(
          "@azure-rest/core-client",
          "export interface ClientOptions { endpoint?: string; }",
        ),
        ...dependency("openai", "export interface ClientOptions { apiKey?: string; }"),
        "dist/esm/index.d.ts": `import type { ClientOptions as AzureOptions } from "@azure-rest/core-client";
import type { ClientOptions as OpenAIOptions } from "openai";
export interface ProjectOptions extends ${swapped ? "OpenAIOptions" : "AzureOptions"} {}
export interface AgentOptions extends ${swapped ? "AzureOptions" : "OpenAIOptions"} {}`,
      });
    }

    it("preserves distinct names for external types with the same exported name", async () => {
      const { apiMd } = await generateApiReview(clientOptionsFixture());

      expect(apiMd).toContain('import { ClientOptions } from "@azure-rest/core-client";');
      expect(apiMd).toContain('import { ClientOptions as ClientOptions_2 } from "openai";');
      expect(apiMd).toContain("export interface ProjectOptions extends ClientOptions {");
      expect(apiMd).toContain("export interface AgentOptions extends ClientOptions_2 {");
    });

    it("changes the hash when colliding external types swap public usages", async () => {
      const before = await generateApiReview(clientOptionsFixture());
      const after = await generateApiReview(clientOptionsFixture(true));

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("records a default-imported class used in a public signature", async () => {
      const root = fixture({
        ...dependency("openai", "export default class OpenAI { apiKey: string; }"),
        "node_modules/openai/package.json": JSON.stringify({
          name: "openai",
          type: "module",
          types: "./index.d.ts",
        }),
        "dist/esm/index.d.ts": `import OpenAI from "openai";
export declare class AIProjectClient {
    getOpenAIClient(): OpenAI;
}`,
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('import { default as OpenAI } from "openai";');
      expect(apiMd).toContain("getOpenAIClient(): OpenAI;");
    });

    it("records a default-imported namespace used in a qualified public type", async () => {
      const root = fixture({
        ...dependency(
          "express-serve-static-core",
          `declare namespace express {
    interface RequestHandler { (request: string): void; }
}
export = express;`,
        ),
        "dist/esm/index.d.ts": `import type express from "express-serve-static-core";
export declare class WebPubSubEventHandler {
    getMiddleware(): express.RequestHandler;
}`,
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('import { default as express } from "express-serve-static-core";');
      expect(apiMd).toContain("getMiddleware(): express.RequestHandler;");
    });

    it("resolves a default import through a dependency barrel to its declared class name", async () => {
      const root = fixture({
        ...dependency("openai", 'export { OpenAI as default } from "./client.js";'),
        "node_modules/openai/package.json": JSON.stringify({
          name: "openai",
          type: "module",
          types: "./index.d.ts",
        }),
        "node_modules/openai/client.d.ts": "export class OpenAI { apiKey: string; }",
        "dist/esm/index.d.ts": `import OpenAI from "openai";
export declare class AIProjectClient {
    getOpenAIClient(): OpenAI;
}`,
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('import { default as OpenAI } from "openai";');
      expect(apiMd).toContain("getOpenAIClient(): OpenAI;");
    });

    it("collects external types used in signatures into a References import block", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("prints re-exports of external declarations as export-from lines", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("preserves the public name of an aliased external re-export", async () => {
      const root = fixture(
        {
          ...dependency(
            "@azure/storage-blob",
            "export interface BlobServiceProperties {\n    logging?: boolean;\n}",
          ),
          "dist/esm/index.d.ts":
            'export { type BlobServiceProperties as DataLakeServiceProperties } from "@azure/storage-blob";',
        },
        { dependencies: { "@azure/storage-blob": "^12.31.0" } },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("BlobServiceProperties as DataLakeServiceProperties");
      expect(apiMd).not.toContain('export { BlobServiceProperties } from "@azure/storage-blob";');
    });

    it("uses an external type's exported name, not a local import alias", async () => {
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

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('import { Context } from "@opentelemetry/api";');
      expect(apiMd).toContain(
        "export declare function startSpan(name: string, context?: Context): void;",
      );
      expect(apiMd).not.toContain("OTContext");
    });

    it("rewrites namespace-qualified external types to their exported names", async () => {
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

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export interface CreateKeyOptions extends OperationOptions {");
      expect(apiMd).toContain('import { OperationOptions } from "@azure-rest/core-client";');
      expect(apiMd).not.toContain("coreClient");
    });

    it("rewrites import() types from dependencies to their exported names", async () => {
      const root = fixture(
        {
          ...dependency("@azure/logger", "export interface AzureLogger {\n}"),
          "dist/esm/index.d.ts":
            'export declare const logger: import("@azure/logger").AzureLogger;',
        },
        { dependencies: { "@azure/logger": "^1.1.4" } },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export declare const logger: AzureLogger;");
      expect(apiMd).toContain('import { AzureLogger } from "@azure/logger";');
    });

    it("rewrites package-local import() types without file paths", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'export { logger } from "./log.js";',
          'export type { TypeSpecRuntimeLogger } from "./logger/logger.js";',
        ].join("\n"),
        "dist/esm/log.d.ts":
          'export declare const logger: import("./logger/logger.js").TypeSpecRuntimeLogger;',
        "dist/esm/logger/logger.d.ts": "export interface TypeSpecRuntimeLogger {\n}",
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export declare const logger: TypeSpecRuntimeLogger;");
      expect(apiMd).not.toContain("logger.js");
    });

    it("follows local re-export hops to the dependency that declares a re-export", async () => {
      const root = fixture(
        {
          ...dependency("@azure/core-paging", "export interface PageSettings {\n}"),
          "dist/esm/index.d.ts": 'export { PageSettings } from "./paging.js";',
          "dist/esm/paging.d.ts": 'export { PageSettings } from "@azure/core-paging";',
        },
        { dependencies: { "@azure/core-paging": "^1.6.2" } },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('export { PageSettings } from "@azure/core-paging";');
      expect(apiMd).not.toContain("paging.js");
    });
  });

  describe("forgotten exports", () => {
    it("includes transitive unexported types in the review and hash", async () => {
      function hiddenTypeFixture(valueType: string): string {
        return fixture({
          "dist/esm/index.d.ts": 'export { use } from "./api.js";',
          "dist/esm/api.d.ts": [
            "interface Inner { value: " + valueType + "; }",
            "interface Options { nested: Inner; }",
            "export declare function use(options: Options): void;",
          ].join("\n"),
        });
      }

      const before = await generateApiReview(hiddenTypeFixture("string"));
      const after = await generateApiReview(hiddenTypeFixture("number"));

      expect(before.apiMd).toContain("## Referenced unexported declarations");
      expect(before.apiMd).toContain("interface Options {");
      expect(before.apiMd).toContain("interface Inner {");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("includes unexported variables used in public types", async () => {
      const review = (value: string): Promise<Awaited<ReturnType<typeof generateApiReview>>> =>
        generateApiReview(
          fixture({
            "dist/esm/index.d.ts": 'export type { Value } from "./internal.js";',
            "dist/esm/internal.d.ts": [
              `declare const values: readonly ["${value}"];`,
              "export type Value = (typeof values)[number];",
            ].join("\n"),
          }),
        );

      const before = await review("a");
      const after = await review("b");

      expect(before.apiMd).toContain("declare const values: readonly [");
      expect(before.apiMd).toContain('"a"');
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("includes transitive declarations referenced by local import types", async () => {
      const review = (valueType: string): Promise<Awaited<ReturnType<typeof generateApiReview>>> =>
        generateApiReview(
          fixture({
            "dist/esm/index.d.ts": 'export type ClientOptions = import("./internal.js").Options;',
            "dist/esm/internal.d.ts": [
              `interface Inner { value: ${valueType}; }`,
              "export interface Options { nested: Inner; }",
            ].join("\n"),
          }),
        );

      const before = await review("string");
      const after = await review("number");

      expect(before.apiMd).toContain("interface Options {");
      expect(before.apiMd).toContain("interface Inner {");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("warns above each member that uses a forgotten declaration", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("warns above a top-level declaration whose heritage uses a forgotten declaration", async () => {
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

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        "// Warning: (arh-forgotten-export: StorageClient)\nexport class BlobClient extends StorageClient {",
      );
    });

    it("warns only about unexported package-local declarations", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    function referenceFixture(browserModule: string): string {
      const esm = [
        'import type { Foo } from "@example/node";',
        "export declare function use(foo: Foo): void;",
      ].join("\n");
      return fixture(
        {
          ...dependency("@example/node", "export interface Foo { value: string; }"),
          ...dependency("@example/browser", "export interface Foo { value: string; }"),
          "dist/esm/index.d.ts": esm,
          "dist/commonjs/package.json": JSON.stringify({ type: "commonjs" }),
          "dist/commonjs/index.d.ts": esm,
          "dist/browser/index.d.ts": [
            `import type { Foo } from "${browserModule}";`,
            "export declare function use(foo: Foo): void;",
          ].join("\n"),
        },
        {
          exports: coreAuthExports,
          dependencies: { "@example/node": "1.0.0", "@example/browser": "1.0.0" },
        },
      );
    }

    it("shows condition-specific external reference changes even when declarations match", async () => {
      const { apiMd } = await generateApiReview(referenceFixture("@example/browser"));

      expect(apiMd).toContain(
        [
          "### `browser`",
          "",
          "#### References",
          "",
          "```diff",
          '-import { Foo } from "@example/node";',
          '+import { Foo } from "@example/browser";',
          "```",
        ].join("\n"),
      );
      expect(apiMd).toContain("Identical to the ESM view: `require`.");
      expect(apiMd).not.toContain("#### Export `.`");
    });

    it("changes the hash when only the browser reference source changes", async () => {
      const before = await generateApiReview(referenceFixture("@example/node"));
      const after = await generateApiReview(referenceFixture("@example/browser"));

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    function reExportFixture(browserName: string): string {
      const esm = 'export { RestError, isRestError } from "@azure/core-rest-pipeline";';
      return fixture(
        {
          ...dependency(
            "@azure/core-rest-pipeline",
            `export declare class RestError { code: string; }
export declare function isRestError(error: unknown): error is RestError;`,
          ),
          "dist/esm/index.d.ts": esm,
          "dist/commonjs/package.json": JSON.stringify({ type: "commonjs" }),
          "dist/commonjs/index.d.ts": esm,
          "dist/browser/index.d.ts": `export { ${browserName} } from "@azure/core-rest-pipeline";`,
        },
        { exports: coreAuthExports },
      );
    }

    it("shows condition-specific external re-export changes", async () => {
      const { apiMd } = await generateApiReview(reExportFixture("RestError"));

      expect(apiMd).toContain(
        [
          "### `browser`",
          "",
          "#### Export `.`",
          "",
          "```diff",
          "-export {",
          "-    isRestError,",
          "-    RestError,",
          '-} from "@azure/core-rest-pipeline";',
          '+export { RestError } from "@azure/core-rest-pipeline";',
          "```",
        ].join("\n"),
      );
      expect(apiMd).toContain("Identical to the ESM view: `require`.");
    });

    it("changes the hash between different re-export-only browser surfaces", async () => {
      const before = await generateApiReview(reExportFixture("RestError"));
      const after = await generateApiReview(reExportFixture("isRestError"));

      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("includes repeated subpath export membership in runtime differences and the hash", async () => {
      function repeatedFixture(alias: string): string {
        return fixture(
          {
            ...dependency("@example/external", "export declare class Foo {}"),
            "dist/esm/index.d.ts": 'export { Foo } from "@example/external";',
            "dist/esm/subpath.d.ts": 'export { Foo } from "@example/external";',
            "dist/browser/index.d.ts": 'export { Foo } from "@example/external";',
            "dist/browser/subpath.d.ts": `export { Foo as ${alias} } from "@example/external";`,
          },
          {
            exports: {
              ".": {
                import: { types: "./dist/esm/index.d.ts" },
                browser: { types: "./dist/browser/index.d.ts" },
              },
              "./subpath": {
                import: { types: "./dist/esm/subpath.d.ts" },
                browser: { types: "./dist/browser/subpath.d.ts" },
              },
            },
          },
        );
      }

      const before = await generateApiReview(repeatedFixture("Bar"));
      const after = await generateApiReview(repeatedFixture("Baz"));

      expect(before.apiMd).toContain("+// Foo as Bar is also exported from .");
      expect(after.apiMd).toContain("+// Foo as Baz is also exported from .");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("includes condition-specific declarations that differ from the root export", async () => {
      function differingFixture(type: string): string {
        return fixture(
          {
            "dist/esm/index.d.ts": "export interface Options { root: string; }",
            "dist/browser/index.d.ts": "export interface Options { root: string; }",
            "dist/esm/subpath.d.ts": "export interface Options { value: string; }",
            "dist/browser/subpath.d.ts": `export interface Options { value: ${type}; }`,
          },
          {
            exports: {
              ".": {
                import: { types: "./dist/esm/index.d.ts" },
                browser: { types: "./dist/browser/index.d.ts" },
              },
              "./subpath": {
                import: { types: "./dist/esm/subpath.d.ts" },
                browser: { types: "./dist/browser/subpath.d.ts" },
              },
            },
          },
        );
      }

      const before = await generateApiReview(differingFixture("number"));
      const after = await generateApiReview(differingFixture("boolean"));

      expect(before.apiMd).toContain("+    value: number;");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("distinguishes a type-only repeated export from a value export", async () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": "export declare class Foo {}",
          "dist/esm/subpath.d.ts": 'export { Foo } from "./index.js";',
          "dist/browser/index.d.ts": "export declare class Foo {}",
          "dist/browser/subpath.d.ts": 'export type { Foo } from "./index.js";',
        },
        {
          exports: {
            ".": {
              import: { types: "./dist/esm/index.d.ts" },
              browser: { types: "./dist/browser/index.d.ts" },
            },
            "./subpath": {
              import: { types: "./dist/esm/subpath.d.ts" },
              browser: { types: "./dist/browser/subpath.d.ts" },
            },
          },
        },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("+// type Foo is also exported from .");
    });

    it("lists conditions whose declarations match the ESM view as identical", async () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": accessToken,
          "dist/commonjs/index.d.ts": accessToken,
          "dist/browser/index.d.ts": accessToken,
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        "## Runtime differences\n\nIdentical to the ESM view: `require`, `browser`.",
      );
    });

    it("reads each condition's own declaration files", async () => {
      const root = fixture(
        {
          "dist/esm/index.d.ts": accessToken,
          "dist/commonjs/index.d.ts": accessToken,
          "dist/browser/index.d.ts":
            "export interface AccessToken {\n    token: string | undefined;\n}",
        },
        { exports: coreAuthExports },
      );

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("Identical to the ESM view: `require`.");
    });

    it("omits Runtime differences for import-only packages", async () => {
      const { apiMd } = await generateApiReview(singleExportRoot);

      expect(apiMd).not.toContain("## Runtime differences");
    });

    it("shows a changed member as a hunk under its declaration header", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("shows a declaration missing from a condition as removed lines", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

    it("shows a declaration only a condition has as added lines", async () => {
      const esm = [
        "export declare class AvroReadableFromStream {",
        "    constructor(readable: NodeJS.ReadableStream);",
        "}",
      ].join("\n");
      const root = fixture(
        {
          ...dependency("@types/node", "declare namespace NodeJS { interface ReadableStream {} }"),
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

      const { apiMd } = await generateApiReview(root);

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

    it("elides lines far from a change with @@ but keeps the header", async () => {
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

      const { apiMd } = await generateApiReview(root);

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

  describe("augmentations and legacy exports", () => {
    it("includes package-owned global script declarations in the hash", async () => {
      const review = (type: string): Promise<Awaited<ReturnType<typeof generateApiReview>>> =>
        generateApiReview(
          fixture({
            "dist/esm/index.d.ts": 'import "./globals.js"; export {};',
            "dist/esm/globals.d.ts": `interface Window { added: ${type}; }`,
          }),
        );
      const before = await review("string");
      const after = await review("number");
      expect(before.apiMd).toContain("added: string;");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("includes package-owned module and global augmentations in the review and hash", async () => {
      const augmentation = (memberType: string): string =>
        fixture({
          "dist/esm/index.d.ts": [
            'import "./augment.js";',
            "export interface Options { value: string; }",
            `declare global { interface Window { added: ${memberType}; } }`,
          ].join("\n"),
          "dist/esm/augment.d.ts": [
            'import "./index.js";',
            `declare module "./index.js" { interface Options { extra: ${memberType}; } }`,
          ].join("\n"),
        });

      const before = await generateApiReview(augmentation("string"));
      const after = await generateApiReview(augmentation("number"));
      expect(before.apiMd).toContain("## Module and global augmentations");
      expect(before.apiMd).toContain('declare module "./index.js"');
      expect(before.apiMd).toContain("declare global");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("compares supplemental declarations relative to each runtime declaration root", async () => {
      const exports = {
        ".": {
          browser: { types: "./dist/browser/index.d.ts" },
          import: { types: "./dist/esm/index.d.ts" },
        },
      };
      const index = [
        'import "./augment.js";',
        'import "./nested/augment.js";',
        'export type * from "./models.js";',
        "export declare const value: string;",
      ].join("\n");
      const augmentation = (name: string, type: string): string =>
        `export {};\ndeclare global { interface Window { ${name}: ${type}; } }`;
      const review = (
        browserType: string,
      ): Promise<Awaited<ReturnType<typeof generateApiReview>>> =>
        generateApiReview(
          fixture(
            {
              "dist/esm/index.d.ts": index,
              "dist/browser/index.d.ts": index,
              "dist/esm/augment.d.ts": augmentation("added", "string"),
              "dist/browser/augment.d.ts": augmentation("added", "string"),
              "dist/esm/nested/augment.d.ts": augmentation("nested", "string"),
              "dist/browser/nested/augment.d.ts": augmentation("nested", browserType),
              "dist/esm/models.d.ts": "export interface Model { name: string; }",
              "dist/browser/models.d.ts": "export interface Model { name: string; }",
            },
            { exports },
          ),
        );

      const identical = await review("string");
      const changed = await review("number");

      expect(identical.apiMd).toContain("Identical to the ESM view: `browser`.");
      expect(identical.apiMd).toContain("// augment.d.ts");
      expect(identical.apiMd).toContain("// nested/augment.d.ts");
      expect(identical.apiMd).not.toContain("### `browser`");
      expect(identical.apiMd).not.toContain("__global");
      expect(changed.apiMd).toContain("### `browser`");
      expect(changed.apiMd).toContain("nested: number;");
      expect(changed.metadata.apiHash).not.toBe(identical.metadata.apiHash);
    });

    it("resolves imports used only by an augmentation without exported declarations", async () => {
      const root = fixture({
        ...dependency("@example/dependency", "export interface Shape { size: number; }"),
        "dist/esm/index.d.ts": [
          'import type { Shape } from "@example/dependency";',
          "declare global { interface Window { added: Shape; } }",
          "export {};",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain('import { Shape } from "@example/dependency";');
      expect(apiMd).toContain("added: Shape;");
    });

    it("records legacy TypeScript subpaths when they match reviewed require entry points", async () => {
      const files = {
        "dist/esm/index.d.ts": "export declare const value: string;",
        "dist/commonjs/index.d.ts": "export declare const value: string;",
        "dist/esm/models.d.ts": "export interface Model { name: string; }",
        "dist/commonjs/models.d.ts": "export interface Model { name: string; }",
      };
      const exports = {
        ".": {
          import: { types: "./dist/esm/index.d.ts" },
          require: { types: "./dist/commonjs/index.d.ts" },
        },
        "./models": {
          import: { types: "./dist/esm/models.d.ts" },
          require: { types: "./dist/commonjs/models.d.ts" },
        },
      };
      const before = await generateApiReview(fixture(files, { exports }));
      const after = await generateApiReview(
        fixture(files, {
          exports,
          types: "./dist/commonjs/index.d.ts",
          typesVersions: { "*": { models: ["dist/commonjs/models.d.ts"] } },
        }),
      );

      expect(after.apiMd).toContain("| `*` | `./models` |");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });

    it("records the presence of the legacy root types field", async () => {
      const files = { "dist/esm/index.d.ts": "export declare const value: string;" };
      const before = await generateApiReview(fixture(files));
      const after = await generateApiReview(fixture(files, { types: "./dist/esm/index.d.ts" }));

      expect(after.apiMd).toContain("Root declaration fields: `types`.");
      expect(after.metadata.apiHash).not.toBe(before.metadata.apiHash);
    });
  });

  describe("fail closed", () => {
    it("rejects unsupported versioned or wildcard export maps", async () => {
      const index = { "dist/esm/index.d.ts": "export declare const value: string;" };
      const versioned = fixture(index, { typesVersions: { "*": { "*": ["dist/*"] } } });
      const wildcard = fixture(index, {
        exports: { "./*": { import: { types: "./dist/esm/index.d.ts" } } },
      });

      await expect(generateApiReview(versioned)).rejects.toThrow("Unsupported typesVersions");
      await expect(generateApiReview(wildcard)).rejects.toThrow("Unsupported API review export");
    });

    it("rejects a legacy types entry point that differs from the reviewed require entry point", async () => {
      const root = fixture(
        { "dist/esm/index.d.ts": "export declare const value: string;" },
        { types: "./dist/legacy/index.d.ts" },
      );

      await expect(generateApiReview(root)).rejects.toThrow("Legacy types entry point");
    });

    it("rejects a package.json export pointing at another file", async () => {
      const root = fixture(
        { "dist/esm/index.d.ts": "export declare const value: string;" },
        {
          exports: {
            ".": { import: { types: "./dist/esm/index.d.ts" } },
            "./package.json": "./other.json",
          },
        },
      );

      await expect(generateApiReview(root)).rejects.toThrow("Unsupported package.json export");
    });

    it("rejects export assignments that cannot be represented", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": "declare const client: string;\nexport = client;",
      });

      await expect(generateApiReview(root)).rejects.toThrow("Export assignments and UMD globals");
    });

    it("allows an empty declaration entry point with no library API", async () => {
      const root = fixture({ "dist/esm/index.d.ts": "" });

      const { apiMd } = await generateApiReview(root);
      expect(apiMd).toContain("## Export `.`");
    });

    it("throws when a module specifier can't be resolved", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": [
          'import type { TokenCredential } from "@azure/core-auth";',
          "export declare class KeyClient {",
          "    constructor(credential: TokenCredential);",
          "}",
        ].join("\n"),
      });

      await expect(generateApiReview(root)).rejects.toThrow(
        "[import] dist/esm/index.d.ts: Cannot find module '@azure/core-auth' or its corresponding type declarations.",
      );
    });

    it("rejects unresolved names in exported signatures", async () => {
      const root = fixture({
        "dist/esm/index.d.ts": "export declare function use(value: MissingType): void;",
      });

      await expect(generateApiReview(root)).rejects.toThrow("Cannot find name 'MissingType'");
    });

    it("lists names that don't exist in their module under Unresolved references", async () => {
      const root = fixture({
        ...dependency(
          "@azure/storage-common",
          "export declare class StorageSharedKeyCredential {\n}",
        ),
        "dist/esm/index.d.ts":
          'export { StorageSharedKeyCredentialPolicy } from "@azure/storage-common";',
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Unresolved references",
          "",
          "| Condition | File | Problem |",
          "| --- | --- | --- |",
          `| \`import\` | \`dist/esm/index.d.ts\` | '"@azure/storage-common"' has no exported member named 'StorageSharedKeyCredentialPolicy'. Did you mean 'StorageSharedKeyCredential'? |`,
        ].join("\n"),
      );
    });

    it("leaves names that don't exist in their module out of the export section", async () => {
      const root = fixture({
        ...dependency(
          "@azure/storage-common",
          "export declare class StorageSharedKeyCredential {\n}",
        ),
        "dist/esm/index.d.ts":
          'export { StorageSharedKeyCredential, StorageSharedKeyCredentialPolicy } from "@azure/storage-common";',
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain(
        [
          "## Export `.`",
          "",
          "```ts",
          'export { StorageSharedKeyCredential } from "@azure/storage-common";',
          "```",
        ].join("\n"),
      );
    });

    it("keeps the names of different missing references", async () => {
      const root = fixture({
        ...dependency(
          "@azure/storage-common",
          "export declare class StorageSharedKeyCredential {\n}",
        ),
        "dist/esm/index.d.ts": [
          'import type { StorageRetryOptions } from "@azure/storage-common";',
          'export { StorageSharedKeyCredentialPolicy } from "@azure/storage-common";',
          "export declare function retry(options: StorageRetryOptions): void;",
        ].join("\n"),
      });

      const { apiMd } = await generateApiReview(root);

      expect(apiMd).toContain("export declare function retry(options: StorageRetryOptions): void;");
    });

    it("resolves the require view with CommonJS conditions", async () => {
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

      await expect(generateApiReview(root)).rejects.toThrow(
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

      it("resolves Node.js built-in modules with the package's @types/node", async () => {
        const root = fixture({ ...nodeTypes, "dist/esm/index.d.ts": clients });

        const { apiMd } = await generateApiReview(root);

        expect(apiMd).toContain('import { Readable } from "node:stream";');
      });

      it("resolves Node.js built-ins in browser views too", async () => {
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

        const { apiMd } = await generateApiReview(root);

        expect(apiMd).toContain("Identical to the ESM view: `browser`.");
      });
    });

    it("throws when implementation .ts files are pulled into the program", async () => {
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

      await expect(generateApiReview(root)).rejects.toThrow(
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
    expect(readReview(outputDir)).toEqual(await generateApiReview(root));
  });

  it("writes to the package root when --output-dir is omitted", async () => {
    const root = fixture(index);

    const succeeded = await generateApiReviewCommand("--package-root", root);

    expect(succeeded).toBe(true);
    expect(readReview(root)).toEqual(await generateApiReview(root));
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
    expect(readReview(root)).toEqual(await generateApiReview(root));
  });

  it("resolves catalog dependencies from each --package-root workspace, independently of cwd", async () => {
    const workspaceA = fixture(
      {
        ...index,
        "pnpm-workspace.yaml": "catalog:\n  '@example/catalog-dep': ^1.2.0\n",
      },
      { dependencies: { "@example/catalog-dep": "catalog:" } },
    );
    const workspaceB = fixture(
      {
        ...index,
        "pnpm-workspace.yaml": "catalog:\n  '@example/catalog-dep': ^2.3.0\n",
      },
      { dependencies: { "@example/catalog-dep": "catalog:" } },
    );
    const unrelatedDirectory = fixture(index);
    const cwd = vi.spyOn(process, "cwd").mockReturnValue(unrelatedDirectory);

    try {
      const succeededA = await generateApiReviewCommand(
        "--package-root",
        workspaceA,
        "--output-dir",
        path.join(workspaceA, "out"),
      );
      const succeededB = await generateApiReviewCommand(
        "--package-root",
        workspaceB,
        "--output-dir",
        path.join(workspaceB, "out"),
      );

      expect(succeededA).toBe(true);
      expect(succeededB).toBe(true);
      expect(readReview(path.join(workspaceA, "out")).apiMd).toContain(
        "| `@example/catalog-dep` | `catalog:` | `^1.2.0` | `1` | runtime |",
      );
      expect(readReview(path.join(workspaceB, "out")).apiMd).toContain(
        "| `@example/catalog-dep` | `catalog:` | `^2.3.0` | `2` | runtime |",
      );
    } finally {
      cwd.mockRestore();
    }
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
