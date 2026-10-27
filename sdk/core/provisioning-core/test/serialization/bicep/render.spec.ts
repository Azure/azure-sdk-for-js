// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import {
  ProvisioningComponent,
  Resource,
  ResourceGroup,
  Stack,
  fn,
  namingRequiredPolicy,
} from "../../../src/index.js";
import { childResource as childResourceHandle, resource } from "../../support.js";
import { renderBicepFiles } from "../../../src/internal.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";
import type {
  ExpressionNode,
  SerializationDocument,
} from "../../../src/serialization/ast/index.js";
import {
  renderBicepFile,
  type RenderedBicepFile,
} from "../../../src/serialization/bicep/render.js";
import { validateRenderedBicepFiles } from "../../scripts/test/bicep-validator.js";

function firstFile(stack: Stack): RenderedBicepFile {
  const [file] = renderBicepFiles(stack);

  if (file === undefined) {
    throw new Error("Expected at least one rendered Bicep file.");
  }

  return file;
}

describe("renderBicepFiles", () => {
  it.each([undefined, "resourceGroup", "subscription", "managementGroup", "tenant"] as const)(
    "renders explicitly declared scope headers (%s)",
    (targetScope) => {
      const rendered = renderBicepFile({
        fileName: "scope.bicep",
        ...(targetScope === undefined ? {} : { targetScope }),
      });
      if (targetScope === undefined) {
        expect(rendered.contents).not.toContain("targetScope");
      } else {
        expect(rendered.contents).toContain(`targetScope = '${targetScope}'`);
      }
    },
  );

  it("renders the current serialized resource output into bicep text", () => {
    const stack = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });

    resource(stack, {
      name: "alpha",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      location: "eastus",
      properties: {
        enabled: true,
      },
    });

    const file = firstFile(stack);

    expect(file.path).toBe("infra.bicep");
    expect(file.contents).toContain("targetScope = 'subscription'");
    expect(file.contents).toContain("resource resource 'Contoso.Test/resources@2024-01-01' = {");
    expect(file.contents).toContain("name: 'alpha'");
    expect(file.contents).toContain("location: 'eastus'");
    expect(file.contents).toContain("enabled: true");
  });

  it("places component-owned resources into a sub-module scoped to the ResourceGroup", () => {
    const stack = new Stack("infra", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const group = new ResourceGroup(stack, {
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

    const file = firstFile(stack);

    // The component-owned resource lands in a sub-module whose `scope:` is
    // the ResourceGroup symbolic name. Bicep does not allow `scope:
    // resourceGroup(...)` on a regular resource declaration — it must come
    // from the enclosing module.
    expect(file.contents).toMatch(/module \w+ '.+\.bicep' = \{[\s\S]*?scope: \w+/);
  });

  it("renders symbolic resource member references from proxied resource reads", () => {
    const stack = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const source = resource(stack, {
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
    });

    (target as any).copyLocation = source.location;
    (target as any).sourceId = source.id;
    (target as any).config = {
      skuName: source.sku.name,
      tag: source.tags?.["env-name"],
    };
    (target as any).whole = source;

    const file = firstFile(stack);

    expect(file.contents).toContain("copyLocation: source.location");
    expect(file.contents).toContain("sourceId: source.id");
    expect(file.contents).toContain("skuName: source.sku.name");
    expect(file.contents).toContain("tag: source.tags['env-name']");
    expect(file.contents).toContain("whole: source");
  });

  it("renders conditional extension resources with scope instead of parent", () => {
    const stack = new Stack("infra", { targetScope: "resourceGroup" });
    const target = new Resource(stack, {
      type: "Contoso.Test/targets",
      apiVersion: "2024-01-01",
      name: "target",
    });
    new Resource(
      target,
      {
        type: "Microsoft.Authorization/roleAssignments",
        apiVersion: "2022-04-01",
        name: "assignment",
      },
      { condition: true },
    );
    const file = firstFile(stack);

    expect(file.contents).toContain("scope: target");
    expect(file.contents).not.toContain("parent: target");
  });

  it("uses the serialized file name as the rendered path", () => {
    const rendered = renderBicepFiles(new Stack("nested/main", { targetScope: "subscription" }));

    expect(rendered).toEqual([
      {
        path: "nested/main.bicep",
        contents: "targetScope = 'subscription'\n",
      },
    ]);
  });

  it("escapes Bicep string content without changing its value", () => {
    const rendered = renderBicepFile({
      fileName: "strings.bicep",
      variables: {
        workflowExpression: {
          bicepIdentifier: "workflowExpression",
          value: {
            kind: "string",
            value: "@parameters('name') /\\r/ split(\\\"\\n\\\") ${literal}",
          },
        },
      },
    });

    expect(rendered.contents).toContain(
      "var workflowExpression = '@parameters(\\'name\\') /\\\\r/ split(\\\\\"\\\\n\\\\\") \\${literal}'",
    );
  });

  it("renders declarations and outputs from a hand-authored file node", () => {
    const rendered = renderBicepFile({
      fileName: "infra.bicep",
      targetScope: "subscription",
      parameters: {
        location: {
          bicepIdentifier: "location",
          valueType: { kind: "primitive-type", name: "string" },
          defaultValue: { kind: "string", value: "eastus" },
        },
      },
      variables: {
        storageName: {
          bicepIdentifier: "storageName",
          value: {
            kind: "function-call",
            target: "concat",
            args: [
              { kind: "string", value: "demo" },
              {
                kind: "function-call",
                target: "uniqueString",
                args: [
                  {
                    kind: "property-access",
                    base: {
                      kind: "function-call",
                      target: "subscription",
                      args: [],
                    },
                    property: "subscriptionId",
                    nullish: false,
                  },
                ],
              },
            ],
          },
        },
      },
      outputs: {
        storageName: {
          bicepIdentifier: "storageName",
          valueType: { kind: "primitive-type", name: "string" },
          value: { kind: "identifier", id: "storageName" },
        },
      },
    });

    expect(rendered.contents).toContain("param location string = 'eastus'");
    expect(rendered.contents).toContain(
      "var storageName = concat('demo', uniqueString(subscription().subscriptionId))",
    );
    expect(rendered.contents).toContain("output storageName string = storageName");
  });

  it("preserves imported array concatenation through JSON round-trip and Bicep compilation", () => {
    const expression: ExpressionNode = {
      kind: "function-call",
      target: "concat",
      args: [
        { kind: "array", items: [{ kind: "string", value: "first" }] },
        { kind: "array", items: [{ kind: "string", value: "second" }] },
      ],
    };
    const document: SerializationDocument = {
      infras: [
        {
          fileName: "array-concat.bicep",
          targetScope: "resourceGroup",
          outputs: {
            combined: {
              bicepIdentifier: "combined",
              valueType: { kind: "primitive-type", name: "array" },
              value: expression,
            },
          },
        },
      ],
    };
    const restored = deserialize(JSON.stringify(document));
    expect(serialize(restored).infras[0]!.outputs?.combined?.value).toEqual(expression);

    const files = renderBicepFiles(restored);
    expect(files).toHaveLength(1);
    expect(files[0]!.contents).toContain(
      "output combined array = concat([\n  'first'\n], [\n  'second'\n])",
    );
    validateRenderedBicepFiles(files);
  }, 30_000);

  it("preserves authored string concatenation in function-call and tagged-template forms", () => {
    const stack = new Stack("string-concat", { targetScope: "resourceGroup" });
    const suffix = stack.parameters.add("suffix", "string");
    stack.outputs.add("combined", "string", fn.concat("prefix-", suffix));
    stack.outputs.add("tagged", "string", fn.concat`prefix-${suffix}`);

    const files = renderBicepFiles(stack);
    expect(files).toHaveLength(1);
    expect(files[0]!.contents).toContain("output combined string = concat('prefix-', suffix)");
    expect(files[0]!.contents).toContain("output tagged string = concat('prefix-', suffix)");
    validateRenderedBicepFiles(files);
  }, 30_000);

  it("renders @batchSize decorator on resources with for-expression", () => {
    const rendered = renderBicepFile({
      fileName: "infra.bicep",
      resources: {
        storageAccount: {
          bicepIdentifier: "storageAccount",
          type: "Microsoft.Storage/storageAccounts",
          apiVersion: "2024-01-01",
          existing: false,
          decorators: { batchSize: 3 },
          value: {
            kind: "for-expression",
            itemVariable: "item",
            collection: {
              kind: "array",
              items: [
                { kind: "string", value: "a" },
                { kind: "string", value: "b" },
              ],
            },
            body: {
              kind: "object",
              value: {
                name: { kind: "identifier", id: "item" },
              },
            },
          },
        },
      },
    });

    expect(rendered.contents).toContain("@batchSize(3)");
    expect(rendered.contents).toContain(
      "resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' = [for",
    );
  });

  it("renders numeric decorator bounds without quotes", () => {
    const rendered = renderBicepFile({
      fileName: "infra.bicep",
      parameters: {
        bounded: {
          bicepIdentifier: "bounded",
          valueType: { kind: "primitive-type", name: "int" },
          decorators: {
            minValue: -7,
            maxValue: 90,
          },
        },
        boundedLength: {
          bicepIdentifier: "boundedLength",
          valueType: { kind: "primitive-type", name: "string" },
          decorators: {
            minLength: 1,
            maxLength: 64,
          },
        },
      },
    });

    expect(rendered.contents).toContain("@minValue(-7)\n@maxValue(90)\nparam bounded int");
    expect(rendered.contents).toContain(
      "@minLength(1)\n@maxLength(64)\nparam boundedLength string",
    );
  });

  it("renders an interpolated-string expression as Bicep string interpolation", () => {
    const rendered = renderBicepFile({
      fileName: "infra.bicep",
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
                  { kind: "string", value: "prefix-" },
                  { kind: "identifier", id: "suffix" },
                ],
              },
            },
          },
        },
      },
    });

    expect(rendered.contents).toContain("name: 'prefix-${suffix}'");
  });

  it("renders interpolated-string with only string literals as a plain string", () => {
    const rendered = renderBicepFile({
      fileName: "infra.bicep",
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
                  { kind: "string", value: "hello" },
                  { kind: "string", value: " world" },
                ],
              },
            },
          },
        },
      },
    });

    expect(rendered.contents).toContain("name: 'hello world'");
  });

  it("renders interpolated-string with function call segments", () => {
    const rendered = renderBicepFile({
      fileName: "infra.bicep",
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
                  { kind: "string", value: "rg-" },
                  {
                    kind: "function-call",
                    target: "uniqueString",
                    args: [{ kind: "string", value: "seed" }],
                  },
                  { kind: "string", value: "-prod" },
                ],
              },
            },
          },
        },
      },
    });

    expect(rendered.contents).toContain("name: 'rg-${uniqueString('seed')}-prod'");
  });
});
