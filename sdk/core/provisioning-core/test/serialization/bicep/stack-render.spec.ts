// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ProvisioningComponent,
  Resource,
  ResourceGroup,
  Stack,
  fn,
} from "@azure/provisioning-core";
import * as json from "../../../src//serialization/index.js";
import * as publicCore from "@azure/provisioning-core";
import { renderBicepFiles } from "../../../src/internal.js";
import * as bicep from "../../../src/internal.js";
import { createLoopedResource, Loop } from "../../../src/internal-loop.js";
import { validateRenderedBicepFiles } from "../../../scripts/lib/bicep-validator.js";

describe("direct Stack AST generation", () => {
  beforeEach(() => Stack.clearRoots());

  it("matches document rendering without calling JSON serialization or mutating the Stack", () => {
    const stack = new Stack("direct");
    const location = stack.parameters.add("location", "string", {
      defaultValue: "eastus",
    });
    const label = stack.variables.add("label", fn.concat("value-", location));
    const group = new ResourceGroup(stack, { name: "rg-direct", location });
    const component = new ProvisioningComponent(group);
    const source = new Resource(component, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "source",
      tags: { label },
    });
    new Resource(source, {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    const second = new Resource(component, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "second",
      tags: { source: source.id },
    });
    stack.outputs.add("secondId", "string", second.id);
    const document = json.serialize(stack);
    const original = JSON.stringify(document);
    const roots = [...Stack.roots];
    const expected = renderBicepFiles(stack);
    const spy = vi.spyOn(json, "serialize").mockImplementation(() => {
      throw new Error("Bicep must not call JSON serialization");
    });
    try {
      expect(renderBicepFiles(stack)).toEqual(expected);
      expect(renderBicepFiles(stack)).toEqual(expected);
      expect(spy).not.toHaveBeenCalled();
      expect(Stack.roots).toEqual(roots);
    } finally {
      spy.mockRestore();
    }
    expect(JSON.stringify(json.serialize(stack))).toBe(original);
  });

  it("preserves loops, indexed parents, and existing lookup scopes", () => {
    const stack = new Stack("indexed");
    const group = new ResourceGroup(stack, {
      name: "rg-indexed",
      location: "eastus",
    });
    const loop = new Loop(["first", "second"], { indexVariable: "index" });
    const parents = createLoopedResource(Resource, loop, group, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: loop.item,
    });
    new Resource(parents.at(0), {
      type: "Contoso.Test/widgets/children",
      apiVersion: "2024-01-01",
      name: "child",
    });
    new Resource(group, {
      existing: true,
      type: "Contoso.Test/external",
      apiVersion: "2024-01-01",
      name: "external",
      scope: fn.resourceGroup("external"),
    });
    expect(renderBicepFiles(stack)).toEqual(
      renderBicepFiles(json.deserialize(JSON.stringify(json.serialize(stack)))),
    );
  });

  it("keeps independent Stack symbol namespaces and rejects invalid inputs", () => {
    const stacks = ["first", "second"].map((name) => {
      const stack = new Stack(name, { targetScope: "resourceGroup" });
      new Resource(stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name,
      });

      return stack;
    });
    expect(renderBicepFiles(stacks)).toEqual(
      renderBicepFiles(json.deserialize(JSON.stringify(json.serialize(stacks)))),
    );
    expect(renderBicepFiles([])).toEqual([]);
    expect(() => renderBicepFiles([stacks[0]!, stacks[0]!])).toThrow("Duplicate Bicep file path");
    expect(() => renderBicepFiles(json.serialize(stacks) as never)).toThrow(
      "requires authored Stacks",
    );
  });

  it("does not expose AST document generation APIs", () => {
    expect(typeof bicep.renderBicepFiles).toBe("function");
    expect("renderBicepFiles" in publicCore).toBe(false);
    expect("renderBicepFiles" in json).toBe(false);
    expect("renderBicepDocument" in bicep).toBe(false);
    expect("renderBicepFile" in bicep).toBe(false);
    expect("finalizeFileLayout" in bicep).toBe(false);
  });

  it.each(["resourceGroup", "subscription", "managementGroup", "tenant"] as const)(
    "declares %s scope for empty and lookup-only files",
    (targetScope) => {
      const stack = new Stack("scope", { targetScope });
      const expectedHeader = `targetScope = '${targetScope}'\n`;
      expect(renderBicepFiles(stack)[0]!.contents).toBe(expectedHeader);
      const lookup = new Resource(stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: "widget",
        existing: true,
      });
      stack.outputs.add("id", "string", lookup.id);
      expect(renderBicepFiles(stack)[0]!.contents.startsWith(expectedHeader)).toBe(true);
    },
  );

  it.each([1, 2])(
    "declares resource-group scope when lowering %s primary resource trees",
    (count) => {
      const stack = new Stack("standalone-rg", {
        targetScope: "resourceGroup",
      });
      for (let index = 0; index < count; index++) {
        new Resource(stack, {
          type: "Contoso.Test/widgets",
          apiVersion: "2024-01-01",
          name: `widget${index}`,
        });
      }
      const files = renderBicepFiles(stack);
      expect(files).toHaveLength(1);
      expect(files[0]!.contents).toMatch(/^targetScope = 'resourceGroup'\n\nresource /);
    },
  );

  it.each([1, 2])("declares resource-group scope for %s existing-root trees", (count) => {
    const stack = new Stack("existing-roots", {
      targetScope: "resourceGroup",
    });
    for (let index = 0; index < count; index++) {
      const parent = new Resource(stack, {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: `widget${index}`,
        existing: true,
      });
      new Resource(parent, {
        type: "Contoso.Test/widgets/children",
        apiVersion: "2024-01-01",
        name: "child",
      });
    }
    const files = renderBicepFiles(stack);
    expect(files).toHaveLength(1);
    expect(files[0]!.contents).toMatch(/^targetScope = 'resourceGroup'\n/);
  });

  it.each([false, true])(
    "declares resource-group scope for a conditional existing root (child: %s)",
    (includeChild) => {
      const stack = new Stack("conditional-root", {
        targetScope: "resourceGroup",
      });
      const parent = new Resource(
        stack,
        {
          type: "Contoso.Test/widgets",
          apiVersion: "2024-01-01",
          name: "widget",
          existing: true,
        },
        { condition: stack.parameters.add("includeLookup", "bool") },
      );
      if (includeChild) {
        new Resource(parent, {
          type: "Contoso.Test/widgets/children",
          apiVersion: "2024-01-01",
          name: "child",
        });
      }
      expect(renderBicepFiles(stack)[0]!.contents).toMatch(/^targetScope = 'resourceGroup'\n/);
    },
  );

  it("does not expose sample-owned parameter file helpers", () => {
    expect("createBicepParameterFile" in bicep).toBe(false);
    expect("renderBicepParameterFile" in bicep).toBe(false);
    expect("bicepRef" in bicep).toBe(false);
  });

  it("compiles separate modules for primary resources in an authored RG", () => {
    const stack = new Stack("compiled-direct");
    const group = new ResourceGroup(stack, {
      name: "rg-compiled-direct",
      location: "eastus",
    });
    for (const name of ["exampledirectfirst", "exampledirectsecond"]) {
      new Resource(group, {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name,
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
      });
    }
    const files = renderBicepFiles(stack);
    expect(files).toHaveLength(3);
    validateRenderedBicepFiles(files);
  }, 30_000);

  it.each(["managementGroup", "tenant"] as const)(
    "merges inherited trees into a standalone file at the Stack's %s scope",
    (targetScope) => {
      for (const count of [1, 2]) {
        const stack = new Stack(`standalone-${targetScope}-${count}`, {
          targetScope,
        });
        for (let index = 0; index < count; index++) {
          new Resource(
            stack,
            targetScope === "managementGroup"
              ? {
                  type: "Microsoft.Authorization/policyDefinitions",
                  apiVersion: "2023-04-01",
                  name: `policy${index}`,
                  properties: {
                    policyType: "Custom",
                    mode: "All",
                    policyRule: {
                      if: {
                        field: "type",
                        equals: "Microsoft.Storage/storageAccounts",
                      },
                      then: { effect: "audit" },
                    },
                  },
                }
              : {
                  type: "Microsoft.Management/managementGroups",
                  apiVersion: "2024-02-01-preview",
                  name: `group${index}`,
                  properties: { displayName: `Group ${index}` },
                },
          );
        }
        const files = renderBicepFiles(stack);
        expect(files).toHaveLength(1);
        expect(files[0]!.contents).toContain(`targetScope = '${targetScope}'`);
        expect(renderBicepFiles(json.deserialize(JSON.stringify(json.serialize(stack))))).toEqual(
          files,
        );
        validateRenderedBicepFiles(files);
      }
    },
    30_000,
  );
});
