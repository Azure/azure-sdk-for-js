// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import {
  ProvisioningComponent,
  Resource,
  ResourceGroup,
  Stack,
  fn,
} from "@azure/provisioning-core";
import { collectResourceDeclarations } from "../../../src/constructs/resource/resource-query.js";
import { createSymbolMap } from "../../../src/serialization/symbol-map.js";
import { buildStackDeclarations } from "../../../src/serialization/ast/declaration-builder.js";
import { renderBicepFiles } from "../../../src/internal.js";
import { collectAuthoredResourceContexts } from "../../../src/serialization/bicep/file-layout/authored-context.js";
import { planDeploymentFiles } from "../../../src/serialization/bicep/file-layout/deployment-planning.js";
import { toInfraNode } from "../../../src/serialization/bicep/file-layout/build-bicep-files.js";
import {
  BicepNamer,
  RESOURCE_NAME_OVERRIDES,
} from "../../../src/serialization/bicep/file-layout/bicep-namer.js";
import {
  prepareDeploymentFiles,
  type BicepAst,
} from "../../../src/serialization/bicep/file-layout/file-preparation.js";
import { wireDeploymentFiles } from "../../../src/serialization/bicep/file-layout/reference-wiring.js";
import { storage, subscriptionStack } from "./support.js";
import { renderBicepFile } from "../../../src/serialization/bicep/render.js";
import { validateRenderedBicepFiles } from "../../../scripts/lib/bicep-validator.js";

function buildStackFixture(stack: Stack) {
  const resources = collectResourceDeclarations(stack);
  const symbols = createSymbolMap(resources, stack, RESOURCE_NAME_OVERRIDES);
  const declarations = buildStackDeclarations(stack, resources, symbols);
  const stackAst: BicepAst = {
    targetScope: stack.targetScope,
    resources: new Map(Object.entries(declarations.resources ?? {})),
    parameters: new Map(Object.entries(declarations.parameters ?? {})),
    variables: new Map(Object.entries(declarations.variables ?? {})),
    outputs: new Map(Object.entries(declarations.outputs ?? {})),
    modules: new Map(),
  };
  const resourceContexts = collectAuthoredResourceContexts(resources, symbols);
  return { stackAst, resourceContexts, namer: new BicepNamer(stackAst) };
}

function prepare(stack: Stack) {
  const { stackAst, resourceContexts, namer } = buildStackFixture(stack);
  const layout = planDeploymentFiles(stackAst, resourceContexts);
  const prepared = prepareDeploymentFiles(stack.name, stackAst, resourceContexts, layout, namer);
  return { layout, prepared };
}

