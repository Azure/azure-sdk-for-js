// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import {
  Resource,
  ResourceGroup,
  Stack,
  deref,
  fn,
  namingRequiredPolicy,
} from "../../../src/index.js";
import { getLoopedResources } from "../../../src/constructs/stack.js";
import { collectDependenciesForDeclaration } from "../../../src/serialization/ast/declaration-dependencies.js";
import type {
  ExpressionNode,
  ForExpression,
  InfraNode,
  ResourceDeclarationNode,
  VariableDeclarationNode,
} from "../../../src/serialization/ast/index.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";

function resourceNode(
  identifier: string,
  properties: Record<string, ExpressionNode>,
  type = "Contoso.Test/widgets",
): ResourceDeclarationNode {
  return {
    bicepIdentifier: identifier,
    type,
    apiVersion: "2024-01-01",
    existing: false,
    value: { kind: "object", value: properties },
  };
}

function propertyReference(identifier: string, property: string): ExpressionNode {
  return {
    kind: "property-access",
    base: { kind: "identifier", id: identifier },
    property,
    nullish: false,
  };
}

beforeEach(() => {
  Stack.clearRoots();
});

describe("declaration dependencies", () => {
  it.each(["resource", "variable", "output", "module"] as const)(
    "collects and deduplicates value and decorator references for a %s",
    (category) => {
      const common = {
        bicepIdentifier: "declaration",
        value: {
          kind: "object",
          value: { source: propertyReference("source", "name") },
        },
        decorators: {
          description: "notAnIdentifier",
          metadata: {
            source: propertyReference("source", "id"),
            nested: {
              kind: "array",
              items: [{ kind: "identifier", id: "metadataDependency" }],
            },
          },
          allowed: [{ kind: "identifier", id: "allowedDependency" }],
        },
      } as const;
      const declaration =
        category === "resource"
          ? {
              ...common,
              type: "Contoso.Test/widgets",
              apiVersion: "2024-01-01",
              existing: false,
            }
          : category === "output"
            ? {
                ...common,
                valueType: { kind: "primitive-type", name: "object" } as const,
              }
            : category === "module"
              ? { ...common, path: "./child.bicep" }
              : common;
      const before = structuredClone(declaration);

      expect(collectDependenciesForDeclaration(declaration)).toEqual(
        new Set(["source", "metadataDependency", "allowedDependency"]),
      );
      expect(declaration).toEqual(before);
    },
  );

  it("does not apply body loop bindings to declaration decorators", () => {
    const declaration: ResourceDeclarationNode = {
      ...resourceNode("widgets", {}),
      value: {
        kind: "for-expression",
        itemVariable: "item",
        indexVariable: "position",
        collection: { kind: "identifier", id: "items" },
        body: {
          kind: "object",
          value: {
            name: { kind: "identifier", id: "item" },
            position: { kind: "identifier", id: "position" },
          },
        },
      },
      decorators: { metadata: { item: { kind: "identifier", id: "item" } } },
    };
    expect(collectDependenciesForDeclaration(declaration)).toEqual(new Set(["items", "item"]));
  });

  it("collects nested output type references and property decorators", () => {
    expect(
      collectDependenciesForDeclaration({
        bicepIdentifier: "result",
        value: { kind: "null", value: null },
        valueType: {
          kind: "object-type",
          properties: [
            {
              kind: "object-type-property",
              key: "entries",
              valueType: {
                kind: "array-type",
                item: {
                  kind: "nullable-type",
                  base: {
                    kind: "parameterized-type-instantiation",
                    base: { kind: "type-reference", name: "Container" },
                    args: [
                      {
                        kind: "parameterized-type-argument",
                        valueType: {
                          kind: "union-type",
                          members: [
                            {
                              kind: "union-type-member",
                              valueType: {
                                kind: "type-reference",
                                name: "Entry",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
              decorators: {
                metadata: {
                  label: { kind: "identifier", id: "propertyLabel" },
                },
              },
            },
          ],
          additionalProperties: {
            kind: "object-type-additional-properties",
            valueType: { kind: "type-reference", name: "Extra" },
            decorators: {
              allowed: [{ kind: "identifier", id: "additionalAllowed" }],
            },
          },
        },
      }),
    ).toEqual(new Set(["Container", "Entry", "propertyLabel", "Extra", "additionalAllowed"]));
  });

  it("returns no dependencies for literal values and scalar decorators", () => {
    expect(
      collectDependenciesForDeclaration({
        bicepIdentifier: "literal",
        value: { kind: "string", value: "notAnIdentifier" },
        decorators: { description: "notAnIdentifier", export: true },
      }),
    ).toEqual(new Set());
  });
});

describe("deserializer symbol resolution", () => {
  it("normalizes contextual scope expressions before dependency analysis and restoration", () => {
    const contextual = {
      kind: "contextual-variable",
      context: "resourceGroup",
      property: "location",
    };
    const document = {
      infras: [
        {
          fileName: "contextual-scope.bicep",
          targetScope: "resourceGroup",
          variables: {
            locations: {
              bicepIdentifier: "locations",
              value: {
                kind: "array",
                items: [contextual],
              },
            },
          },
          resources: {
            widget: resourceNode("widget", {
              name: { kind: "string", value: "widget" },
            }),
          },
          outputs: {
            location: {
              bicepIdentifier: "location",
              valueType: { kind: "primitive-type", name: "string" },
              value: contextual,
            },
          },
        },
      ],
    };
    const restored = deserialize(JSON.stringify(document));
    const result = serialize(restored).infras[0]!;
    const expected = {
      kind: "property-access",
      base: { kind: "function-call", target: "resourceGroup", args: [] },
      property: "location",
      nullish: false,
    };
    expect(result.variables!.locations!.value).toEqual({
      kind: "array",
      items: [expected],
    });
    expect(result.outputs!.location!.value).toEqual(expected);
  });

  it("rejects malformed contextual scope nodes explicitly at JSON import", () => {
    expect(() =>
      deserialize(
        JSON.stringify({
          infras: [
            {
              fileName: "invalid-context.bicep",
              variables: {
                value: {
                  bicepIdentifier: "value",
                  value: {
                    kind: "contextual-variable",
                    context: "resourceGroup",
                    property: 42,
                  },
                },
              },
            },
          ],
        }),
      ),
    ).toThrow("Invalid contextual-variable expression: context and property must be strings.");
  });

  it("does not treat extra kind fields on document, file or declaration containers as expressions", () => {
    const [restored] = deserialize(
      JSON.stringify({
        kind: "contextual-variable",
        infras: [
          {
            fileName: "container-kind.bicep",
            kind: "contextual-variable",
            variables: {
              value: {
                bicepIdentifier: "value",
                kind: "contextual-variable",
                value: { kind: "string", value: "value" },
              },
            },
          },
        ],
      }),
    );
    expect(serialize(restored!).infras[0]!.variables!.value!.value).toEqual({
      kind: "string",
      value: "value",
    });
  });

  it("uses the source collection instead of payload fields to identify a variable", () => {
    const variable = {
      ...resourceNode("settings", {
        name: { kind: "string", value: "settings" },
      }),
      kind: "resource",
    };
    const file: InfraNode = {
      fileName: "variable-kind.bicep",
      variables: { settings: variable },
      outputs: {
        settingsOutput: {
          bicepIdentifier: "settingsOutput",
          valueType: { kind: "primitive-type", name: "object" },
          value: { kind: "identifier", id: "settings" },
        },
      },
    };

    const [restored] = deserialize(JSON.stringify({ infras: [file] }));

    expect(restored!.getResources()).toEqual([]);
    expect(restored!.variables.getMetadata("settings")!.value).toEqual({
      name: "settings",
    });
    expect(restored!.outputs.get("settingsOutput")!.value).toBe(
      restored!.variables.get("settings"),
    );
  });

  it("classifies duplicate variables by their source collection", () => {
    const file: InfraNode = {
      fileName: "variable-duplicate-kind.bicep",
      variables: {
        first: resourceNode("duplicate", {}),
        second: resourceNode("duplicate", {}),
      },
    };

    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      'Duplicate declaration identifier "duplicate".',
    );
  });

  it("classifies variable cycles by their source collection", () => {
    const file: InfraNode = {
      fileName: "variable-cycle-kind.bicep",
      variables: {
        first: resourceNode("first", {
          peer: { kind: "identifier", id: "second" },
        }),
        second: resourceNode("second", {
          peer: { kind: "identifier", id: "first" },
        }),
      },
    };

    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      'Declaration dependency cycle detected: "first" -> "second" -> "first".',
    );
  });

  it("detects cycles through decorator-only dependencies before construction", () => {
    const file: InfraNode = {
      fileName: "decorator-cycle.bicep",
      variables: {
        first: {
          bicepIdentifier: "first",
          value: { kind: "string", value: "first" },
          decorators: {
            metadata: { peer: { kind: "identifier", id: "second" } },
          },
        },
        second: {
          bicepIdentifier: "second",
          value: { kind: "identifier", id: "first" },
        },
      },
    };
    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      'Declaration dependency cycle detected: "first" -> "second" -> "first".',
    );
    expect(Stack.roots[0]!.variables.size).toBe(0);
  });

  it("constructs dependencies on demand, reuses shared targets, and includes unreferenced declarations", () => {
    const file: InfraNode = {
      fileName: "dependency-first.bicep",
      resources: {
        firstKey: resourceNode("first", {
          name: { kind: "string", value: "first" },
          dependsOn: {
            kind: "array",
            items: [{ kind: "identifier", id: "shared" }],
          },
        }),
        unrelatedKey: resourceNode("unrelated", {
          name: { kind: "string", value: "unrelated" },
        }),
        secondKey: resourceNode("second", {
          name: { kind: "string", value: "second" },
          dependsOn: {
            kind: "array",
            items: [{ kind: "identifier", id: "shared" }],
          },
        }),
        sharedKey: resourceNode("shared", {
          name: { kind: "string", value: "shared" },
        }),
      },
    };
    const [restored] = deserialize(JSON.stringify({ infras: [file] }));
    const resources = restored!.getResources();
    expect(resources.map((resource) => deref(resource.name))).toEqual([
      "shared",
      "first",
      "unrelated",
      "second",
    ]);
    expect(resources[1]!.dependsOn).toEqual([resources[0]]);
    expect(resources[3]!.dependsOn).toEqual([resources[0]]);
  });

  it("restores a long forward dependency chain without recursive declaration construction", () => {
    const length = 12_000;
    const variables: Record<string, VariableDeclarationNode> = {};
    for (let index = 0; index < length; index++) {
      const name = `value${index}`;
      variables[name] = {
        bicepIdentifier: name,
        value:
          index + 1 === length
            ? { kind: "string", value: "leaf" }
            : { kind: "identifier", id: `value${index + 1}` },
      };
    }
    const [restored] = deserialize(
      JSON.stringify({ infras: [{ fileName: "long-chain.bicep", variables }] }),
    );
    expect(restored!.variables.size).toBe(length);
    expect(restored!.variables.getMetadata("value0")!.value).toBe(
      restored!.variables.get("value1"),
    );
    expect(restored!.variables.getMetadata(`value${length - 1}`)!.value).toBe("leaf");
    expect(restored!.variables.listMetadata()[0]!.name).toBe(`value${length - 1}`);
  }, 30_000);

  it.each([{}, { variables: {}, resources: {} }])(
    "restores empty declarations for %j",
    (declarations) => {
      const [restored] = deserialize(
        JSON.stringify({
          infras: [{ fileName: "empty.bicep", ...declarations }],
        }),
      );
      expect(restored!.variables.size).toBe(0);
      expect(restored!.getResources()).toEqual([]);
      expect(serialize(restored!).infras[0]).not.toHaveProperty("variables");
      expect(serialize(restored!).infras[0]).not.toHaveProperty("resources");
    },
  );

  it("rejects duplicate identifiers before constructing any variables or resources", () => {
    const file: InfraNode = {
      fileName: "duplicate-preflight.bicep",
      variables: {
        valid: {
          bicepIdentifier: "valid",
          value: { kind: "string", value: "value" },
        },
      },
      resources: {
        firstKey: resourceNode("duplicate", {
          name: { kind: "string", value: "first" },
        }),
        secondKey: resourceNode("duplicate", {
          name: { kind: "string", value: "second" },
        }),
      },
    };
    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      'Duplicate resource identifier "duplicate".',
    );
    expect(Stack.roots[0]!.children).toEqual([]);
    expect(Stack.roots[0]!.variables.size).toBe(0);
  });

  it("binds resource-valued variables to the restored resource after symbol reallocation", () => {
    const source = new Stack("variable-reference", {
      targetScope: "resourceGroup",
    });
    const consumer = new Resource(source, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "consumer",
    });
    const producer = new Resource(source, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "producer",
    });
    Object.assign(consumer, { tags: { source: producer.name } });
    const producerName = source.variables.add("producerName", producer.name);
    Object.assign(consumer, { sourceName: producerName });
    const [restored] = deserialize(JSON.stringify(serialize(source)));
    const file = serialize(restored!).infras[0]!;
    const reference = file.variables!.producerName!.value;

    expect(reference.kind).toBe("property-access");
    if (reference.kind !== "property-access" || reference.base.kind !== "identifier") {
      throw new Error("Expected a resource property reference.");
    }
    expect(file.resources![reference.base.id]!.value).toMatchObject({
      value: { name: { kind: "string", value: "producer" } },
    });
    const restoredProducer = restored!
      .getResources()
      .find((resource) => deref(resource.name) === "producer")!;
    restoredProducer.name = "renamed";
    expect(deref(restored!.variables.getMetadata("producerName")!.value)).toBe("renamed");
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6iDtkm:
  // "Resource identifiers are generated without considering parameter, variable, or output names. A valid authoring call such as a parameter named vault plus a Microsoft.KeyVault/vaults resource creates duplicate Bicep declarations, and this serializer does not reject it even though its own deserializer does. Seed allocation with all declaration names or reject cross-kind collisions before returning the document."
  it("allocates authored declarations before resources and separately from outputs", () => {
    const source = new Stack("collision");
    const parameter = source.parameters.add("resourceGroup", "string", {
      defaultValue: "rg-test",
    });
    const variable = source.variables.add("resourceGroup", parameter);
    const group = new ResourceGroup(source, {
      name: parameter,
      location: "eastus",
      tags: { origin: variable },
    });
    source.outputs.add("resourceGroup", "string", fn.concat(group.name, parameter, variable));
    const document = serialize(source);
    const file = document.infras[0]!;

    expect(Object.keys(file.resources!)).toEqual(["resourceGroup3"]);
    expect(Object.keys(file.parameters!)).toEqual(["resourceGroup"]);
    expect(Object.keys(file.variables!)).toEqual(["resourceGroup2"]);
    expect(Object.keys(file.outputs!)).toEqual(["resourceGroup"]);
    expect(file.resources!.resourceGroup3!.value).toMatchObject({
      value: {
        name: { kind: "identifier", id: "resourceGroup" },
        tags: {
          kind: "object",
          value: { origin: { kind: "identifier", id: "resourceGroup2" } },
        },
      },
    });
    expect(file.variables!.resourceGroup2!.value).toEqual({
      kind: "identifier",
      id: "resourceGroup",
    });
    expect(file.outputs!.resourceGroup!.value).toMatchObject({
      kind: "function-call",
      args: [
        propertyReference("resourceGroup3", "name"),
        { kind: "identifier", id: "resourceGroup" },
        { kind: "identifier", id: "resourceGroup2" },
      ],
    });
    expect(source.parameters.get("resourceGroup")).toBe(parameter);
    expect(source.variables.get("resourceGroup")).toBe(variable);
    let roundtripped = document;
    for (let iteration = 0; iteration < 2; iteration++) {
      roundtripped = serialize(deserialize(JSON.stringify(roundtripped)));
      expect(roundtripped).toEqual(document);
    }
  });

  it.each(["parameter", "variable"] as const)(
    "preserves an output sharing its name with a %s across two round trips",
    (category) => {
      const source = new Stack("output-namespace", {
        targetScope: "resourceGroup",
      });
      const value =
        category === "parameter"
          ? source.parameters.add("shared", "string", { defaultValue: "value" })
          : source.variables.add("shared", "value");
      source.outputs.add("shared", "string", value);
      const document = serialize(source);
      let serialized = document;

      for (let iteration = 0; iteration < 2; iteration++) {
        const [restored] = deserialize(JSON.stringify(serialized));
        expect(restored!.outputs.get("shared")!.value).toBe(
          category === "parameter"
            ? restored!.parameters.get("shared")
            : restored!.variables.get("shared"),
        );
        serialized = serialize(restored!);
        expect(serialized).toEqual(document);
        expect(serialized.infras[0]!.outputs!.shared!.value).toEqual({
          kind: "identifier",
          id: "shared",
        });
      }
    },
  );

  it("rejects duplicate names within the output namespace", () => {
    const file: InfraNode = {
      fileName: "duplicate-outputs.bicep",
      outputs: {
        firstKey: {
          bicepIdentifier: "shared",
          valueType: { kind: "primitive-type", name: "string" },
          value: { kind: "string", value: "first" },
        },
        secondKey: {
          bicepIdentifier: "shared",
          valueType: { kind: "primitive-type", name: "string" },
          value: { kind: "string", value: "second" },
        },
      },
    };
    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      "Duplicate deployment output name: shared",
    );
  });

  it("does not infer ownership from an explicit scope matching a local RG name", () => {
    const source = new Stack("explicit-scope");
    new ResourceGroup(source, {
      name: "shared",
      location: "eastus",
      tags: { inherited: "no" },
    });
    new Resource(source, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "lookup",
      existing: true,
      scope: fn.resourceGroup("shared"),
    });
    const document = serialize(source);
    const [restored] = deserialize(JSON.stringify(document));
    const lookup = restored!.getResources().find((resource) => resource.existing)!;

    expect(lookup.parent).toBe(restored);
    expect(lookup.deploymentContext.tags).toBeUndefined();
    expect(serialize(restored!)).toEqual(document);
  });

  it.each<ExpressionNode>([
    { kind: "string", value: "resourceGroup" },
    { kind: "null", value: null },
    { kind: "integer", value: "0" },
    { kind: "boolean", value: false },
    { kind: "object", value: {} },
    { kind: "array", items: [] },
    {
      kind: "object",
      value: { name: propertyReference("resourceGroup", "name") },
    },
    { kind: "array", items: [propertyReference("resourceGroup", "name")] },
  ])("rejects a non-expression existing scope ($kind) on the first import", (scope) => {
    const file: InfraNode = {
      fileName: "invalid-existing-scope.bicep",
      targetScope: "subscription",
      resources: {
        resourceGroup: {
          ...resourceNode(
            "resourceGroup",
            {
              name: { kind: "string", value: "shared" },
              location: { kind: "string", value: "eastus" },
            },
            ResourceGroup.resourceType,
          ),
          apiVersion: ResourceGroup.apiVersion,
        },
        lookup: {
          ...resourceNode("lookup", {
            name: { kind: "string", value: "lookup" },
            scope,
          }),
          existing: true,
        },
      },
    };

    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      `Resource "lookup" has an invalid "scope" value: expected an expression, received "${scope.kind}".`,
    );
    expect(Stack.roots[0]!.getResources()).toHaveLength(1);
    expect(Stack.roots[0]!.getResources()[0]).toBeInstanceOf(ResourceGroup);
  });

  it.each([
    "currentGroup",
    "namedGroup",
    "crossSubscriptionGroup",
    "parameterGroup",
    "variableGroup",
    "currentSubscription",
    "namedSubscription",
    "currentManagementGroup",
    "namedManagementGroup",
    "tenant",
  ] as const)("preserves the %s existing scope across two round trips", (scopeKind) => {
    const source = new Stack("existing-scope-expressions");
    const groupName = source.parameters.add("groupName", "string", {
      defaultValue: "shared",
    });
    const nameVariable = source.variables.add("nameVariable", groupName);
    const scopes = {
      currentGroup: fn.resourceGroup(),
      namedGroup: fn.resourceGroup("shared"),
      crossSubscriptionGroup: fn.resourceGroup("other-subscription", "shared"),
      parameterGroup: fn.resourceGroup(groupName),
      variableGroup: fn.resourceGroup(nameVariable),
      currentSubscription: fn.subscription(),
      namedSubscription: fn.subscription("other-subscription"),
      currentManagementGroup: fn.managementGroup(),
      namedManagementGroup: fn.managementGroup("management-group"),
      tenant: fn.tenant(),
    };
    new ResourceGroup(source, {
      name: "shared",
      location: "eastus",
      tags: { inherited: "no" },
    });
    new Resource(source, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "lookup",
      existing: true,
      scope: scopes[scopeKind],
    });
    const document = serialize(source);
    let serialized = document;

    for (let iteration = 0; iteration < 2; iteration++) {
      const [restored] = deserialize(JSON.stringify(serialized));
      const lookup = restored!.getResources().find((resource) => resource.existing)!;

      expect(lookup.parent).toBe(restored);
      expect(lookup.deploymentContext.tags).toBeUndefined();
      serialized = serialize(restored!);
      expect(serialized).toEqual(document);
    }
  });

  it.each([false, true])(
    "rejects a resource collection as scope context (existing: %s)",
    (existing) => {
      const file: InfraNode = {
        fileName: "collection-scope.bicep",
        resources: {
          lookup: {
            ...resourceNode("lookup", {
              name: { kind: "string", value: "lookup" },
              scope: { kind: "identifier", id: "owners" },
            }),
            existing,
          },
          owners: {
            ...resourceNode("owners", {}, "Contoso.Test/owners"),
            value: {
              kind: "for-expression",
              itemVariable: "ownerName",
              collection: {
                kind: "array",
                items: [{ kind: "string", value: "one" }],
              },
              body: {
                kind: "object",
                value: { name: { kind: "identifier", id: "ownerName" } },
              },
            },
          },
        },
      };

      expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
        'Resource "lookup" references resource collection "owners" in "scope"; expected a single resource.',
      );
      const stack = Stack.roots[0]!;
      const collections = getLoopedResources(stack);
      expect(collections).toHaveLength(1);
      expect(collections[0]!.children).toEqual([]);
      expect(stack.getResources()).toEqual([]);
    },
  );

  it("normalizes an indexed existing scope to a parent across two round trips", () => {
    const file: InfraNode = {
      fileName: "indexed-existing-scope.bicep",
      resources: {
        owners: {
          ...resourceNode("owners", {}, "Contoso.Test/owners"),
          value: {
            kind: "for-expression",
            itemVariable: "ownerName",
            collection: {
              kind: "array",
              items: [{ kind: "string", value: "one" }],
            },
            body: {
              kind: "object",
              value: { name: { kind: "identifier", id: "ownerName" } },
            },
          },
        },
        lookup: {
          ...resourceNode("lookup", {
            name: { kind: "string", value: "lookup" },
            scope: {
              kind: "array-access",
              base: { kind: "identifier", id: "owners" },
              index: { kind: "integer", value: "0" },
              nullish: false,
              fromEnd: false,
            },
          }),
          existing: true,
        },
      },
    };
    let serialized: ReturnType<typeof serialize> = { infras: [file] };

    for (let iteration = 0; iteration < 2; iteration++) {
      const [restored] = deserialize(JSON.stringify(serialized));
      const lookup = restored!.getResources()[0]!;
      expect(lookup.parent).toBe(getLoopedResources(restored!)[0]);
      expect(lookup.existing).toBe(true);
      serialized = serialize(restored!);
      const resources = Object.values(serialized.infras[0]!.resources!);
      const owner = resources.find((resource) => resource.type === "Contoso.Test/owners")!;
      const lookupNode = resources.find((resource) => resource.existing)!;
      expect(lookupNode.value).toMatchObject({
        kind: "object",
        value: {
          parent: {
            kind: "array-access",
            base: { kind: "identifier", id: owner.bicepIdentifier },
            index: { kind: "integer", value: "0" },
            nullish: false,
            fromEnd: false,
          },
        },
      });
    }
  });

  it("orders forward variable references before resources that consume them", () => {
    const file: InfraNode = {
      fileName: "forward-variables.bicep",
      variables: {
        derived: {
          bicepIdentifier: "derived",
          value: { kind: "identifier", id: "source" },
        },
        source: {
          bicepIdentifier: "source",
          value: propertyReference("producer", "name"),
        },
      },
      resources: {
        consumer: resourceNode("consumer", {
          name: { kind: "identifier", id: "derived" },
        }),
        producer: resourceNode("producer", {
          name: { kind: "string", value: "producer" },
        }),
      },
    };
    const [restored] = deserialize(JSON.stringify({ infras: [file] }));
    expect(restored!.variables.getMetadata("derived")!.value).toBe(
      restored!.variables.get("source"),
    );
    expect(deref(restored!.variables.getMetadata("source")!.value)).toBe("producer");
  });

  it("rejects dependency cycles through variables during restoration", () => {
    const source = new Stack("variable-cycle", {
      targetScope: "resourceGroup",
    });
    const widget = new Resource(source, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "widget",
    });
    widget.name = source.variables.add("name", widget.name);
    const document = serialize(source);
    expect(() => deserialize(JSON.stringify(document))).toThrow(
      /Declaration dependency cycle detected/,
    );
    const file: InfraNode = {
      fileName: "variable-cycle.bicep",
      variables: {
        name: {
          bicepIdentifier: "name",
          value: propertyReference("widget", "name"),
        },
      },
      resources: {
        widget: resourceNode("widget", {
          name: { kind: "identifier", id: "name" },
        }),
      },
    };
    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      /Declaration dependency cycle detected/,
    );
  });

  it("rejects cyclic RG placement relationships", () => {
    const file: InfraNode = {
      fileName: "group-cycle.bicep",
      resources: {
        first: resourceNode(
          "first",
          {
            name: { kind: "string", value: "first" },
            scope: { kind: "identifier", id: "second" },
          },
          ResourceGroup.resourceType,
        ),
        second: resourceNode(
          "second",
          {
            name: { kind: "string", value: "second" },
            scope: { kind: "identifier", id: "first" },
          },
          ResourceGroup.resourceType,
        ),
      },
    };
    expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
      /Resource dependency cycle detected/,
    );
  });

  it.each([
    { field: "parent", value: { kind: "string", value: "group" } },
    {
      field: "scope",
      value: {
        kind: "function-call",
        target: "resourceGroup",
        args: [{ kind: "string", value: "group" }],
      },
    },
  ] as const)(
    "rejects invalid parents and preserves unsupported $field scope data",
    ({ field, value }) => {
      const file: InfraNode = {
        fileName: "invalid-placement.bicep",
        resources: {
          widget: resourceNode("widget", {
            name: { kind: "string", value: "widget" },
            [field]: value,
          }),
        },
      };
      if (field === "scope") {
        const [stack] = deserialize(JSON.stringify({ infras: [file] }));
        expect(Object.values(serialize(stack!).infras[0]!.resources!)[0]!.value).toMatchObject({
          value: { scope: value },
        });
      } else {
        expect(() => deserialize(JSON.stringify({ infras: [file] }))).toThrow(
          `Resource "widget" has an invalid "${field}" reference.`,
        );
      }
    },
  );

  it("round-trips independent stacks with identical declaration names", () => {
    const sources = ["first", "second"].map((name) => {
      const stack = new Stack(name, {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const nameParameter = stack.parameters.add("resourceName", "string", {
        defaultValue: name,
      });
      const nameVariable = stack.variables.add("widgetName", nameParameter);
      const widget = new Resource(stack, {
        name: nameVariable,
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
      });
      stack.outputs.add("resourceId", "string", widget.id);
      return stack;
    });
    const wire = serialize(sources);
    const imported = deserialize(JSON.stringify(wire));

    expect(serialize(imported)).toEqual(wire);
    for (const stack of imported) {
      expect(stack.variables.getMetadata("widgetName")?.value).toBe(
        stack.parameters.get("resourceName"),
      );
    }
  });

  it.each([
    ["parameters", "variables"],
    ["parameters", "resources"],
    ["variables", "resources"],
  ] as const)("rejects a duplicate name across %s and %s", (first, second) => {
    const declarations = {
      parameters: {
        bicepIdentifier: "duplicate",
        valueType: { kind: "primitive-type", name: "string" },
      },
      variables: {
        bicepIdentifier: "duplicate",
        value: { kind: "string", value: "value" },
      },
      resources: resourceNode("duplicate", {
        name: { kind: "string", value: "widget" },
      }),
    };
    const wire = {
      infras: [
        {
          fileName: "duplicates.bicep",
          [first]: { firstKey: declarations[first] },
          [second]: { secondKey: declarations[second] },
        },
      ],
    };

    expect(() => deserialize(JSON.stringify(wire))).toThrow(
      'Duplicate declaration identifier "duplicate".',
    );
  });

  it.each([
    ["parent", "parameters"],
    ["scope", "parameters"],
    ["dependsOn", "parameters"],
    ["parent", "variables"],
    ["scope", "variables"],
    ["dependsOn", "variables"],
  ] as const)(
    "handles %s references to %s without inventing resource parents",
    (field, category) => {
      const reference: ExpressionNode = {
        kind: "identifier",
        id: "notResource",
      };
      const wire = {
        infras: [
          {
            fileName: "invalid-target.bicep",
            [category]: {
              notResource:
                category === "parameters"
                  ? {
                      bicepIdentifier: "notResource",
                      valueType: { kind: "primitive-type", name: "string" },
                    }
                  : {
                      bicepIdentifier: "notResource",
                      value: { kind: "string", value: "value" },
                    },
            },
            resources: {
              widget: resourceNode("widget", {
                name: { kind: "string", value: "widget" },
                [field]: field === "dependsOn" ? { kind: "array", items: [reference] } : reference,
              }),
            },
          },
        ],
      };

      if (field === "scope") {
        const [stack] = deserialize(JSON.stringify(wire));
        expect(stack!.getResources()[0]!.parent).toBe(stack);
        expect(Object.values(serialize(stack!).infras[0]!.resources!)[0]!.value).toMatchObject({
          value: { scope: reference },
        });
      } else {
        expect(() => deserialize(JSON.stringify(wire))).toThrow(
          `Resource "widget" references non-resource symbol "notResource" in "${field}".`,
        );
      }
    },
  );

  it("scopes loop bindings and registers the looped resource in the outer map", () => {
    const loopValue: ForExpression = {
      kind: "for-expression",
      itemVariable: "outer",
      indexVariable: "position",
      collection: propertyReference("outer", "items"),
      body: {
        kind: "if-condition",
        condition: propertyReference("outer", "enabled"),
        body: {
          kind: "object",
          value: {
            name: propertyReference("outer", "name"),
            position: { kind: "identifier", id: "position" },
          },
        },
      },
    };
    const loopedId: ExpressionNode = {
      kind: "property-access",
      base: {
        kind: "array-access",
        base: { kind: "identifier", id: "looped" },
        index: { kind: "identifier", id: "position" },
        nullish: false,
        fromEnd: false,
      },
      property: "id",
      nullish: false,
    };
    const file: InfraNode = {
      fileName: "scoped.bicep",
      parameters: {
        position: {
          bicepIdentifier: "position",
          valueType: { kind: "primitive-type", name: "int" },
          defaultValue: { kind: "integer", value: "0" },
        },
      },
      resources: {
        outer: resourceNode(
          "outer",
          { name: { kind: "string", value: "root" } },
          "Contoso.Test/roots",
        ),
        looped: { ...resourceNode("looped", {}), value: loopValue },
        consumer: resourceNode(
          "consumer",
          {
            name: { kind: "string", value: "consumer" },
            sourceId: loopedId,
            dependsOn: {
              kind: "array",
              items: [{ kind: "identifier", id: "looped" }],
            },
          },
          "Contoso.Test/consumers",
        ),
      },
      outputs: {
        rootId: {
          bicepIdentifier: "rootId",
          valueType: { kind: "primitive-type", name: "string" },
          value: propertyReference("outer", "id"),
        },
        loopedId: {
          bicepIdentifier: "loopedId",
          valueType: { kind: "primitive-type", name: "string" },
          value: loopedId,
        },
        positionOut: {
          bicepIdentifier: "positionOut",
          valueType: { kind: "primitive-type", name: "int" },
          value: { kind: "identifier", id: "position" },
        },
      },
    };
    const [stack] = deserialize(JSON.stringify({ infras: [file] }));
    const [looped] = getLoopedResources(stack!);
    const consumer = stack!.getResources().find((resource) => resource.type.endsWith("/consumers"));

    expect(consumer?.dependsOn).toEqual([looped]);
    expect(stack!.outputs.get("positionOut")?.value).toBe(stack!.parameters.get("position"));

    const [serialized] = serialize(stack!).infras;
    expect(serialized?.resources?.widget?.value).toEqual({
      ...loopValue,
      collection: propertyReference("root", "items"),
    });
    expect(serialized?.outputs?.rootId?.value).toEqual(propertyReference("root", "id"));
    expect(serialized?.outputs?.loopedId?.value).toMatchObject({
      kind: "property-access",
      base: {
        kind: "array-access",
        base: { kind: "identifier", id: "widget" },
        index: { kind: "identifier", id: "position" },
      },
    });
  });

  it("does not resolve an existing-resource scope against another stack's group", () => {
    const producer = new Stack("producer");
    new ResourceGroup(producer, { name: "shared", location: "eastus" });
    const consumer = new Stack("consumer", { targetScope: "resourceGroup" });
    new Resource(consumer, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "existing",
      existing: true,
      scope: fn.resourceGroup("shared"),
    });
    const wire = serialize([producer, consumer]);
    const imported = deserialize(JSON.stringify(wire));

    expect(imported[0]!.getResources()).toHaveLength(1);
    expect(imported[1]!.getResources()).toHaveLength(1);
    expect(imported[1]!.getResources()[0]!.parent).toBe(imported[1]);
    expect(serialize(imported)).toEqual(wire);
  });

  it("keeps unknown expression names unresolved instead of using another stack", () => {
    const first: InfraNode = {
      fileName: "first.bicep",
      resources: {
        external: resourceNode("external", {
          name: { kind: "string", value: "external" },
        }),
      },
    };
    const second: InfraNode = {
      fileName: "second.bicep",
      outputs: {
        externalId: {
          bicepIdentifier: "externalId",
          valueType: { kind: "primitive-type", name: "string" },
          value: propertyReference("external", "id"),
        },
      },
    };
    const imported = deserialize(JSON.stringify({ infras: [first, second] }));

    expect(serialize(imported).infras[1]?.outputs).toEqual(second.outputs);
  });

  it.each(["parent", "scope", "dependsOn"] as const)(
    "does not resolve %s against another stack",
    (field) => {
      const reference: ExpressionNode = { kind: "identifier", id: "external" };
      const files: InfraNode[] = [
        {
          fileName: "first.bicep",
          resources: {
            external: resourceNode("external", {
              name: { kind: "string", value: "external" },
            }),
          },
        },
        {
          fileName: "second.bicep",
          resources: {
            widget: resourceNode("widget", {
              name: { kind: "string", value: "widget" },
              [field]: field === "dependsOn" ? { kind: "array", items: [reference] } : reference,
            }),
          },
        },
      ];

      if (field === "scope") {
        const imported = deserialize(JSON.stringify({ infras: files }));
        expect(imported[1]!.getResources()[0]!.parent).toBe(imported[1]);
        expect(Object.values(serialize(imported).infras[1]!.resources!)[0]!.value).toMatchObject({
          value: { scope: reference },
        });
      } else {
        expect(() => deserialize(JSON.stringify({ infras: files }))).toThrow(
          `Resource "widget" references unknown resource "external" in "${field}".`,
        );
      }
    },
  );
});
