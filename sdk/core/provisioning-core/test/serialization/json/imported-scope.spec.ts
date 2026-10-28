// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import type { ProvisioningComponent } from "../../../src/index.js";
import {
  Resource,
  Stack,
  fn,
  type ExpressionOrValue,
  type TargetScope,
} from "../../../src/index.js";
import { renderBicepFiles } from "../../../src/internal.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";
import type {
  ExpressionNode,
  ResourceDeclarationNode,
  SerializationDocument,
} from "../../../src/serialization/ast/index.js";
import { getResourceBody } from "../../../src/serialization/ast/resource-utils.js";
import { getResourceScope } from "../../../src/constructs/resource/resource-relationships.js";
import { getLoopedResources } from "../../../src/internal-loop.js";
import { validateRenderedBicepFiles } from "../../scripts/test/bicep-validator.js";

// .NET JSON shape verified against Azure/azure-sdk-for-net#57322 at 565c3ce2.
const roleType = "Microsoft.Authorization/roleAssignments";
const roleApi = "2022-04-01";
const tenant: ExpressionNode = {
  kind: "function-call",
  target: "tenant",
  args: [],
};

class RegisteredAssignment extends Resource {
  static resourceType = roleType;
  static apiVersion = roleApi;
  static {
    this.register();
  }

  constructor(
    parent: ProvisioningComponent,
    props: {
      name: ExpressionOrValue<string>;
      properties?: unknown;
    },
  ) {
    super(parent, { ...props, type: roleType, apiVersion: roleApi });
  }
}

function assignment(scope: ExpressionNode, type = roleType): ResourceDeclarationNode {
  return {
    bicepIdentifier: "assignment",
    type,
    apiVersion: roleApi,
    existing: false,
    value: {
      kind: "object",
      value: {
        name: { kind: "string", value: "00000000-0000-0000-0000-000000000002" },
        scope,
        properties: {
          kind: "object",
          value: {
            principalId: {
              kind: "string",
              value: "00000000-0000-0000-0000-000000000001",
            },
            principalType: { kind: "string", value: "ServicePrincipal" },
            roleDefinitionId: {
              kind: "string",
              value:
                "/providers/Microsoft.Authorization/roleDefinitions/acdd72a7-3385-48ef-bd42-f606fba81ae7",
            },
          },
        },
      },
    },
  };
}

function document(
  scope: ExpressionNode,
  targetScope: TargetScope = "subscription",
  type = roleType,
): SerializationDocument {
  return {
    infras: [
      {
        fileName: "imported.bicep",
        targetScope,
        resources: { assignment: assignment(scope, type) },
      },
    ],
  };
}

function restored(input: SerializationDocument) {
  const [stack] = deserialize(JSON.stringify(input));
  if (stack === undefined) throw new Error("Expected a restored Stack");
  return stack;
}

function emittedAssignment(stack: Stack): ResourceDeclarationNode {
  const resource = Object.values(serialize(stack).infras[0]!.resources!).find(
    (entry) => entry.type === roleType || entry.type === "Contoso.Import/assignments",
  );
  if (resource === undefined) {
    throw new Error("Expected assignment declaration");
  }
  return resource;
}

