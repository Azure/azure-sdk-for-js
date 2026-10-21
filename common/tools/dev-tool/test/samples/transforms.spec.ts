// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import {
  createToCommonJsTransform,
  isDependency,
  isNodeBuiltin,
} from "../../src/util/samples/transforms.ts";
import { withSourceFile, withTypeScriptApi } from "../../src/util/typescript/api.ts";
import { applyTextEdits } from "../../src/util/typescript/edits.ts";

/**
 * Applies the CommonJS transform to TypeScript or JavaScript source text.
 */
function toCommonJs(
  source: string,
  requireInScope: (moduleSpecifier: string) => unknown = () => ({}),
): Promise<string> {
  return withTypeScriptApi((api) =>
    withSourceFile(api, "sample.js", source, (sourceFile) =>
      applyTextEdits(source, createToCommonJsTransform(requireInScope)({ api, sourceFile })),
    ),
  );
}

describe("Sample import transforms", () => {
  for (const specifier of [
    "fs",
    "fs/promises",
    "path",
    "node:test",
    "node:quic",
    "punycode",
    "sys",
  ]) {
    it(`recognizes ${specifier} as a built-in, not a dependency`, () => {
      assert.isTrue(isNodeBuiltin(specifier));
      assert.isFalse(isDependency(specifier));
    });

    it(`converts a default import of ${specifier} without accessing .default`, async () => {
      const result = await toCommonJs(`import builtin from "${specifier}";`, () => {
        throw new Error("Built-ins must not be loaded to detect default exports.");
      });
      assert.equal(result.trim(), `const builtin = require("${specifier}");`);
    });
  }

  it("distinguishes package dependencies and relative imports from built-ins", () => {
    for (const specifier of ["@azure/identity", "punycode.js", "fs-extra", "quic"]) {
      assert.isFalse(isNodeBuiltin(specifier));
      assert.isTrue(isDependency(specifier));
    }
    assert.isFalse(isNodeBuiltin("./fs"));
    assert.isFalse(isDependency("./fs"));
  });

  it("converts each form of import declaration", async () => {
    const result = await toCommonJs(
      [
        'import "side-effect";',
        'import * as everything from "namespace";',
        'import { a, b as c } from "named";',
        'import fallback, { d } from "mixed";',
        'import { e } from "@azure/identity";',
        'import local from "./local.js";',
      ].join("\n"),
    );
    assert.equal(
      result,
      [
        'require("side-effect");',
        'const everything = require("namespace");',
        'const { a, b: c } = require("named");',
        'const fallback = require("mixed"), { d } = require("mixed");',
        'const { e } = require("@azure/identity");',
        'const local = require("./local.js").default;',
      ].join("\n"),
    );
  });

  it("treats packages that declare __esModule as having a default export", async () => {
    const result = await toCommonJs('import esm from "transpiled";', (specifier) => ({
      __esModule: specifier === "transpiled",
    }));
    assert.equal(result, 'const esm = require("transpiled").default;');
  });

  it("keeps the comments around the declarations it replaces", async () => {
    const result = await toCommonJs(
      [
        "// Copyright (c) Microsoft Corporation.",
        "",
        "/** Imports a dependency. */",
        'import { a } from "named"; // trailing',
        "",
        "export {};",
      ].join("\n"),
    );
    assert.equal(
      result,
      [
        "// Copyright (c) Microsoft Corporation.",
        "",
        "/** Imports a dependency. */",
        'const { a } = require("named"); // trailing',
        "",
        ";",
      ].join("\n"),
    );
  });

  it("removes export declarations and assignments", async () => {
    const result = await toCommonJs(
      ["export {};", 'export * from "./other.js";', "export = a;"].join("\n"),
    );
    assert.equal(result, [";", ";", ";"].join("\n"));
  });
});
