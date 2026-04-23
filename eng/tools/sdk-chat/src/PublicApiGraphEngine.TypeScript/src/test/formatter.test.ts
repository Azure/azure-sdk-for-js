// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { stripImportPrefix, formatStubs, toJson } from "../formatter.js";
import type { ApiIndex } from "../models.js";

describe("stripImportPrefix", () => {
  it("strips namespace aliases from qualified names", () => {
    const result = stripImportPrefix(
      "coreClient.OperationOptions",
      false,
      new Set(["coreClient"]),
    );
    expect(result).toBe("OperationOptions");
  });

  it("preserves non-aliased qualified names", () => {
    const result = stripImportPrefix("SomeModule.Type", false, new Set(["coreClient"]));
    expect(result).toBe("SomeModule.Type");
  });

  it("strips import(...) prefixes", () => {
    const result = stripImportPrefix(
      'import("@azure/core-client").OperationOptions',
      false,
      new Set(),
    );
    expect(result).toBe("OperationOptions");
  });

  it("strips multiple import(...) prefixes in generics", () => {
    const result = stripImportPrefix(
      'import("./path").Foo<import("./p").Bar>',
      false,
      new Set(),
    );
    expect(result).toBe("Foo<Bar>");
  });

  it("strips generic parameters when baseOnly is true", () => {
    const result = stripImportPrefix("Promise<Response>", true, new Set());
    expect(result).toBe("Promise");
  });

  it("handles typeof import(...) syntax", () => {
    const result = stripImportPrefix('typeof import("@azure/core-client")', false, new Set());
    expect(result).toBe("typeof core-client");
  });

  it("returns plain type name unchanged when no prefix present", () => {
    const result = stripImportPrefix("OperationOptions", false, new Set());
    expect(result).toBe("OperationOptions");
  });

  it("strips multiple namespace aliases", () => {
    const result = stripImportPrefix(
      "coreClient.Foo | coreAuth.TokenCredential",
      false,
      new Set(["coreClient", "coreAuth"]),
    );
    expect(result).toBe("Foo | TokenCredential");
  });
});

function makeApi(overrides: Partial<ApiIndex> = {}): ApiIndex {
  return {
    package: "@azure/test-pkg",
    modules: [],
    ...overrides,
  };
}

