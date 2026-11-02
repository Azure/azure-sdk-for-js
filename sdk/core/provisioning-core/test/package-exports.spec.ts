// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it } from "vitest";
import * as core from "../src/index.js";
import * as internal from "../src/internal.js";

describe("core package entry points", () => {
  it.each([
    "buildExpression",
    "moduleOutputExpression",
    "walkExpressionNode",
    "walkDeclarationExpressions",
    "rewriteExpressionReferences",
    "rewriteDeclarationExpressions",
    "sanitizeIdentifier",
    "collectDependenciesForDeclaration",
    "buildStackDeclarations",
    "createSymbolMap",
    "getArmParent",
    "getResourceGroupAncestor",
    "getResourceScope",
    "collectResourceDeclarations",
  ])("does not expose the implementation helper %s", (name) => {
    expect(Object.hasOwn(internal, name)).toBe(false);
    expect(Object.hasOwn(core, name)).toBe(false);
  });

  it("exposes Bicep rendering only through the internal entry point", () => {
    expect(typeof internal.renderBicepFiles).toBe("function");
    expect(Object.hasOwn(core, "renderBicepFiles")).toBe(false);
    expectTypeOf<internal.RenderedBicepFile>().toEqualTypeOf<{
      readonly path: string;
      readonly contents: string;
    }>();
  });

  it.each([
    "createAnyShape",
    "createArrayShape",
    "createBooleanLiteralShape",
    "createBooleanShape",
    "createBytesShape",
    "createDateShape",
    "createDeferredShape",
    "createDiscriminatedModelShape",
    "createEnumShape",
    "createFlatModelShape",
    "createNullShape",
    "createNumberLiteralShape",
    "createNumberShape",
    "createRecordShape",
    "createStringLiteralShape",
    "createStringShape",
    "createTupleShape",
    "createUnionShape",
  ] as const)("preserves the generated-code shape factory %s", (name) => {
    expect(typeof internal[name]).toBe("function");
  });

  it("retains authoring helpers and their exposed parameter and output types", () => {
    expect(typeof core.createParameter).toBe("function");
    expect(typeof core.createVariable).toBe("function");
    expect(typeof core.createOutput).toBe("function");
    expectTypeOf<core.ParameterOptions<"string">["defaultValue"]>().toEqualTypeOf<
      core.ExpressionOrValue<string> | undefined
    >();
    expectTypeOf<core.OutputValueFor<"string">>().toEqualTypeOf<core.ExpressionOrValue<string>>();
  });
});
