// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProvisioningComponent,
  ResourceGroup,
  Stack,
  fn,
  isExpression,
} from "@azure/provisioning-core";
import { describe, expect, it } from "vitest";

describe("provisioning core", () => {
  it("constructs and queries a resource group", () => {
    const stack = new Stack("core-test");
    const resourceGroup = new ResourceGroup(stack, {
      name: "rg-core-test",
      location: "eastus",
      managedBy: "contoso/manager",
    });

    expect(stack.getResources(ResourceGroup)).toEqual([resourceGroup]);
    expect(resourceGroup.isChildOf(stack)).toBe(true);
    expect(isExpression(resourceGroup.managedBy)).toBe(true);
    expect(ResourceGroup.apiVersion).toBe("2024-03-01");
  });

  it("creates typed deployment expressions", () => {
    const expression = fn.concat("prefix-", fn.uniqueString("seed"));

    expect(isExpression(expression)).toBe(true);
  });

  it("refreshes inherited tags after resource group tags are reassigned", () => {
    const stack = new Stack("core-test");
    const resourceGroup = new ResourceGroup(stack, {
      name: "rg-core-test",
      location: "eastus",
      tags: { environment: "initial" },
    });

    resourceGroup.tags = { environment: "updated" };

    const child = new ProvisioningComponent(resourceGroup);
    expect(child.deploymentContext.tags).toEqual({ environment: "updated" });
  });
});
