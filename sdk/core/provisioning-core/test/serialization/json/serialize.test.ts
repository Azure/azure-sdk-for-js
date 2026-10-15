
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import {
  ProvisioningComponent,
  deref,
  fn,
  isExpression,
  ResourceGroup,
  Stack,
  namingRequiredPolicy,
  Resource,
} from "@azure/provisioning-core";
import { interpolatedStringExpressionNode } from "../../../src/expression/ast-nodes.js";
import { unwrapExpression, wrapExpression } from "../../../src/expression/expressions.js";
import { createLoopedResource, Loop } from "../../../src/constructs/resource/resource.js";
import { childResource as childResourceHandle, resource } from "../../support.js";

import { finalizeFileLayout } from "../../../../bicep/src/index.js";
import { serialize } from "../../../src/serialization/json/serialize.js";
import { deserialize } from "../../../src/serialization/json/deserialize.js";

function loweredFiles(stack: Stack) {
  return finalizeFileLayout(serialize(stack)).infras;
}

describe("serialize", () => {
  it("renames declaration references without changing properties, literals, or loop bindings", () => {
    const stack = new Stack("priority-references", {
      targetScope: "resourceGroup",
    });
    const parameter = stack.parameters.add("config", "object", {
      defaultValue: { label: "config", values: ["one"] },
    });
    const config = parameter as typeof parameter & {
      label: ReturnType<typeof stack.parameters.add<"string">>;
      values: ReturnType<typeof stack.parameters.add<"array">>;
    };
    const variable = stack.variables.add("config", config.label);
    stack.parameters.add("defaultLabel", "string", {
      defaultValue: config.label,
    });
    const resource = new Resource(stack, {
      type: "Contoso.Test/configs",
      apiVersion: "2024-01-01",
      name: "config",
    });
    Object.assign(resource, {
      tags: { parameter: config.label, variable, literal: "config" },
    });
    const loop = new Loop(config.values, { itemVariable: "config" });
    createLoopedResource(Resource, loop, stack, {
      type: "Contoso.Test/rows",
      apiVersion: "2024-01-01",
      name: fn.concat(loop.item, variable),
    });
    stack.outputs.add("config", "string", variable, {
      metadata: { label: config.label, variable },
    });
    const file = serialize(stack).infras[0]!;
    const parameterLabel = {
      kind: "property-access",
      base: { kind: "identifier", id: "config2" },
      property: "label",
      nullish: false,
    };

    expect(file.parameters!.defaultLabel!.defaultValue).toEqual(parameterLabel);
    expect(file.variables!.config3!.value).toEqual(parameterLabel);
    expect(file.resources!.config!.value).toMatchObject({
      value: {
        name: { kind: "string", value: "config" },
        tags: {
          value: {
            parameter: parameterLabel,
            variable: { kind: "identifier", id: "config3" },
            literal: { kind: "string", value: "config" },
          },
        },
      },
    });
    expect(file.resources!.row!.value).toMatchObject({
      kind: "for-expression",
      itemVariable: "config",
      collection: { ...parameterLabel, property: "values" },
      body: {
        value: {
          name: {
            args: [
              { kind: "identifier", id: "config" },
              { kind: "identifier", id: "config3" },
            ],
          },
        },
      },
    });
    expect(file.outputs!.config!.decorators!.metadata).toEqual({
      label: parameterLabel,
      variable: { kind: "identifier", id: "config3" },
    });
    expect(serialize(deserialize(JSON.stringify({ infras: [file] })))).toEqual({
      infras: [file],
    });
  });

  it("serializes independent stacks with stack-local symbols", () => {
    const stacks = ["first", "second"].map((name) => {
      const stack = new Stack(name, {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const instance = resource(stack, {
        name,
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
      });
      stack.outputs.add("resourceId", "string", instance.id);
      return stack;
    });

    const document = serialize(stacks);

    expect(document).toEqual({
      infras: stacks.flatMap((stack) => serialize(stack).infras),
    });
    expect(document.infras.map((file) => Object.keys(file.resources ?? {}))).toEqual([
      ["widget"],
      ["widget"],
    ]);
  });

  it.each([false, true])(
    "rejects cross-stack resource references (reversed input: %s)",
    (reversed) => {
      const first = new Stack("first", { targetScope: "resourceGroup" });
      const second = new Stack("second", { targetScope: "resourceGroup" });
      const external = resource(second, {
        name: "external",
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
      });
      first.outputs.add("externalId", "string", external.id);

      expect(() => serialize(reversed ? [second, first] : [first, second])).toThrow(
        "Missing synthesized symbol for referenced resource type Contoso.Test/widgets.",
      );
    },
  );

  it.each([
    ["vaults", "vault"],
    ["storageAccounts", "storageAccount"],
    ["policies", "policy"],
    ["addresses", "address"],
    ["children", "child"],
    ["people", "person"],
    ["status", "status"],
    ["redis", "redis"],
    ["cache", "cache"],
    ["caches", "cache"],
    ["dataCaches", "dataCache"],
    ["patch", "patch"],
    ["patches", "patch"],
    ["savedSearches", "savedSearch"],
  ])("uses singular resource symbols for %s", (typeName, symbol) => {
    const root = new Stack("symbols", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const instance = resource(root, {
      name: "example",
      type: `Contoso.Test/${typeName}`,
      apiVersion: "2024-01-01",
    });
    root.outputs.add("resourceId", "string", instance.id);

    const [file] = serialize(root).infras;

    expect(Object.keys(file?.resources ?? {})).toEqual([symbol]);
    expect(file?.resources?.[symbol]?.bicepIdentifier).toBe(symbol);
    expect(file?.outputs?.resourceId?.value).toMatchObject({
      kind: "property-access",
      base: { kind: "identifier", id: symbol },
      property: "id",
    });
  });

  it("round-trips every primitive output type", () => {
    const root = new Stack("primitive-outputs", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    root.outputs.add("stringOutput", "string", "value");
    root.outputs.add("intOutput", "int", 42);
    root.outputs.add("boolOutput", "bool", true);
    root.outputs.add("objectOutput", "object", { name: "value" });
    root.outputs.add("arrayOutput", "array", ["value"]);
    root.outputs.add("anyOutput", "any", { nested: [true] });

    const serialized = serialize(root);
    const [roundTripped] = deserialize(JSON.stringify(serialized));

    expect(
      Object.fromEntries(
        roundTripped!.outputs
          .getAll()
          .map((output) => [output.name, { type: output.type, value: output.value }]),
      ),
    ).toEqual({
      stringOutput: { type: "string", value: "value" },
      intOutput: { type: "int", value: 42 },
      boolOutput: { type: "bool", value: true },
      objectOutput: { type: "object", value: { name: "value" } },
      arrayOutput: { type: "array", value: ["value"] },
      anyOutput: { type: "any", value: { nested: [true] } },
    });
    expect(serialize(roundTripped!)).toEqual(serialized);
  });

  it("rejects non-primitive output types during deserialization", () => {
    const serialized = JSON.stringify({
      infras: [
        {
          fileName: "infra.bicep",
          outputs: {
            value: {
              bicepIdentifier: "value",
              valueType: {
                kind: "nullable-type",
                base: { kind: "primitive-type", name: "string" },
              },
              value: { kind: "string", value: "value" },
            },
          },
        },
      ],
    });

    expect(() => deserialize(serialized)).toThrow(
      'Cannot deserialize output "value" with non-primitive type "nullable-type".',
    );
  });

  it("rejects unknown primitive output types during deserialization", () => {
    const serialized = JSON.stringify({
      infras: [
        {
          fileName: "infra.bicep",
          outputs: {
            value: {
              bicepIdentifier: "value",
              valueType: { kind: "primitive-type", name: "custom" },
              value: { kind: "string", value: "value" },
            },
          },
        },
      ],
    });

    expect(() => deserialize(serialized)).toThrow(
      'Cannot deserialize output "value" with unknown primitive type "custom".',
    );
  });

  it("round-trips numeric decorator bounds", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    root.parameters.add("bounded", "int", {
      minValue: -7,
      maxValue: 90,
    });
    root.parameters.add("boundedLength", "string", {
      minLength: 1,
      maxLength: 64,
    });
    root.outputs.add("boundedOutput", "int", 0, {
      minValue: 0,
      maxValue: 100,
    });

    const serialized = serialize(root);
    expect(serialized.infras[0]?.parameters?.bounded?.decorators).toMatchObject({
      minValue: -7,
      maxValue: 90,
    });
    expect(serialized.infras[0]?.outputs?.boundedOutput?.decorators).toMatchObject({
      minValue: 0,
      maxValue: 100,
    });
    expect(serialized.infras[0]?.parameters?.boundedLength?.decorators).toMatchObject({
      minLength: 1,
      maxLength: 64,
    });

    const [roundTripped] = deserialize(JSON.stringify(serialized));
    expect(roundTripped?.parameters.getMetadata("bounded")?.minValue).toBe(-7);
    expect(roundTripped?.parameters.getMetadata("bounded")?.maxValue).toBe(90);
    expect(roundTripped?.parameters.getMetadata("boundedLength")?.minLength).toBe(1);
    expect(roundTripped?.parameters.getMetadata("boundedLength")?.maxLength).toBe(64);
    expect(roundTripped?.outputs.get("boundedOutput")?.minValue).toBe(0);
    expect(serialize(roundTripped!)).toEqual(serialized);
  });

  it("serializes explicit resource dependencies as symbolic references", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const dependency = resource(root, {
      name: "dependency",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
    });
    new Resource(
      root,
      {
        name: "dependent",
        type: "Contoso.Test/resources",
        apiVersion: "2024-01-01",
      },
      { dependsOn: [dependency] },
    );

    const [file] = loweredFiles(root);
    const dependent = Object.values(file?.resources ?? {}).find(
      (candidate) => candidate.bicepIdentifier === "resource2",
    );

    expect(dependent?.value).toMatchObject({
      kind: "object",
      value: {
        dependsOn: {
          kind: "array",
          items: [{ kind: "identifier", id: "resource" }],
        },
      },
    });
  });

  it("preserves cyclic resource references without doing dependency validation", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const first = resource(root, {
      name: "first",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
    });
    const second = resource(root, {
      name: "second",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
    });
    (first as unknown as { peerId: unknown }).peerId = second.id;
    (second as unknown as { peerId: unknown }).peerId = first.id;

    const file = serialize(root).infras[0]!;
    expect(file.resources!.resource!.value).toMatchObject({
      value: {
        peerId: {
          kind: "property-access",
          base: { kind: "identifier", id: "resource2" },
          property: "id",
        },
      },
    });
    expect(file.resources!.resource2!.value).toMatchObject({
      value: {
        peerId: {
          kind: "property-access",
          base: { kind: "identifier", id: "resource" },
          property: "id",
        },
      },
    });
  });

  it("preserves authored declaration order while serializing forward references", () => {
    const root = new Stack("unsorted", { targetScope: "resourceGroup" });
    const consumer = resource(root, {
      name: "consumer",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const producer = resource(root, {
      name: "producer",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    Object.assign(consumer, { source: producer.name });
    root.variables.add("derived", wrapExpression({ kind: "symbolic-value", path: "producerName" }));
    root.variables.add("producerName", producer.name);
    const file = serialize(root).infras[0]!;

    expect(Object.keys(file.resources!)).toEqual(["widget", "widget2"]);
    expect(Object.keys(file.variables!)).toEqual(["derived", "producerName"]);
    expect(file.resources!.widget!.value).toMatchObject({
      value: { source: { base: { id: "widget2" } } },
    });
    expect(file.variables!.producerName!.value).toMatchObject({
      base: { id: "widget2" },
    });
  });

  it("omits undefined object properties during serialization", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    resource(root, {
      name: "alpha",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      config: {
        enabled: true,
        optionalSetting: undefined,
      } as Record<string, unknown>,
    });

    const [file] = loweredFiles(root);
    const serialized = file?.resources?.resource;

    expect(serialized?.value.kind).toBe("object");
    if (serialized?.value.kind !== "object") {
      throw new Error("Expected resource body to be an object.");
    }

    expect(serialized.value.value.config).toEqual({
      kind: "object",
      value: {
        enabled: {
          kind: "boolean",
          value: true,
        },
      },
    });
  });

  it("omits undefined top-level resource properties during serialization", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    resource(root, {
      name: "alpha",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      identity: undefined as unknown,
    });

    const [file] = loweredFiles(root);
    const serialized = file?.resources?.resource;

    expect(serialized?.value.kind).toBe("object");
    if (serialized?.value.kind !== "object") {
      throw new Error("Expected resource body to be an object.");
    }

    expect(serialized.value.value.identity).toBeUndefined();
  });

  it("preserves conditional expressions in looped resource object properties", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const zones = new Loop<string>(["1", "2", "3"], {
      itemVariable: "zone",
    });

    createLoopedResource(Resource, zones, root, {
      name: "storage",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      tags: {
        zone: zones.item,
        isboss: fn.cond(fn.eq(zones.item, "1"), "true", "false"),
      },
    });

    const [file] = loweredFiles(root);
    const serialized = file?.resources?.resource;

    expect(serialized?.value.kind).toBe("for-expression");
    if (serialized?.value.kind !== "for-expression" || serialized.value.body.kind !== "object") {
      throw new Error("Expected a looped resource object body.");
    }

    expect(serialized.value.body.value.tags).toEqual({
      kind: "object",
      value: {
        zone: {
          kind: "identifier",
          id: "zone",
        },
        isboss: {
          kind: "ternary-operation",
          condition: {
            kind: "binary-operation",
            operator: "==",
            left: {
              kind: "identifier",
              id: "zone",
            },
            right: {
              kind: "string",
              value: "1",
            },
          },
          trueValue: {
            kind: "string",
            value: "true",
          },
          falseValue: {
            kind: "string",
            value: "false",
          },
        },
      },
    });
  });

  it("splits resource-group-scoped component resources into a dedicated file", () => {
    const root = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const group = new ResourceGroup(root, {
      name: "rg-demo",
      location: "eastus",
    });

    class ScopedResources extends ProvisioningComponent {
      readonly alpha = resource(this, {
        name: "alpha",
        type: "Contoso.Test/resources",
        apiVersion: "2024-01-01",
      });
    }

    new ScopedResources(group);

    const document = finalizeFileLayout(serialize(root));
    const [subscriptionFile, resourceFile] = document.infras;

    expect(document.infras.map((file) => file.fileName)).toEqual([
      "infra.bicep",
      "infra/resource.bicep",
    ]);
    expect(Object.keys(subscriptionFile?.resources ?? {})).toEqual(["resourceGroup"]);
    expect(subscriptionFile?.modules).toEqual({
      resourceModule: {
        bicepIdentifier: "resourceModule",
        path: "./infra/resource.bicep",
        value: {
          kind: "object",
          value: {
            name: {
              kind: "string",
              value: "resourceModule",
            },
            scope: {
              kind: "identifier",
              id: "resourceGroup",
            },
          },
        },
      },
    });
    expect(subscriptionFile?.outputs).toBeUndefined();
    expect(resourceFile?.targetScope).toBe("resourceGroup");
    expect(Object.keys(resourceFile?.resources ?? {})).toEqual(["resource"]);
    expect(resourceFile?.outputs).toBeUndefined();
    expect(resourceFile?.resources?.resource?.value.kind).toBe("object");
    if (resourceFile?.resources?.resource?.value.kind !== "object") {
      throw new Error("Expected split resource body to be an object.");
    }
    expect(resourceFile.resources.resource.value.value.scope).toBeUndefined();
    expect(resourceFile.resources.resource.value.value.name).toEqual({
      kind: "string",
      value: "alpha",
    });
  });

  it("keeps sub-resources in the same file as their parent resource", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const parent = resource(root, {
      name: "parent-a",
      type: "Contoso.Test/parents",
      apiVersion: "2024-01-01",
    });

    childResourceHandle(parent, {
      name: "child-a",
      type: "Contoso.Test/parents/children",
      apiVersion: "2024-01-01",
    });

    const [file] = loweredFiles(root);

    expect(file?.fileName).toBe("infra/parent.bicep");
    expect(file?.targetScope).toBe("resourceGroup");
    expect(Object.keys(file?.resources ?? {})).toEqual(["parent", "child"]);
    expect(file?.resources?.child?.value.kind).toBe("object");
    if (file?.resources?.child?.value.kind !== "object") {
      throw new Error("Expected child resource body to be an object.");
    }
    expect(file.resources.child.value.value.parent).toEqual({
      kind: "identifier",
      id: "parent",
    });
  });

  it("lowers resource member reads and whole-resource assignments into expression nodes", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const source = resource(root, {
      name: "source-a",
      type: "Contoso.Test/sources",
      apiVersion: "2024-01-01",
      location: "eastus",
      tags: {
        "env-name": "dev",
      },
      sku: {
        name: "Standard_LRS",
      },
    });
    const target = childResourceHandle(source, {
      name: "target-a",
      type: "Contoso.Test/sources/targets",
      apiVersion: "2024-01-01",
      copyLocation: undefined as unknown,
      sourceId: undefined as unknown,
      config: {} as Record<string, unknown>,
      whole: undefined as unknown,
      rawLocation: undefined as unknown,
    });

    (target as any).copyLocation = source.location;
    (target as any).sourceId = source.id;
    (target as any).config = {
      skuName: source.sku.name,
      tag: source.tags?.["env-name"],
    };
    (target as any).whole = source;
    (target as any).rawLocation = deref(source.location);

    const [file] = loweredFiles(root);
    const targetResource = file?.resources?.target;

    expect(targetResource?.value.kind).toBe("object");
    if (targetResource?.value.kind !== "object") {
      throw new Error("Expected target resource body to be an object.");
    }

    expect(targetResource.value.value.copyLocation).toEqual({
      kind: "property-access",
      base: {
        kind: "identifier",
        id: "source",
      },
      property: "location",
      nullish: false,
    });
    expect(targetResource.value.value.sourceId).toEqual({
      kind: "property-access",
      base: {
        kind: "identifier",
        id: "source",
      },
      property: "id",
      nullish: false,
    });
    expect(targetResource.value.value.config).toEqual({
      kind: "object",
      value: {
        skuName: {
          kind: "property-access",
          base: {
            kind: "property-access",
            base: {
              kind: "identifier",
              id: "source",
            },
            property: "sku",
            nullish: false,
          },
          property: "name",
          nullish: false,
        },
        tag: {
          kind: "array-access",
          base: {
            kind: "property-access",
            base: {
              kind: "identifier",
              id: "source",
            },
            property: "tags",
            nullish: false,
          },
          index: {
            kind: "string",
            value: "env-name",
          },
          nullish: false,
          fromEnd: false,
        },
      },
    });
    expect(targetResource.value.value.whole).toEqual({
      kind: "identifier",
      id: "source",
    });
    expect(targetResource.value.value.rawLocation).toEqual({
      kind: "string",
      value: "eastus",
    });
  });

  it("serializes property access cleanly when the referenced property value is itself an expression object", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const source = resource(root, {
      name: fn.concat("demo", fn.uniqueString(fn.subscription().subscriptionId)),
      type: "Contoso.Test/sources",
      apiVersion: "2024-01-01",
    });
    const target = childResourceHandle(source, {
      name: "target-a",
      type: "Contoso.Test/sources/targets",
      apiVersion: "2024-01-01",
      copyName: undefined as unknown,
    });

    (target as any).copyName = source.name;

    const [file] = loweredFiles(root);
    const targetResource = file?.resources?.target;

    expect(targetResource?.value.kind).toBe("object");
    if (targetResource?.value.kind !== "object") {
      throw new Error("Expected target resource body to be an object.");
    }

    expect(targetResource.value.value.copyName).toEqual({
      kind: "property-access",
      base: {
        kind: "identifier",
        id: "source",
      },
      property: "name",
      nullish: false,
    });
  });
});

