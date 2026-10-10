// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import ts from "typescript";
import {
  createToCommonJsTransform,
  isDependency,
  isNodeBuiltin,
} from "../../src/util/samples/transforms.ts";

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

    it(`converts a default import of ${specifier} without accessing .default`, () => {
      const source = ts.createSourceFile(
        "sample.ts",
        `import builtin from "${specifier}";`,
        ts.ScriptTarget.Latest,
        true,
      );
      const result = ts.transform(source, [
        createToCommonJsTransform(() => {
          throw new Error("Built-ins must not be loaded to detect default exports.");
        }),
      ]);
      try {
        assert.equal(
          ts.createPrinter().printFile(result.transformed[0]).trim(),
          `const builtin = require("${specifier}");`,
        );
      } finally {
        result.dispose();
      }
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
});