describe("formatStubs", () => {
  it("produces header lines for minimal ApiIndex", () => {
    const output = formatStubs(makeApi());
    expect(output).toContain("// @azure/test-pkg - Public API Surface");
    expect(output).toContain("// Graphed by PublicApiGraphEngine.TypeScript");
  });

  it("emits function declarations from a module", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            functions: [{ name: "doStuff", sig: "a: string", ret: "void" }],
          },
        ],
      }),
    );
    expect(output).toContain("export function doStuff(a: string): void;");
  });

  it("emits interface with properties", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            interfaces: [
              {
                name: "MyOpts",
                properties: [{ name: "timeout", type: "number", optional: true }],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("export interface MyOpts {");
    expect(output).toContain("timeout?: number;");
  });

  it("distinguishes ./browser subpath from browser condition suffix", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            exportPath: ".",
            condition: "default",
            classes: [{ name: "MainClient" }],
          },
          {
            name: "index",
            exportPath: ".",
            condition: "browser",
            classes: [{ name: "MainClient" }],
          },
          {
            name: "browser-entry",
            exportPath: "./browser",
            condition: "default",
            classes: [{ name: "BrowserHelper" }],
          },
        ],
      }),
    );
    // The ./browser subpath should get the bare specifier
    expect(output).toContain('declare module "@azure/test-pkg/browser"');
    // The root browser condition should be disambiguated with (condition)
    expect(output).toContain('declare module "@azure/test-pkg/browser (condition)"');
  });

  it("emits condition comments for multi-condition modules", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            condition: "default",
            functions: [{ name: "a", sig: "" }],
          },
          {
            name: "index",
            condition: "browser",
            functions: [{ name: "b", sig: "" }],
          },
        ],
      }),
    );
    expect(output).toContain("// Condition: default");
    expect(output).toContain("// Condition: browser");
    expect(output).toContain('declare module "@azure/test-pkg"');
  });

  it("emits namespace with nested content", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            namespaces: [
              {
                name: "Inner",
                functions: [{ name: "helper", sig: "", ret: "string" }],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("export namespace Inner {");
    expect(output).toContain("export function helper(): string;");
  });

  it("emits type alias declarations", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            types: [{ name: "ID", type: "string", typeParams: "" }],
          },
        ],
      }),
    );
    expect(output).toContain("export type ID = string;");
  });

  it("emits enum declarations", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            enums: [{ name: "Color", values: ["Red", "Green", "Blue"] }],
          },
        ],
      }),
    );
    expect(output).toContain("export enum Color {");
    expect(output).toContain("Red, Green, Blue");
  });

  it("emits method type parameters on interface methods", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            interfaces: [
              {
                name: "Collection",
                methods: [
                  {
                    name: "map",
                    typeParams: "T, U",
                    sig: "fn: (item: T) => U",
                    ret: "U[]",
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("map<T, U>(fn: (item: T) => U): U[];");
  });

  it("emits static keyword for class properties", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            classes: [
              {
                name: "Counter",
                properties: [{ name: "count", type: "number", static: true }],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("static count: number;");
  });

  it("emits abstract class and abstract methods", () => {
    const output = formatStubs(
      makeApi({
        modules: [
          {
            name: "index",
            classes: [
              {
                name: "Shape",
                abstract: true,
                methods: [
                  { name: "draw", sig: "ctx: CanvasRenderingContext2D", ret: "void", abstract: true },
                ],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("export abstract class Shape");
    expect(output).toContain("abstract draw(ctx: CanvasRenderingContext2D): void;");
  });

  it("emits constructors in dependency classes", () => {
    const output = formatStubs(
      makeApi({
        modules: [{ name: "index" }],
        dependencies: [
          {
            package: "@azure/core-client",
            classes: [
              {
                name: "ServiceClient",
                constructors: [{ sig: "options?: ServiceClientOptions" }],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("constructor(options?: ServiceClientOptions);");
  });

  it("emits implements clause in resolved dependency classes", () => {
    const output = formatStubs(
      makeApi({
        modules: [{ name: "index" }],
        resolvedDependencies: [
          {
            package: "@azure/core-util",
            modules: [
              {
                name: "index",
                classes: [
                  {
                    name: "Resource",
                    implements: ["Disposable"],
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    expect(output).toContain("implements Disposable");
  });
});

describe("toJson", () => {
  it("serializes ApiIndex to JSON string", () => {
    const api = makeApi({
      modules: [{ name: "index", functions: [{ name: "foo", sig: "" }] }],
    });
    const json = toJson(api);
    const parsed = JSON.parse(json);
    expect(parsed.package).toBe("@azure/test-pkg");
    expect(parsed.modules[0].functions[0].name).toBe("foo");
  });

  it("omits qualifiedReferencedTypes from output", () => {
    const api = makeApi({ qualifiedReferencedTypes: ["NodeJS.ReadableStream"] });
    const json = toJson(api);
    const parsed = JSON.parse(json);
    expect(parsed.qualifiedReferencedTypes).toBeUndefined();
  });

  it("pretty-prints when requested", () => {
    const api = makeApi();
    const compact = toJson(api, false);
    const pretty = toJson(api, true);
    expect(pretty.length).toBeGreaterThan(compact.length);
    expect(pretty).toContain("\n");
  });

  it("round-trips through JSON.parse without data loss", () => {
    const api = makeApi({
      version: "1.0.0",
      modules: [
        {
          name: "main",
          condition: "default",
          interfaces: [
            {
              name: "Options",
              properties: [{ name: "retries", type: "number", optional: true }],
            },
          ],
        },
      ],
    });
    const json = toJson(api, true);
    const parsed: ApiIndex = JSON.parse(json);
    expect(parsed.package).toBe(api.package);
    expect(parsed.version).toBe("1.0.0");
    expect(parsed.modules[0].interfaces![0].name).toBe("Options");
    expect(parsed.modules[0].interfaces![0].properties![0].optional).toBe(true);
  });
});