describe("imported resource scopes", () => {
  beforeEach(() => Stack.clearRoots());

  it.each<ExpressionNode>([
    { kind: "string", value: "rg-example" },
    { kind: "integer", value: "0" },
    { kind: "boolean", value: false },
    { kind: "null", value: null },
    { kind: "array", items: [] },
    { kind: "object", value: {} },
  ])("rejects a standalone $kind scope on a new resource before construction", (scope) => {
    expect(() => restored(document(scope))).toThrow(
      `Resource "assignment" has an invalid "scope" value: expected an expression, received "${scope.kind}".`,
    );
    expect(Stack.roots[0]!.children).toEqual([]);
  });

  it.each(["subscription", "resourceGroup", "managementGroup"] as const)(
    "round-trips .NET tenant scope without relocating a %s deployment",
    (targetScope) => {
      const stack = restored(document(tenant, targetScope));
      const resource = stack.getResources()[0]!;
      expect(resource).toBeInstanceOf(RegisteredAssignment);
      expect(resource.parent).toBe(stack);
      expect(stack.targetScope).toBe(targetScope);
      expect(getResourceBody(emittedAssignment(stack).value).value.scope).toEqual(tenant);
      const canonical = serialize(stack);
      expect(serialize(deserialize(JSON.stringify(canonical)))).toEqual(canonical);
      const files = renderBicepFiles(stack);
      expect(files).toHaveLength(1);
      expect(files[0]!.contents).toContain("scope: tenant()");
      expect(files[0]!.contents).not.toContain("module ");
      expect(files[0]!.contents).toContain(`targetScope = '${targetScope}'`);
      validateRenderedBicepFiles(files);
    },
    30_000,
  );

  it("preserves scope for unregistered resource classes", () => {
    const stack = restored(document(tenant, "subscription", "Contoso.Import/assignments"));
    expect(stack.getResources()[0]!.constructor).toBe(Resource);
    expect(getResourceBody(emittedAssignment(stack).value).value.scope).toEqual(tenant);
    expect(renderBicepFiles(stack)[0]!.contents).toContain("scope: tenant()");
  });

  it.each(["subscription", "resourceGroup"] as const)(
    "round-trips the scope-hoisted management group from issue #302 in a %s deployment",
    (targetScope) => {
      const input: SerializationDocument = {
        infras: [
          {
            fileName: "hoisted-management-group.bicep",
            targetScope,
            resources: {
              mg: {
                bicepIdentifier: "mg",
                type: "Microsoft.Management/managementGroups",
                apiVersion: "2024-02-01-preview",
                existing: false,
                value: {
                  kind: "object",
                  value: {
                    name: { kind: "string", value: "mg-platform" },
                    scope: tenant,
                    properties: { kind: "object", value: {} },
                  },
                },
              },
            },
          },
        ],
      };
      const stack = restored(input);
      const resources = stack.getResources();
      expect(resources).toHaveLength(1);
      expect(resources[0]!.constructor).toBe(Resource);
      expect(resources[0]!.parent).toBe(stack);
      expect(stack.targetScope).toBe(targetScope);

      const canonical = serialize(stack);
      const declarations = Object.values(canonical.infras[0]!.resources!);
      expect(declarations).toHaveLength(1);
      expect(declarations[0]).toMatchObject({
        type: "Microsoft.Management/managementGroups",
        apiVersion: "2024-02-01-preview",
        existing: false,
      });
      const body = getResourceBody(declarations[0]!.value).value;
      expect(body.scope).toEqual(tenant);
      expect(body.name).toEqual({ kind: "string", value: "mg-platform" });
      expect(body.properties).toEqual({ kind: "object", value: {} });
      expect(body.parent).toBeUndefined();

      const roundtripped = deserialize(JSON.stringify(canonical));
      expect(serialize(roundtripped)).toEqual(canonical);
      const files = renderBicepFiles(stack);
      expect(renderBicepFiles(roundtripped)).toEqual(files);
      expect(files).toHaveLength(1);
      expect(files[0]!.contents).toContain(`targetScope = '${targetScope}'`);
      expect(files[0]!.contents).toContain(
        "'Microsoft.Management/managementGroups@2024-02-01-preview'",
      );
      expect(files[0]!.contents).toContain("scope: tenant()");
      expect(files[0]!.contents).not.toContain("module ");
      validateRenderedBicepFiles(files);
    },
    30_000,
  );

  it.each(["tenant", "managementGroup", "subscription", "resourceGroup"] as const)(
    "normalizes an unambiguous current %s scope to the existing Stack",
    (targetScope) => {
      const stack = restored(
        document({ kind: "function-call", target: targetScope, args: [] }, targetScope),
      );
      const resource = stack.getResources()[0]!;
      expect(resource.parent).toBe(stack);
      expect(getResourceScope(resource)).toBeUndefined();
      expect(getResourceBody(emittedAssignment(stack).value).value.scope).toBeUndefined();
    },
  );

  it("does not guess that a named destination is the current Stack", () => {
    const scope: ExpressionNode = {
      kind: "function-call",
      target: "subscription",
      args: [{ kind: "string", value: "00000000-0000-0000-0000-000000000001" }],
    };
    const stack = restored(document(scope));
    expect(getResourceBody(emittedAssignment(stack).value).value.scope).toEqual(scope);
    expect(renderBicepFiles(stack)).toHaveLength(1);
    expect(renderBicepFiles(stack)[0]!.contents).not.toContain("module ");
  });

  it("preserves unknown scope functions and their parameter/variable bindings without placement analysis", () => {
    const scope: ExpressionNode = {
      kind: "function-call",
      target: "customScope",
      args: [{ kind: "identifier", id: "destination" }],
    };
    const input: SerializationDocument = {
      infras: [
        {
          ...document(scope).infras[0]!,
          parameters: {
            destination: {
              bicepIdentifier: "destination",
              valueType: { kind: "primitive-type", name: "string" },
            },
          },
        },
      ],
    };
    const stack = restored(input);
    expect(getResourceBody(emittedAssignment(stack).value).value.scope).toEqual(scope);
    const files = renderBicepFiles(stack);
    expect(files).toHaveLength(1);
    expect(files[0]!.contents).toContain("param destination string");
    expect(files[0]!.contents).toContain("scope: customScope(destination)");
  });

  it("keeps subscription-dependent expressions in their original evaluation context", () => {
    const input = document(tenant);
    getResourceBody(input.infras[0]!.resources!.assignment!.value).value.name = {
      kind: "function-call",
      target: "guid",
      args: [
        {
          kind: "property-access",
          base: { kind: "function-call", target: "subscription", args: [] },
          property: "subscriptionId",
          nullish: false,
        },
        { kind: "string", value: "assignment" },
      ],
    };
    const files = renderBicepFiles(restored(input));
    expect(files).toHaveLength(1);
    expect(files[0]!.contents).toContain("targetScope = 'subscription'");
    expect(files[0]!.contents).toContain("guid(subscription().subscriptionId, 'assignment')");
    expect(files[0]!.contents).toContain("scope: tenant()");
    validateRenderedBicepFiles(files);
  }, 30_000);

  it("preserves unresolved identifiers instead of guessing a parent", () => {
    const scope: ExpressionNode = { kind: "identifier", id: "externalScope" };
    const stack = restored(document(scope));
    expect(stack.getResources()[0]!.parent).toBe(stack);
    expect(getResourceBody(emittedAssignment(stack).value).value.scope).toEqual(scope);
    expect(renderBicepFiles(stack)[0]!.contents).toContain("scope: externalScope");
  });

  it("binds resource references inside preserved scopes to newly allocated symbols", () => {
    const input = document(
      {
        kind: "function-call",
        target: "customScope",
        args: [
          {
            kind: "property-access",
            base: { kind: "identifier", id: "source" },
            property: "id",
            nullish: false,
          },
        ],
      },
      "resourceGroup",
    );
    input.infras[0]!.resources!.source = {
      bicepIdentifier: "source",
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      existing: true,
      value: {
        kind: "object",
        value: { name: { kind: "string", value: "stexisting" } },
      },
    };
    const stack = restored(input);
    const canonical = serialize(stack);
    const source = Object.values(canonical.infras[0]!.resources!).find(
      (resource) => resource.existing,
    )!;
    expect(getResourceBody(emittedAssignment(stack).value).value.scope).toMatchObject({
      args: [{ base: { id: source.bicepIdentifier } }],
    });
    expect(serialize(deserialize(JSON.stringify(canonical)))).toEqual(canonical);
    expect(renderBicepFiles(stack)[0]!.contents).toContain("scope: customScope(storageAccount.id)");
  });

  it("gives preserved scope priority over an inferred extension target", () => {
    const input = document(tenant, "resourceGroup");
    input.infras[0]!.resources!.target = {
      bicepIdentifier: "target",
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      existing: true,
      value: {
        kind: "object",
        value: { name: { kind: "string", value: "stexisting" } },
      },
    };
    getResourceBody(input.infras[0]!.resources!.assignment!.value).value.parent = {
      kind: "identifier",
      id: "target",
    };
    const files = renderBicepFiles(restored(input));
    expect(files[0]!.contents).toContain("scope: tenant()");
    expect(files[0]!.contents).not.toContain("scope: storageAccount");
    expect(files[0]!.contents).not.toContain("parent: storageAccount");
    validateRenderedBicepFiles(files);
  }, 30_000);

  it("does not add explicit scope authoring for new resources", () => {
    const stack = new Stack("authored");
    const resource = new Resource(stack, {
      type: roleType,
      apiVersion: roleApi,
      name: "assignment",
      scope: fn.tenant(),
    });
    expect(getResourceScope(resource)).toBeUndefined();
    expect(getResourceBody(emittedAssignment(stack).value).value.scope).toBeUndefined();
  });

  it("keeps preserved scope on a declaration placed in a known RG module", () => {
    const input = document(tenant);
    const resources = input.infras[0]!.resources!;
    resources.group = {
      bicepIdentifier: "group",
      type: "Microsoft.Resources/resourceGroups",
      apiVersion: "2024-03-01",
      existing: true,
      value: {
        kind: "object",
        value: { name: { kind: "string", value: "rg-existing" } },
      },
    };
    getResourceBody(resources.assignment!.value).value.parent = {
      kind: "identifier",
      id: "group",
    };
    const files = renderBicepFiles(restored(input));
    expect(files).toHaveLength(2);
    expect(files[0]!.contents).toContain("scope: rg");
    expect(files[1]!.contents).toContain("targetScope = 'resourceGroup'");
    expect(files[1]!.contents).toContain("scope: tenant()");
    validateRenderedBicepFiles(files);
  }, 30_000);

  it("does not split current-context peers just because a preserved scope is present", () => {
    const input = document(tenant, "resourceGroup");
    input.infras[0]!.resources!.peer = {
      bicepIdentifier: "peer",
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      existing: true,
      value: {
        kind: "object",
        value: { name: { kind: "string", value: "stexisting" } },
      },
    };
    getResourceBody(input.infras[0]!.resources!.assignment!.value).value.name = {
      kind: "function-call",
      target: "guid",
      args: [
        {
          kind: "property-access",
          base: { kind: "identifier", id: "peer" },
          property: "id",
          nullish: false,
        },
      ],
    };
    const files = renderBicepFiles(restored(input));
    expect(files).toHaveLength(1);
    expect(files[0]!.contents).toContain("guid(storageAccount.id)");
    expect(files[0]!.contents).not.toContain("module ");
    validateRenderedBicepFiles(files);
  }, 30_000);

  it("reconstructs resource and RG references as normal parents", () => {
    for (const type of [
      "Microsoft.Storage/storageAccounts",
      "Microsoft.Resources/resourceGroups",
    ]) {
      const input = document({ kind: "identifier", id: "target" });
      input.infras[0]!.resources!.target = {
        bicepIdentifier: "target",
        type,
        apiVersion: "2024-01-01",
        existing: true,
        value: {
          kind: "object",
          value: { name: { kind: "string", value: "existing" } },
        },
      };
      const stack = restored(input);
      const resource = stack.getResources(RegisteredAssignment)[0]!;
      expect(resource.parent?.self).toBe(stack.getResources().find((entry) => entry.type === type));
      expect(getResourceScope(resource)).toBeUndefined();
      const text = renderBicepFiles(stack)
        .map((file) => file.contents)
        .join("\n");
      expect(text).toContain(
        type === "Microsoft.Resources/resourceGroups" ? "scope: rg" : "scope: storageAccount",
      );
    }
  });

  it("reconstructs an indexed resource scope without retaining a redundant explicit scope", () => {
    const input = document(
      {
        kind: "array-access",
        base: { kind: "identifier", id: "targets" },
        index: { kind: "integer", value: "0" },
        nullish: false,
        fromEnd: false,
      },
      "resourceGroup",
    );
    input.infras[0]!.resources!.targets = {
      bicepIdentifier: "targets",
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      existing: true,
      value: {
        kind: "for-expression",
        itemVariable: "name",
        collection: {
          kind: "array",
          items: [{ kind: "string", value: "stexisting" }],
        },
        body: {
          kind: "object",
          value: { name: { kind: "identifier", id: "name" } },
        },
      },
    };
    const stack = restored(input);
    expect(stack.getResources(RegisteredAssignment)[0]!.parent).toBe(getLoopedResources(stack)[0]);
    const body = getResourceBody(emittedAssignment(stack).value);
    expect(body.value.parent).toMatchObject({
      kind: "array-access",
      index: { value: "0" },
    });
    expect(body.value.scope).toBeUndefined();
    const files = renderBicepFiles(stack);
    expect(files[0]!.contents).toContain("scope: storageAccount[0]");
    validateRenderedBicepFiles(files);
  }, 30_000);

  it.each(["conditional", "looped"] as const)(
    "preserves explicit scope beneath %s declaration wrappers",
    (kind) => {
      const input = document(tenant);
      const resource = input.infras[0]!.resources!.assignment!;
      input.infras[0]!.resources!.assignment = {
        ...resource,
        value:
          kind === "conditional"
            ? {
                kind: "if-condition",
                condition: { kind: "boolean", value: true },
                body: resource.value,
              }
            : {
                kind: "for-expression",
                itemVariable: "item",
                collection: {
                  kind: "array",
                  items: [{ kind: "string", value: "one" }],
                },
                body: resource.value,
              },
      };
      const stack = restored(input);
      expect(getResourceBody(emittedAssignment(stack).value).value.scope).toEqual(tenant);
      const canonical = serialize(stack);
      expect(serialize(deserialize(JSON.stringify(canonical)))).toEqual(canonical);
      expect(renderBicepFiles(stack)[0]!.contents).toContain("scope: tenant()");
    },
  );
});