describe("prepared file metadata and AST contents", () => {
  beforeEach(() => Stack.clearRoots());

  it("keeps output paths on prepared entry and module files, not on their ASTs", () => {
    const { stack, group } = subscriptionStack("prepared-files");
    storage(group, "preparedstorage");
    const { prepared } = prepare(stack);
    expect(prepared.stackAst).not.toHaveProperty("fileName");
    expect(prepared.entry.fileName).toBe("prepared-files.bicep");
    expect(prepared.entry.ast).not.toHaveProperty("fileName");
    expect(prepared.modules).toHaveLength(1);
    const module = prepared.modules[0]!;
    expect(module).not.toHaveProperty("plan");
    expect(prepared).not.toHaveProperty("layout");
    expect(prepared).not.toHaveProperty("pureExistingResources");
    expect([...prepared.entryAssignedResources]).toEqual(["rg"]);
    expect([...module.assignedResources]).toEqual(["storageAccount"]);
    expect(module.moduleScope).toEqual({
      kind: "identifier",
      id: "rg",
    });
    expect(module.file.fileName).toBe("prepared-files/storageAccount.bicep");
    expect(module.file.ast).not.toHaveProperty("fileName");
    expect(Object.keys(toInfraNode(prepared.entry).resources!)).toEqual(["rg"]);
    expect(toInfraNode(module.file)).toMatchObject({
      fileName: module.file.fileName,
      targetScope: "resourceGroup",
      resources: { storageAccount: { bicepIdentifier: "storageAccount" } },
    });
    expect(prepared.stackAst.resources.size).toBe(2);
  });

  it("uses prepared file paths for module imports and ASTs for cross-file values", () => {
    const { stack, group } = subscriptionStack("prepared-references");
    const producer = storage(group, "preparedproducer");
    const secondGroup = new ResourceGroup(stack, {
      name: "second-rg",
      location: "eastus",
    });
    storage(secondGroup, "preparedconsumer", { tags: { source: producer.id } });
    const { layout, prepared } = prepare(stack);
    // Wiring uses snapshots of ownership and scope, not the mutable plans.
    layout.entryPlan.resources.clear();
    for (const plan of layout.deployments) plan.resources.clear();
    wireDeploymentFiles(stack.name, prepared);
    const [producerModule, consumerModule] = prepared.modules;
    expect(prepared.entry.ast.modules.get(consumerModule!.moduleName)).toMatchObject({
      path: "./prepared-references/storageAccount2.bicep",
      value: {
        value: {
          params: {
            value: {
              storageAccountId: {
                base: {
                  base: { id: producerModule!.moduleName },
                  property: "outputs",
                },
                property: "storageAccountId",
              },
            },
          },
        },
      },
    });
    expect(producerModule!.file.ast.outputs.has("storageAccountId")).toBe(true);
    expect(consumerModule!.file.ast.parameters.has("storageAccountId")).toBe(true);
    expect(prepared.stackAst.outputs.size).toBe(0);
  });

  it.each([
    ["nested/prepared", "nested/prepared/storageAccount.bicep"],
    ["nested//./prepared", "nested/prepared/storageAccount.bicep"],
    ["nested/../prepared", "prepared/storageAccount.bicep"],
    ["nested\\prepared", "nested/prepared/storageAccount.bicep"],
  ])("normalizes module paths and resolves imports for entry %s", (stackName, moduleFileName) => {
    const { stack, group } = subscriptionStack(stackName);
    storage(group, "nestedstorage");
    const { prepared } = prepare(stack);
    wireDeploymentFiles(stack.name, prepared);

    expect(prepared.entry.fileName).toBe(`${stackName}.bicep`);
    expect(prepared.modules[0]!.file.fileName).toBe(moduleFileName);
    expect(prepared.entry.ast.modules.get(prepared.modules[0]!.moduleName)!.path).toBe(
      "./prepared/storageAccount.bicep",
    );
  });

  it("uses the same prepared file shape for a standalone entry with no modules", () => {
    const stack = new Stack("standalone-prepared", {
      targetScope: "resourceGroup",
    });
    storage(stack, "standalonestorage");
    const { prepared } = prepare(stack);
    expect(prepared.modules).toEqual([]);
    expect(prepared.stackAst).not.toHaveProperty("fileName");
    expect(prepared.entry.fileName).toBe("standalone-prepared/storageAccount.bicep");
    expect(toInfraNode(prepared.entry)).toMatchObject({
      fileName: "standalone-prepared/storageAccount.bicep",
      targetScope: "resourceGroup",
      resources: { storageAccount: { bicepIdentifier: "storageAccount" } },
    });
  });

  it("plans and wires cloned ASTs without reading the live authored resources", () => {
    const { stack, group } = subscriptionStack("detached-ast");
    const source = storage(group, "localstorage", { existing: true });
    const external = storage(new ProvisioningComponent(group), "externalstorage", {
      existing: true,
      scope: fn.resourceGroup("00000000-0000-0000-0000-000000000001", "external-rg"),
    });
    external.name = source.name;
    const child = new Resource(new ProvisioningComponent(external), {
      type: "Microsoft.Storage/storageAccounts/blobServices",
      apiVersion: "2024-01-01",
      name: "default",
    });
    const secondGroup = new ResourceGroup(stack, {
      name: "second-rg",
      location: "eastus",
    });
    const consumer = new Resource(
      secondGroup,
      {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name: "consumerstorage",
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
        tags: { source: child.id },
      },
      { dependsOn: [child] },
    );
    stack.outputs.add("id", "string", consumer.id);
    const expected = renderBicepFiles(stack);
    const built = buildStackFixture(stack);
    const { stackAst, resourceContexts } = structuredClone({
      stackAst: built.stackAst,
      resourceContexts: built.resourceContexts,
    });
    // The saved AST and context must be independent of subsequent authored edits.
    consumer.name = "changedstorage";
    Object.defineProperty(external, "parent", { value: secondGroup });
    stack.children.length = 0;
    const layout = planDeploymentFiles(stackAst, resourceContexts);
    const prepared = prepareDeploymentFiles(
      stack.name,
      stackAst,
      resourceContexts,
      layout,
      built.namer,
    );
    wireDeploymentFiles(stack.name, prepared);
    const rendered = [prepared.entry, ...prepared.modules.map(({ file }) => file)].map((file) =>
      renderBicepFile(toInfraNode(file)),
    );
    expect(rendered).toEqual(expected);
    validateRenderedBicepFiles(rendered);
  }, 30_000);

  it("adds an entry existing candidate needed only after module arguments are generated", () => {
    const stack = new Stack("late-entry-existing");
    const source = storage(stack, "sharedstorage", {
      existing: true,
      scope: fn.resourceGroup("source-rg"),
    });
    const group = new ResourceGroup(stack, {
      name: "target-rg",
      location: "eastus",
    });
    storage(group, "consumerstorage", { tags: { source: source.id } });
    const { prepared } = prepare(stack);
    const [module] = prepared.modules;
    expect(prepared.entryExistingResourceCandidates.has("storageAccount")).toBe(true);
    expect(prepared.entryAssignedResources.has("storageAccount")).toBe(false);
    expect(prepared.entry.ast.resources.has("storageAccount")).toBe(false);
    expect(module!.file.ast.resources.has("storageAccount")).toBe(false);
    expect(module!.assignedResources.has("storageAccount")).toBe(false);
    wireDeploymentFiles(stack.name, prepared);
    expect(prepared.entry.ast.resources.get("storageAccount")!.existing).toBe(true);
    expect(module!.file.ast.parameters.has("storageAccountId")).toBe(true);
    expect(module!.file.ast.resources.has("storageAccount")).toBe(false);
    const rendered = [prepared.entry, ...prepared.modules.map(({ file }) => file)].map((file) =>
      renderBicepFile(toInfraNode(file)),
    );
    validateRenderedBicepFiles(rendered);
  }, 30_000);
});
