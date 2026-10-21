// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import * as walker from "../../../src/serialization/ast/expression-walker.js";
import type { ExpressionReference } from "../../../src/serialization/ast/expression-rewriter.js";
import type { BicepAst } from "../../../src/serialization/bicep/file-layout/file-preparation.js";
import {
  BicepNamer,
  RESOURCE_NAME_OVERRIDES,
} from "../../../src/serialization/bicep/file-layout/bicep-namer.js";

function emptyAst(): BicepAst {
  return {
    targetScope: "resourceGroup",
    resources: new Map(),
    parameters: new Map(),
    variables: new Map(),
    outputs: new Map(),
    modules: new Map(),
  };
}

function reference(identifier: string, property = "id"): ExpressionReference {
  return {
    identifier,
    path: [property],
    expression: {
      kind: "property-access",
      base: { kind: "identifier", id: identifier },
      property,
      nullish: false,
    },
  };
}

describe("BicepNamer", () => {
  it("reserves each generated parameter immediately and allocates deterministic collision suffixes", () => {
    const namer = new BicepNamer(emptyAst());
    const input = reference("storage");
    expect(namer.parameterName(input)).toBe("storageId");
    expect(namer.parameterName(input)).toBe("storageStorageId");
    expect(namer.parameterName(input)).toBe("storageStorageId2");
  });

  it("derives module candidates and fallback names without caller-provided aliases", () => {
    const ast = emptyAst();
    ast.variables.set("storageModule", {
      bicepIdentifier: "storageModule",
      value: { kind: "string", value: "authored" },
    });
    const namer = new BicepNamer(ast);
    expect(namer.moduleName("storage", "main/storage.bicep")).toBe("mainStorageStorageModule");
    expect(namer.moduleName("storage", "main/storage.bicep")).toBe("mainStorageStorageModule2");
  });

  it("keeps output reservations separate from parameters, variables and loop bindings", () => {
    const ast = emptyAst();
    ast.variables.set("storageId", {
      bicepIdentifier: "storageId",
      value: {
        kind: "for-expression",
        itemVariable: "storageName",
        collection: { kind: "array", items: [] },
        body: { kind: "identifier", id: "storageName" },
      },
    });
    ast.outputs.set("storageId", {
      bicepIdentifier: "storageId",
      valueType: { kind: "primitive-type", name: "string" },
      value: { kind: "string", value: "authored" },
    });
    const namer = new BicepNamer(ast);
    expect(namer.parameterName(reference("storage"))).toBe("storageStorageId");
    expect(namer.outputName(reference("storage"))).toBe("storageStorageId");
    expect(namer.outputName(reference("storage"), "storageName")).toBe("storageName");
    expect(namer.parameterName(reference("storage", "name"))).toBe("storageStorageName");
    expect(namer.outputName(reference("storage"))).toBe("storageStorageId2");
  });

  it("preserves static path and safe/reverse access modifiers in parameter naming", () => {
    const input: ExpressionReference = {
      identifier: "storage",
      path: ["items", 1],
      expression: {
        kind: "array-access",
        base: {
          kind: "property-access",
          base: { kind: "identifier", id: "storage" },
          property: "items",
          nullish: true,
        },
        index: { kind: "integer", value: "1" },
        nullish: true,
        fromEnd: true,
      },
    };
    const namer = new BicepNamer(emptyAst());
    expect(namer.parameterName(input)).toBe("storageItems1Safe0FromEnd0Safe1");
    expect(namer.outputName(input)).toBe("storageItems1Safe0FromEnd0Safe1");
  });

  it("does not share reservations between namer instances", () => {
    const ast = emptyAst();
    const first = new BicepNamer(ast);
    const second = new BicepNamer(ast);
    expect(first.parameterName(reference("storage"))).toBe("storageId");
    expect(second.parameterName(reference("storage"))).toBe("storageId");
    expect(first.outputName(reference("storage"))).toBe("storageId");
    expect(second.outputName(reference("storage"))).toBe("storageId");
  });

  it("inspects a file once and does not rescan when allocating module, parameter or output names", () => {
    const ast = emptyAst();
    ast.variables.set("value", {
      bicepIdentifier: "value",
      value: { kind: "function-call", target: "storageId", args: [] },
    });
    const walk = vi.spyOn(walker, "walkDeclarationExpressions");
    try {
      const namer = new BicepNamer(ast);
      expect(walk).toHaveBeenCalledTimes(1);
      expect(namer.parameterName(reference("storage"))).toBe("storageId");
      expect(namer.moduleName("storage", "main/storage.bicep")).toBe("storageModule");
      expect(namer.outputName(reference("storage"))).toBe("storageId");
      expect(namer.outputName(reference("storage"))).toBe("storageStorageId");
      expect(walk).toHaveBeenCalledTimes(1);
    } finally {
      walk.mockRestore();
    }
  });

  it("reserves the selected built-in names without inspecting function usage", () => {
    const ast = emptyAst();
    const walk = vi.spyOn(walker, "walkDeclarationExpressions");
    try {
      const namer = new BicepNamer(ast);
      for (const name of RESOURCE_NAME_OVERRIDES.keys()) {
        const input: ExpressionReference = {
          identifier: name,
          path: [],
          expression: { kind: "identifier", id: name },
        };
        expect(namer.parameterName(input)).not.toBe(name);
        expect(namer.outputName(input)).toBe(name);
      }
      expect(walk).not.toHaveBeenCalled();
    } finally {
      walk.mockRestore();
    }
  });
});