describe("InterpolatedStringExpressionNode", () => {
  it("serializes an interpolated-string expression on a resource property", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const nameExpr = wrapExpression(
      interpolatedStringExpressionNode(["prefix-", fn.uniqueString("seed"), "-suffix"]),
    );

    resource(root, {
      name: nameExpr as unknown as string,
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
    });

    const [file] = loweredFiles(root);
    const res = file?.resources?.resource;
    expect(res).toBeDefined();
    expect(res?.value.kind).toBe("object");
    if (res?.value.kind !== "object") throw new Error("Expected object");

    const nameNode = res.value.value.name!;
    expect(nameNode.kind).toBe("interpolated-string");
    if (nameNode.kind !== "interpolated-string") throw new Error("Expected interpolated-string");

    expect(nameNode.segments).toHaveLength(3);
    expect(nameNode.segments[0]).toEqual({ kind: "string", value: "prefix-" });
    expect(nameNode.segments[1]).toMatchObject({
      kind: "function-call",
      target: "uniqueString",
    });
    expect(nameNode.segments[2]).toEqual({ kind: "string", value: "-suffix" });
  });

  it("deserializes an interpolated-string JSON node into a core expression", () => {
    const json = JSON.stringify({
      infras: [
        {
          fileName: "main.bicep",
          targetScope: "resourceGroup",
          resources: {
            testRes: {
              bicepIdentifier: "testRes",
              type: "Contoso.Test/resources",
              apiVersion: "2024-01-01",
              existing: false,
              value: {
                kind: "object",
                value: {
                  name: {
                    kind: "interpolated-string",
                    segments: [
                      { kind: "string", value: "hello-" },
                      { kind: "identifier", id: "suffix" },
                    ],
                  },
                },
              },
            },
          },
        },
      ],
    });

    const stacks = deserialize(json);
    expect(stacks.length).toBeGreaterThan(0);

    const stack = stacks[0]!;
    const resources = stack.getResources();
    expect(resources.length).toBe(1);

    const res = resources[0]!;
    const nameVal = deref(res).name;
    expect(isExpression(nameVal)).toBe(true);
    const node = unwrapExpression(nameVal as any);
    expect(node.kind).toBe("interpolated-string");
  });

  it("round-trips serialize → JSON → deserialize for interpolated-string", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const nameExpr = wrapExpression(
      interpolatedStringExpressionNode(["rg-", fn.uniqueString("id")]),
    );

    resource(root, {
      name: nameExpr as unknown as string,
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
    });

    const serialized = serialize(root);
    const json = JSON.stringify(serialized);
    const stacks = deserialize(json);

    expect(stacks.length).toBeGreaterThan(0);
    const res = stacks[0]!.getResources()[0]!;
    const nameVal = deref(res).name;
    expect(isExpression(nameVal)).toBe(true);
    expect(unwrapExpression(nameVal as any).kind).toBe("interpolated-string");
  });
});
