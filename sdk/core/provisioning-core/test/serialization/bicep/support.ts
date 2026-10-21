// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Resource,
  ResourceGroup,
  Stack,
  type ProvisioningComponent,
} from "@azure/provisioning-core";
import { buildBicepFiles } from "../../../src/serialization/bicep/file-layout/build-bicep-files.js";
import type { InfraNode } from "../../../src/serialization/ast/index.js";
import { renderBicepFiles, type RenderedBicepFile } from "../../../src/internal.js";
import { validateRenderedBicepFiles } from "../../scripts/lib/bicep-validator.js";

export function widget(
  parent: ProvisioningComponent,
  name: string,
  properties: Record<string, unknown> = {},
): Resource<"Contoso.Test/widgets"> {
  return new Resource(parent, {
    type: "Contoso.Test/widgets",
    apiVersion: "2024-01-01",
    name,
    ...properties,
  });
}

export function storage(
  parent: ProvisioningComponent,
  name: string,
  properties: Record<string, unknown> = {},
): Resource<"Microsoft.Storage/storageAccounts"> {
  return new Resource(parent, {
    type: "Microsoft.Storage/storageAccounts",
    apiVersion: "2024-01-01",
    name,
    location: "eastus",
    kind: "StorageV2",
    sku: { name: "Standard_LRS" },
    ...properties,
  });
}

export function subscriptionStack(name = "infra"): {
  stack: Stack;
  group: ResourceGroup;
} {
  const stack = new Stack(name);
  const group = new ResourceGroup(stack, {
    name: `rg-${name}`,
    location: "eastus",
  });
  return { stack, group };
}

export function files(stack: Stack): readonly InfraNode[] {
  return buildBicepFiles(stack);
}

export function compile(stack: Stack): readonly RenderedBicepFile[] {
  const rendered = renderBicepFiles(stack);
  validateRenderedBicepFiles(rendered);
  return rendered;
}
