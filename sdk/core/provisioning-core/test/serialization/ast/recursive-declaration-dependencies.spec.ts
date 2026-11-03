// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it, vi } from "vitest";
import type {
  AstDeclarationMap,
  DeclarationNode,
  ParameterDeclarationNode,
  VariableDeclarationNode,
} from "../../../src/serialization/ast/index.js";
import {
  collectDependenciesForDeclaration,
  type DeclarationDependencyOptions,
} from "../../../src/serialization/ast/declaration-dependencies.js";
import * as expressionWalker from "../../../src/serialization/ast/expression-walker.js";

function variable(name: string, ...dependencies: string[]): VariableDeclarationNode {
  return {
    bicepIdentifier: name,
    value: {
      kind: "array",
      items: dependencies.map((id) => ({ kind: "identifier", id })),
    },
  };
}

describe("recursive declaration dependency collection", () => {
  it("keeps direct collection as the default, including for multiple roots", () => {
    const first = variable("first", "shared", "external");
    const second = variable("second", "shared");
    expect(collectDependenciesForDeclaration(first)).toEqual(new Set(["shared", "external"]));
    expect(collectDependenciesForDeclaration([first, second], { recursive: false })).toEqual(
      new Set(["shared", "external"]),
    );
    expect(collectDependenciesForDeclaration([])).toEqual(new Set());
  });

  it("follows values, defaults, parent/scope references and nested type decorators", () => {
    const nodes = new Map<string, DeclarationNode>([
      [
        "value",
        {
          bicepIdentifier: "value",
          value: { kind: "identifier", id: "input" },
        },
      ],
      [
        "input",
        {
          bicepIdentifier: "input",
          defaultValue: { kind: "identifier", id: "child" },
          valueType: {
            kind: "object-type",
            properties: [
              {
                kind: "object-type-property",
                key: "detail",
                valueType: { kind: "type-reference", name: "Named" },
                decorators: {
                  metadata: { label: { kind: "identifier", id: "label" } },
                },
              },
            ],
          },
        },
      ],
      [
        "child",
        {
          bicepIdentifier: "child",
          type: "Contoso.Test/parents/children",
          apiVersion: "2024-01-01",
          existing: true,
          value: {
            kind: "object",
            value: {
              name: { kind: "string", value: "child" },
              parent: { kind: "identifier", id: "parent" },
            },
          },
        },
      ],
      [
        "parent",
        {
          bicepIdentifier: "parent",
          type: "Contoso.Test/parents",
          apiVersion: "2024-01-01",
          existing: true,
          value: {
            kind: "object",
            value: {
              scope: {
                kind: "function-call",
                target: "resourceGroup",
                args: [{ kind: "identifier", id: "group" }],
              },
            },
          },
        },
      ],
    ]);
    const root = variable("root", "value");
    const original = structuredClone({ root, nodes });
    const result = collectDependenciesForDeclaration(root, {
      recursive: true,
      declarations: nodes,
    });
    expect(result).toEqual(
      new Set(["value", "input", "Named", "label", "child", "parent", "group"]),
    );
    expect({ root, nodes }).toEqual(original);
  });

  it("keeps unresolved names and follows only declarations included in the map", () => {
    const root = variable("root", "local", "remote", "unknown");
    const local = variable("local", "remote", "terminal");
    const remote = variable("remote", "mustNotFollow");
    const declarations = new Map([["local", local]]);
    const original = new Map(declarations);
    const get = vi.spyOn(declarations, "get");
    try {
      expect(
        collectDependenciesForDeclaration(root, {
          recursive: true,
          declarations,
        }),
      ).toEqual(new Set(["local", "remote", "unknown", "terminal"]));
      expect(collectDependenciesForDeclaration(remote)).toEqual(new Set(["mustNotFollow"]));
      expect(get.mock.calls.map(([identifier]) => identifier)).toEqual([
        "local",
        "remote",
        "unknown",
        "terminal",
      ]);
      expect(declarations).toEqual(original);
    } finally {
      get.mockRestore();
    }
  });

  it("inspects shared dependencies once across multiple roots and aliases", () => {
    const first = variable("first", "alias1", "shared");
    const second = variable("second", "alias2", "shared");
    const shared = variable("shared", "input");
    const input: ParameterDeclarationNode = {
      bicepIdentifier: "input",
      valueType: { kind: "primitive-type", name: "string" },
      defaultValue: { kind: "string", value: "literal" },
    };
    const walk = vi.spyOn(expressionWalker, "walkDeclarationExpressions");
    try {
      const result = collectDependenciesForDeclaration([first, first, second], {
        recursive: true,
        declarations: new Map<string, DeclarationNode>([
          ["alias1", shared],
          ["alias2", shared],
          ["shared", shared],
          ["input", input],
        ]),
      });
      expect(result).toEqual(new Set(["alias1", "shared", "alias2", "input"]));
      expect(walk.mock.calls.map(([declaration]) => declaration)).toEqual([
        first,
        second,
        shared,
        input,
      ]);
    } finally {
      walk.mockRestore();
    }
  });

  it("terminates self-references and cycles while retaining cyclic dependency names", () => {
    const first = variable("first", "first", "second");
    const second = variable("second", "first");
    const walk = vi.spyOn(expressionWalker, "walkDeclarationExpressions");
    try {
      expect(
        collectDependenciesForDeclaration(first, {
          recursive: true,
          declarations: new Map([
            ["first", first],
            ["second", second],
          ]),
        }),
      ).toEqual(new Set(["first", "second"]));
      expect(walk.mock.calls.map(([declaration]) => declaration)).toEqual([first, second]);
    } finally {
      walk.mockRestore();
    }
  });

  it("does not follow shadowed loop names but does follow references in the collection and decorators", () => {
    const root: VariableDeclarationNode = {
      bicepIdentifier: "root",
      value: {
        kind: "for-expression",
        itemVariable: "local",
        indexVariable: "position",
        collection: { kind: "identifier", id: "collection" },
        body: {
          kind: "array",
          items: [
            { kind: "identifier", id: "local" },
            { kind: "identifier", id: "position" },
          ],
        },
      },
      decorators: { metadata: { label: { kind: "identifier", id: "label" } } },
    };
    const collection = variable("collection", "items");
    const label = variable("label", "caption");
    const nodes = new Map([
      ["collection", collection],
      ["label", label],
      ["local", variable("local", "wrong")],
      ["position", variable("position", "wrong")],
    ]);
    expect(
      collectDependenciesForDeclaration(root, {
        recursive: true,
        declarations: nodes,
      }),
    ).toEqual(new Set(["collection", "label", "items", "caption"]));
  });

  it("looks up declarations by reference name rather than map insertion order", () => {
    const root = variable("root", "second", "first");
    const first = variable("first", "shared");
    const second = variable("second", "other");
    const nodes = new Map([
      ["first", first],
      ["second", second],
    ]);
    const walk = vi.spyOn(expressionWalker, "walkDeclarationExpressions");
    try {
      collectDependenciesForDeclaration(root, {
        recursive: true,
        declarations: nodes,
      });
      expect(walk.mock.calls.map(([declaration]) => declaration)).toEqual([root, second, first]);
    } finally {
      walk.mockRestore();
    }
  });

  it("uses map keys as reference identifiers, without treating record keys as aliases", () => {
    const root = variable("root", "dependency");
    const dependency = variable("dependency", "leaf");
    const declarations: AstDeclarationMap = new Map([["dependency", dependency]]);
    expect(
      collectDependenciesForDeclaration(root, {
        recursive: true,
        declarations,
      }),
    ).toEqual(new Set(["dependency", "leaf"]));
    expect(
      collectDependenciesForDeclaration(root, {
        recursive: true,
        declarations: new Map([["sourceRecordKey", dependency]]),
      }),
    ).toEqual(new Set(["dependency"]));
    expect(declarations.get("dependency")).toBe(dependency);
  });

  it("keeps recursive resolution state internal to each call", () => {
    const root = variable("root", "shared");
    const shared = variable("shared", "leaf");
    const walk = vi.spyOn(expressionWalker, "walkDeclarationExpressions");
    try {
      expect(
        collectDependenciesForDeclaration(root, {
          recursive: true,
          declarations: new Map([["shared", shared]]),
        }),
      ).toEqual(new Set(["shared", "leaf"]));
      expect(
        collectDependenciesForDeclaration(root, {
          recursive: true,
          declarations: new Map(),
        }),
      ).toEqual(new Set(["shared"]));
      expect(collectDependenciesForDeclaration([root, shared])).toEqual(
        new Set(["shared", "leaf"]),
      );
      const changed = variable("shared", "changedLeaf");
      expect(
        collectDependenciesForDeclaration(root, {
          recursive: true,
          declarations: new Map([["shared", changed]]),
        }),
      ).toEqual(new Set(["shared", "changedLeaf"]));
      expect(walk.mock.calls.map(([declaration]) => declaration)).toEqual([
        root,
        shared,
        root,
        root,
        shared,
        root,
        changed,
      ]);
    } finally {
      walk.mockRestore();
    }
  });

  it("observes updated expression contents on a subsequent call without stale cached dependencies", () => {
    const value = {
      kind: "object" as const,
      value: { reference: { kind: "identifier" as const, id: "before" } },
    };
    const declaration: VariableDeclarationNode = {
      bicepIdentifier: "root",
      value,
    };
    expect(collectDependenciesForDeclaration(declaration)).toEqual(new Set(["before"]));
    value.value.reference.id = "after";
    expect(collectDependenciesForDeclaration(declaration)).toEqual(new Set(["after"]));
  });

  it("handles a 20,000-declaration chain without recursive calls", () => {
    const length = 20_000;
    const nodes = Array.from({ length }, (_, index) =>
      variable(`value${index}`, ...(index + 1 === length ? [] : [`value${index + 1}`])),
    );
    const declarations = new Map(nodes.map((node) => [node.bicepIdentifier, node]));
    const result = collectDependenciesForDeclaration(nodes[0]!, {
      recursive: true,
      declarations,
    });
    expect(result.size).toBe(length - 1);
    expect(result.has(`value${length - 1}`)).toBe(true);
    expect(declarations.size).toBe(length);
  });

  it("requires a declaration map for recursive options", () => {
    expectTypeOf<{
      recursive: true;
    }>().not.toExtend<DeclarationDependencyOptions>();
  });
});
