import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect, beforeEach } from "vitest";
import { finalizeFileLayout, renderBicepFiles } from "@azure/provisioning-bicep";
import {
  ProvisioningComponent,
  Stack,
  Resource,
  ResourceGroup,
  deref,
  fn,
  isExpression,
  namingRequiredPolicy,
} from "@azure/provisioning-core";
import { unwrapExpression } from "../../../src/expression/expressions.js";
import { createLoopedResource, Loop } from "../../../src/constructs/resource/resource.js";
import { childResource as childResourceHandle, resource } from "../../support.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";
import { getLoopedResources } from "../../../src/constructs/stack.js";
import {
  createFlatModelShape,
  createRecordShape,
  createStringShape,
} from "../../../src/shape/shape.js";
import { registerShape } from "../../../src/shape/shape-registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

beforeEach(() => {
  Stack.clearRoots();
});

describe("deserialize", () => {
  it("imports serialized stacks as root stacks", () => {
    const source = new Stack("source", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    resource(source, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: "testStorage",
    });

    const json = JSON.stringify(serialize(source));
    Stack.clearRoots();

    const imported = deserialize(json);

    expect(imported.length).toBeGreaterThan(0);
    expect(Stack.roots).toEqual(expect.arrayContaining([...imported]));
  });

  it("preserves resources in imported stacks", () => {
    const source = new Stack("source", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    resource(source, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: "testStorage",
      location: "eastus",
    });

    const json = JSON.stringify(serialize(source));
    Stack.clearRoots();

    const imported = deserialize(json);

    const allResources = collectResources(imported);
    expect(allResources.length).toBeGreaterThan(0);

    const storageResource = allResources.find(
      (r) => r.type === "Microsoft.Storage/storageAccounts",
    );
    expect(storageResource).toBeDefined();
  });

  it("imports subscription-scoped stacks with modules", () => {
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

    const json = JSON.stringify(serialize(root));
    Stack.clearRoots();

    const imported = deserialize(json);

    expect(imported.length).toBeGreaterThan(0);
    const allResources = collectResources(imported);
    const rgResource = allResources.find(
      (r) => r.type.toLowerCase() === "microsoft.resources/resourcegroups",
    );
    expect(rgResource).toBeDefined();
  });

  it.each(
    (["literal", "generated", "parameter", "function"] as const).flatMap((nameKind) =>
      [false, true].map((existing) => ({ nameKind, existing })),
    ),
  )(
    "preserves $nameKind RG placement independently of declaration order (existing: $existing)",
    ({ nameKind, existing }) => {
      const source = new Stack("rg-placement");
      const name =
        nameKind === "generated"
          ? undefined
          : nameKind === "parameter"
            ? source.parameters.add("groupName", "string")
            : nameKind === "function"
              ? fn.concat("rg-", "test")
              : "rg-test";
      const group = new ResourceGroup(source, { name, location: "eastus" });
      new Resource(group, {
        name: "widget",
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        existing,
      });
      const document = serialize(source);
      const expectedFiles = renderBicepFiles(document);
      const file = document.infras[0]!;
      const reversed = {
        infras: [
          {
            ...file,
            resources: Object.fromEntries(Object.entries(file.resources!).reverse()),
          },
        ],
      };

      const [restored] = deserialize(JSON.stringify(reversed));
      const restoredGroup = restored!.getResources(ResourceGroup)[0]!;
      const widget = restored!
        .getResources()
        .find((resource) => resource.type === "Contoso.Test/widgets")!;

      expect(widget.parent).toBe(restoredGroup);
      expect(restoredGroup.children).toContain(widget);
      expect(serialize(restored!)).toEqual(document);
      expect(renderBicepFiles(serialize(restored!))).toEqual(expectedFiles);
      expect(expectedFiles.some((file) => file.contents.includes("scope: resourceGroup"))).toBe(
        true,
      );
    },
  );

  it("preserves materialized defaults when intermediate components disappear", () => {
    registerShape(
      "Contoso.Scope/widgets",
      "2024-01-01",
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape() },
        tags: {
          armPath: ["tags"],
          value: createRecordShape(createStringShape()),
        },
      }),
    );
    class Defaults extends ProvisioningComponent {
      constructor(parent: ProvisioningComponent) {
        super(parent);
        this._localDeploymentContext = {
          location: "westus",
          tags: { team: "platform" },
        };
      }
    }
    const source = new Stack("defaults", { tags: { environment: "test" } });
    const group = new ResourceGroup(source, {
      location: "eastus",
      name: "rg-defaults",
    });
    new Resource(new Defaults(group), {
      name: "widget",
      type: "Contoso.Scope/widgets",
      apiVersion: "2024-01-01",
    });
    const document = serialize(source);
    const [restored] = deserialize(JSON.stringify(document));
    const widget = restored!
      .getResources()
      .find((resource) => resource.type === "Contoso.Scope/widgets")!;

    expect(widget.parent).toBeInstanceOf(ResourceGroup);
    expect(serialize(restored!)).toEqual(document);
    expect(document.infras[0]!.resources!.widget!.value).toMatchObject({
      value: {
        location: { kind: "string", value: "westus" },
        tags: {
          kind: "object",
          value: {
            environment: { kind: "string", value: "test" },
            team: { kind: "string", value: "platform" },
          },
        },
      },
    });
  });

  it("keeps multiple RG targets, nested resources, extensions, and dependencies distinct", () => {
    const source = new Stack("relationships");
    const firstGroup = new ResourceGroup(source, {
      name: source.parameters.add("firstGroupName", "string"),
      location: "eastus",
    });
    const secondGroup = new ResourceGroup(source, {
      name: "rg-existing",
      existing: true,
    });
    const producer = new Resource(firstGroup, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "producer",
    });
    new Resource(producer, {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    new Resource(producer, {
      type: "Contoso.Extensions/settings",
      apiVersion: "2024-01-01",
      name: "extension",
    });
    new Resource(
      secondGroup,
      {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: "consumer",
        tags: { source: producer.name },
      },
      { dependsOn: [producer] },
    );
    source.outputs.add("producerId", "string", producer.id);
    const document = serialize(source);
    const [restored] = deserialize(
      JSON.stringify({
        infras: [
          {
            ...document.infras[0],
            resources: Object.fromEntries(Object.entries(document.infras[0]!.resources!).reverse()),
          },
        ],
      }),
    );
    const resources = restored!.getResources();
    const restoredProducer = resources.find((resource) => deref(resource.name) === "producer")!;
    const consumer = resources.find((resource) => deref(resource.name) === "consumer")!;

    expect(restoredProducer.parent).toBeInstanceOf(ResourceGroup);
    expect(consumer.parent).not.toBe(restoredProducer.parent);
    expect((consumer.parent as ResourceGroup).existing).toBe(true);
    expect(consumer.dependsOn).toEqual([restoredProducer]);
    expect(resources.find((resource) => deref(resource.name) === "child")!.parent).toBe(
      restoredProducer,
    );
    expect(resources.find((resource) => deref(resource.name) === "extension")!.parent).toBe(
      restoredProducer,
    );
    for (const logicalDocument of [document, serialize(restored!)]) {
      const declarations = logicalDocument.infras[0]!.resources!;
      const producerNode = Object.values(declarations).find(
        (resource) =>
          resource.value.kind === "object" &&
          resource.value.value.name?.kind === "string" &&
          resource.value.value.name.value === "producer",
      )!;
      const producerId = producerNode.bicepIdentifier;
      const groupId = Object.values(declarations).find(
        (resource) => resource.type === ResourceGroup.resourceType && !resource.existing,
      )!.bicepIdentifier;
      expect(producerNode.value).toMatchObject({
        value: { scope: { kind: "identifier", id: groupId } },
      });
      expect(logicalDocument.infras[0]!.outputs!.producerId!.value).toMatchObject({
        base: { id: producerId },
      });
      const files = finalizeFileLayout(logicalDocument).infras;
      expect(files.filter((file) => file.targetScope === "resourceGroup")).toHaveLength(2);
      const producerFile = files.find((file) => file.resources?.[producerId])!;
      expect(producerFile.resources!.child!.value).toMatchObject({
        value: { parent: { kind: "identifier", id: producerId } },
      });
      expect(producerFile.resources!.setting!.value).toMatchObject({
        value: { scope: { kind: "identifier", id: producerId } },
      });
      expect(producerFile.resources![producerId]!.value).not.toHaveProperty("value.scope");
      const invocation = Object.values(files[0]!.modules!).find((module) =>
        module.path.endsWith(`/${producerId}.bicep`),
      )!;
      expect(invocation.value).toMatchObject({
        value: { scope: { kind: "identifier", id: groupId } },
      });
    }
  });

  it("preserves conditional loops and indexed children inside an RG", () => {
    const source = new Stack("rg-loops");
    const group = new ResourceGroup(source, {
      name: "rg-loops",
      location: "eastus",
    });
    const enabled = source.parameters.add("enabled", "bool", {
      defaultValue: true,
    });
    const loop = new Loop(["first", "second"], {
      itemVariable: "widgetName",
      batchSize: 1,
    });
    const widgets = createLoopedResource(
      Resource,
      loop,
      group,
      {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: loop.item,
      },
      { condition: enabled },
    );
    new Resource(widgets.at(0), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const document = serialize(source);
    const [restored] = deserialize(JSON.stringify(document));
    const [restoredLoop] = getLoopedResources(restored!);

    expect(restoredLoop!.parent).toBeInstanceOf(ResourceGroup);
    expect(restoredLoop!.children).toHaveLength(1);
    expect(restoredLoop!.children[0]!.parent).toBe(restoredLoop);
    expect(serialize(restored!)).toEqual(document);
    const files = renderBicepFiles(serialize(restored!));
    expect(files).toEqual(renderBicepFiles(document));
    expect(files.map((file) => file.contents).join("\n")).toContain("parent: widget[0]");
    expect(files.map((file) => file.contents).join("\n")).toContain("@batchSize(1)");
  });

  it("throws on empty document", () => {
    const emptyDoc = JSON.stringify({ infras: [] });

    expect(() => deserialize(emptyDoc)).toThrow("Empty SerializationDocument");
  });

  it("works with existing sample JSON", () => {
    const samplePath = resolve(
      __dirname,
      "../../../../demo/samples/hello-storage/js/output/json/hello-storage.json",
    );
    const json = readFileSync(samplePath, "utf-8");

    const imported = deserialize(json);

    expect(imported.length).toBeGreaterThan(0);

    const allResources = collectResources(imported);
    const storageResource = allResources.find(
      (r) => r.type === "Microsoft.Storage/storageAccounts",
    );
    expect(storageResource).toBeDefined();
  });

  describe("resource dependency order", () => {
    function resourceNode(bicepIdentifier: string, type: string, value: Record<string, unknown>) {
      return {
        bicepIdentifier,
        type,
        apiVersion: "2024-01-01",
        existing: false,
        value: { kind: "object", value },
      };
    }

    it("resolves a parent declared after its child", () => {
      const wire = {
        infras: [
          {
            fileName: "out-of-order.bicep",
            resources: {
              child: resourceNode("child", "Contoso.Test/parents/children", {
                name: { kind: "string", value: "child" },
                parent: { kind: "identifier", id: "parent" },
              }),
              parent: resourceNode("parent", "Contoso.Test/parents", {
                name: { kind: "string", value: "parent" },
              }),
            },
          },
        ],
      };

      const resources = collectResources(deserialize(JSON.stringify(wire)));
      const parent = resources.find((resource) => resource.type === "Contoso.Test/parents");
      const child = resources.find((resource) => resource.type === "Contoso.Test/parents/children");

      expect(parent).toBeDefined();
      expect(child).toBeDefined();
      expect(child!.parent?.self).toBe(parent);
    });

    it("resolves an indexed loop parent declared after its child", () => {
      const wire = {
        infras: [
          {
            fileName: "out-of-order-indexed-parent.bicep",
            resources: {
              child: resourceNode("child", "Contoso.Test/parents/children", {
                name: { kind: "string", value: "child" },
                parent: {
                  kind: "array-access",
                  base: { kind: "identifier", id: "parents" },
                  index: { kind: "integer", value: "0" },
                  nullish: false,
                  fromEnd: false,
                },
              }),
              parents: {
                bicepIdentifier: "parents",
                type: "Contoso.Test/parents",
                apiVersion: "2024-01-01",
                existing: false,
                value: {
                  kind: "for-expression",
                  itemVariable: "item",
                  indexVariable: "index",
                  collection: { kind: "identifier", id: "parentNames" },
                  body: {
                    kind: "object",
                    value: { name: { kind: "identifier", id: "item" } },
                  },
                },
              },
            },
          },
        ],
      };

      const [stack] = deserialize(JSON.stringify(wire));
      const resources = collectResources([stack!]);
      const child = resources.find((resource) => resource.type === "Contoso.Test/parents/children");

      expect((child!.parent?.self as Resource).type).toBe("Contoso.Test/parents");
      const serialized = serialize(stack!);
      const serializedResources = serialized.infras[0]!.resources!;
      const parentIdentifier = Object.entries(serializedResources).find(
        ([, resource]) => resource.type === "Contoso.Test/parents",
      )![0];
      const childNode = Object.values(serializedResources).find(
        (resource) => resource.type === "Contoso.Test/parents/children",
      )!;
      expect(childNode.value).toMatchObject({
        kind: "object",
        value: {
          parent: {
            kind: "array-access",
            base: { kind: "identifier", id: parentIdentifier },
            index: { kind: "integer", value: "0" },
          },
        },
      });
    });

    it("resolves a property reference to a resource declared later", () => {
      const wire = {
        infras: [
          {
            fileName: "forward-property.bicep",
            resources: {
              consumer: resourceNode("consumer", "Contoso.Test/consumers", {
                name: { kind: "string", value: "consumer" },
                sourceId: {
                  kind: "property-access",
                  base: { kind: "identifier", id: "source" },
                  property: "id",
                  nullish: false,
                },
              }),
              source: resourceNode("source", "Contoso.Test/sources", {
                name: { kind: "string", value: "source" },
              }),
            },
          },
        ],
      };

      const resources = collectResources(deserialize(JSON.stringify(wire)));
      const consumer = resources.find((resource) => resource.type === "Contoso.Test/consumers")!;
      const source = resources.find((resource) => resource.type === "Contoso.Test/sources")!;
      const sourceId = (deref(consumer) as unknown as Record<string, unknown>).sourceId;

      expect(isExpression(sourceId)).toBe(true);
      expect(unwrapExpression(sourceId as never)).toMatchObject({
        kind: "property-access",
        base: { kind: "identifier", id: source },
        property: "id",
      });
    });

    it("resolves a dependsOn resource declared later", () => {
      const wire = {
        infras: [
          {
            fileName: "forward-dependency.bicep",
            resources: {
              consumer: resourceNode("consumer", "Contoso.Test/consumers", {
                name: { kind: "string", value: "consumer" },
                dependsOn: {
                  kind: "array",
                  items: [{ kind: "identifier", id: "source" }],
                },
              }),
              source: resourceNode("source", "Contoso.Test/sources", {
                name: { kind: "string", value: "source" },
              }),
            },
          },
        ],
      };

      const resources = collectResources(deserialize(JSON.stringify(wire)));
      const consumer = resources.find((resource) => resource.type === "Contoso.Test/consumers")!;
      const source = resources.find((resource) => resource.type === "Contoso.Test/sources")!;

      expect(consumer.dependsOn).toEqual([source]);
    });

    it("preserves an unknown identifier in a regular expression", () => {
      const wire = {
        infras: [
          {
            fileName: "loose-identifier.bicep",
            resources: {
              consumer: resourceNode("consumer", "Contoso.Test/consumers", {
                name: { kind: "identifier", id: "externalName" },
              }),
            },
          },
        ],
      };

      const [stack] = deserialize(JSON.stringify(wire));
      const serialized = serialize(stack!);

      expect(serialized.infras[0]!.resources!.consumer!.value).toMatchObject({
        kind: "object",
        value: { name: { kind: "identifier", id: "externalName" } },
      });
    });

    it("rejects a missing parent resource", () => {
      const wire = {
        infras: [
          {
            fileName: "missing-parent.bicep",
            resources: {
              child: resourceNode("child", "Contoso.Test/parents/children", {
                name: { kind: "string", value: "child" },
                parent: { kind: "identifier", id: "missingParent" },
              }),
            },
          },
        ],
      };

      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        'Resource "child" references unknown resource "missingParent" in "parent".',
      );
    });

    it.each([
      [
        "scope",
        { scope: { kind: "identifier", id: "missingScope" } },
        'Resource "consumer" references unknown resource "missingScope" in "scope".',
      ],
      [
        "dependsOn",
        {
          dependsOn: {
            kind: "array",
            items: [{ kind: "identifier", id: "missingDependency" }],
          },
        },
        'Resource "consumer" references unknown resource "missingDependency" in "dependsOn".',
      ],
    ])("rejects a missing %s resource", (_field, reference, message) => {
      const wire = {
        infras: [
          {
            fileName: "missing-reference.bicep",
            resources: {
              consumer: resourceNode("consumer", "Contoso.Test/consumers", {
                name: { kind: "string", value: "consumer" },
                ...reference,
              }),
            },
          },
        ],
      };

      expect(() => deserialize(JSON.stringify(wire))).toThrow(message);
    });

    it("rejects cyclic resource references", () => {
      const wire = {
        infras: [
          {
            fileName: "cycle.bicep",
            resources: {
              blocked: resourceNode("blocked", "Contoso.Test/resources", {
                name: { kind: "string", value: "blocked" },
                peer: { kind: "identifier", id: "first" },
              }),
              first: resourceNode("first", "Contoso.Test/resources", {
                name: { kind: "string", value: "first" },
                peer: { kind: "identifier", id: "second" },
              }),
              second: resourceNode("second", "Contoso.Test/resources", {
                name: { kind: "string", value: "second" },
                peer: { kind: "identifier", id: "first" },
              }),
            },
          },
        ],
      };

      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        'Resource dependency cycle detected: "first" -> "second" -> "first".',
      );
    });

    it("does not treat a shadowing loop variable as a self-reference", () => {
      const wire = {
        infras: [
          {
            fileName: "loop-shadowing.bicep",
            resources: {
              deployment: {
                bicepIdentifier: "deployment",
                type: "Contoso.Test/deployments",
                apiVersion: "2024-01-01",
                existing: false,
                value: {
                  kind: "for-expression",
                  itemVariable: "deployment",
                  collection: {
                    kind: "array",
                    items: [{ kind: "string", value: "one" }],
                  },
                  body: {
                    kind: "object",
                    value: {
                      name: {
                        kind: "identifier",
                        id: "deployment",
                      },
                    },
                  },
                },
              },
              consumer: resourceNode("consumer", "Contoso.Test/consumers", {
                name: { kind: "string", value: "consumer" },
                dependsOn: {
                  kind: "array",
                  items: [{ kind: "identifier", id: "deployment" }],
                },
              }),
            },
          },
        ],
      };

      expect(() => deserialize(JSON.stringify(wire))).not.toThrow();
    });

    it("rejects a self-referencing resource", () => {
      const wire = {
        infras: [
          {
            fileName: "self-cycle.bicep",
            resources: {
              self: resourceNode("self", "Contoso.Test/resources", {
                name: { kind: "string", value: "self" },
                peer: { kind: "identifier", id: "self" },
              }),
            },
          },
        ],
      };

      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        'Resource dependency cycle detected: "self" -> "self".',
      );
    });
  });

  describe("best-effort vs strict apiVersion match", () => {
    // Build a minimal serialized document containing a single
    // `Microsoft.Resources/resourceGroups` at an apiVersion that isn't
    // shipped by @azure/provisioning-core (which registers ResourceGroup at
    // 2024-03-01). Best-effort should resolve to the registered class;
    // strict should fall back to base `Resource`.
    const olderApiVersion = "1999-01-01";
    const wire = {
      infras: [
        {
          fileName: "canary.bicep",
          targetScope: "subscription",
          resources: {
            rg: {
              bicepIdentifier: "rg",
              type: "Microsoft.Resources/resourceGroups",
              apiVersion: olderApiVersion,
              existing: false,
              value: {
                kind: "object",
                value: {
                  name: { kind: "string", value: "rg-canary" },
                  location: { kind: "string", value: "eastus" },
                },
              },
            },
          },
        },
      ],
    };

    it("reconstructs an older-version resource as its registered subclass (default)", () => {
      const imported = deserialize(JSON.stringify(wire));
      const [rg] = collectResources(imported);
      expect(rg).toBeInstanceOf(ResourceGroup);
    });

    it("falls back to base Resource under strict:true", () => {
      const imported = deserialize(JSON.stringify(wire), { strict: true });
      const [rg] = collectResources(imported);
      expect(rg).not.toBeInstanceOf(ResourceGroup);
      // Still a Resource — just the base class.
      expect(rg!.type).toBe("Microsoft.Resources/resourceGroups");
      expect(rg!.apiVersion).toBe(olderApiVersion);
    });
  });

  describe("wire-form `if-condition` / `for-expression` on resource.value", () => {
    // The JSON wire schema wraps `value` in `if-condition` / `for-expression`
    // when a resource is guarded / looped (matching .NET's `ResourceDeclarationNode`).
    // Deserialize peels the wrapper into flat `condition` / `loop` domain
    // siblings; re-serialize reinstates the wrapper. These tests exercise
    // that round-trip so metadata survives a JSON → CDK → JSON pass.

    it("round-trips `if-condition` on `.value`", () => {
      const wire = {
        infras: [
          {
            fileName: "cond.bicep",
            resources: {
              storageAccount: {
                bicepIdentifier: "storageAccount",
                type: "Microsoft.Storage/storageAccounts",
                apiVersion: "2024-01-01",
                existing: false,
                value: {
                  kind: "if-condition",
                  condition: {
                    kind: "binary-operation",
                    operator: "==",
                    left: { kind: "identifier", id: "env" },
                    right: { kind: "string", value: "prod" },
                  },
                  body: {
                    kind: "object",
                    value: {
                      name: { kind: "string", value: "sa1" },
                      location: { kind: "string", value: "eastus" },
                    },
                  },
                },
              },
            },
          },
        ],
      };

      const imported = deserialize(JSON.stringify(wire));
      const doc = serialize(imported[0]!) as unknown as {
        infras: {
          resources: Record<
            string,
            {
              value: {
                kind: string;
                condition?: { kind: string };
                body?: { kind: string };
              };
            }
          >;
        }[];
      };
      const sa = doc.infras[0]!.resources["storageAccount"]!;

      expect(sa.value.kind).toBe("if-condition");
      expect(sa.value.condition!.kind).toBe("binary-operation");
      expect(sa.value.body!.kind).toBe("object");
    });

    it("round-trips `for-expression` on `.value`", () => {
      const wire = {
        infras: [
          {
            fileName: "loop.bicep",
            resources: {
              storageAccount: {
                bicepIdentifier: "storageAccount",
                type: "Microsoft.Storage/storageAccounts",
                apiVersion: "2024-01-01",
                existing: false,
                value: {
                  kind: "for-expression",
                  itemVariable: "item",
                  collection: { kind: "identifier", id: "regions" },
                  body: {
                    kind: "object",
                    value: {
                      name: { kind: "identifier", id: "item" },
                      location: { kind: "identifier", id: "item" },
                    },
                  },
                },
              },
            },
          },
        ],
      };

      const imported = deserialize(JSON.stringify(wire));
      const doc = serialize(imported[0]!) as unknown as {
        infras: {
          resources: Record<
            string,
            {
              value: {
                kind: string;
                itemVariable?: string;
                collection?: { kind: string };
                body?: { kind: string };
              };
            }
          >;
        }[];
      };
      const sa = doc.infras[0]!.resources["storageAccount"]!;

      expect(sa.value.kind).toBe("for-expression");
      expect(sa.value.itemVariable).toBe("item");
      expect(sa.value.collection!.kind).toBe("identifier");
      expect(sa.value.body!.kind).toBe("object");
    });

    it("round-trips nested `for-expression → if-condition`", () => {
      const wire = {
        infras: [
          {
            fileName: "both.bicep",
            resources: {
              storageAccount: {
                bicepIdentifier: "storageAccount",
                type: "Microsoft.Storage/storageAccounts",
                apiVersion: "2024-01-01",
                existing: false,
                value: {
                  kind: "for-expression",
                  itemVariable: "item",
                  collection: { kind: "identifier", id: "regions" },
                  body: {
                    kind: "if-condition",
                    condition: {
                      kind: "binary-operation",
                      operator: "!=",
                      left: { kind: "identifier", id: "item" },
                      right: { kind: "string", value: "canary" },
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
            },
          },
        ],
      };

      const imported = deserialize(JSON.stringify(wire));
      const doc = serialize(imported[0]!) as unknown as {
        infras: {
          resources: Record<
            string,
            {
              value: {
                kind: string;
                itemVariable?: string;
                body?: { kind: string; condition?: { kind: string } };
              };
            }
          >;
        }[];
      };
      const sa = doc.infras[0]!.resources["storageAccount"]!;

      expect(sa.value.kind).toBe("for-expression");
      expect(sa.value.itemVariable).toBe("item");
      expect(sa.value.body!.kind).toBe("if-condition");
      expect(sa.value.body!.condition!.kind).toBe("binary-operation");
    });
  });

  describe("looped element reference `sym[i].prop`", () => {
    // A value that array-accesses a looped declaration (e.g. an output
    // `backups.at(0).id`) serializes as `identifier(loopedSym)[idx].prop`.
    // On deserialize the base identifier resolves to the `LoopedResource`
    // handle; the array-access branch must carry that handle back as the
    // identifier id so re-serialize maps it to the resource symbol — a naive
    // `String(handle)` would collapse to "[object Object]".
    it("round-trips an output referencing `looped.at(0).id`", () => {
      const source = new Stack("source", {
        targetScope: "resourceGroup",
        namingPolicy: namingRequiredPolicy,
      });
      const regions = new Loop<string>(["eastus", "westus"]);
      const backups = createLoopedResource(Resource, regions, source, {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name: regions.item,
      } as never);
      source.outputs.add(
        "firstBackupId",
        "string",
        (backups.at(0) as unknown as { id: unknown }).id as never,
      );

      const json = JSON.stringify(serialize([source]));
      Stack.clearRoots();

      const reserialized = JSON.stringify(serialize(deserialize(json)));

      expect(reserialized).not.toContain("[object Object]");
      expect(reserialized).toBe(json);
    });
  });

  describe("invalid wrapper nesting on resource.value", () => {
    // Valid shapes: object | if(object) | for(object) | for(if(object)).
    // Anything else is rejected on deserialize.

    function wireWithResourceValue(value: unknown) {
      return {
        infras: [
          {
            fileName: "bad.bicep",
            resources: {
              storageAccount: {
                bicepIdentifier: "storageAccount",
                type: "Microsoft.Storage/storageAccounts",
                apiVersion: "2024-01-01",
                existing: false,
                value,
              },
            },
          },
        ],
      };
    }

    const objectBody = {
      kind: "object",
      value: { name: { kind: "string", value: "sa1" } },
    };
    const trueLiteral = { kind: "boolean", value: true };
    const regionsIdent = { kind: "identifier", id: "regions" };

    it("rejects `if-condition` wrapping a `for-expression`", () => {
      const wire = wireWithResourceValue({
        kind: "if-condition",
        condition: trueLiteral,
        body: {
          kind: "for-expression",
          itemVariable: "item",
          collection: regionsIdent,
          body: objectBody,
        },
      });
      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        /Invalid wire shape for resource "storageAccount"/,
      );
    });

    it("rejects nested `for-expression` inside a `for-expression`", () => {
      const wire = wireWithResourceValue({
        kind: "for-expression",
        itemVariable: "outer",
        collection: regionsIdent,
        body: {
          kind: "for-expression",
          itemVariable: "inner",
          collection: regionsIdent,
          body: objectBody,
        },
      });
      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        /Invalid wire shape for resource "storageAccount"/,
      );
    });

    it("rejects nested `if-condition` inside an `if-condition`", () => {
      const wire = wireWithResourceValue({
        kind: "if-condition",
        condition: trueLiteral,
        body: {
          kind: "if-condition",
          condition: trueLiteral,
          body: objectBody,
        },
      });
      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        /Invalid wire shape for resource "storageAccount"/,
      );
    });

    it("rejects a bare wrapper whose body is not an object", () => {
      const wire = wireWithResourceValue({
        kind: "for-expression",
        itemVariable: "item",
        collection: regionsIdent,
        body: { kind: "string", value: "not an object" },
      });
      expect(() => deserialize(JSON.stringify(wire))).toThrow(
        /Invalid wire shape for resource "storageAccount"/,
      );
    });
  });
});

// -- helpers ----------------------------------------------------------------

function collectResources(stacks: readonly Stack[]): Resource[] {
  // `getResources()` returns the scalar resources directly. These tests only
  // build scalar resources, so this is exactly what we want.
  return stacks.flatMap((stack) => stack.getResources());
}
