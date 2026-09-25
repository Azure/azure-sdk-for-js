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

  it("requires name arguments for Bicep ID functions", () => {
    const invalidCalls = (): void => {
      // @ts-expect-error Bicep requires at least one value.
      fn.uniqueString();
      // @ts-expect-error Bicep requires at least one value.
      fn.guid();
      // @ts-expect-error Bicep requires at least one resource name.
      fn.resourceId("Microsoft.Storage/storageAccounts");
      // @ts-expect-error Bicep requires at least one resource name.
      fn.subscriptionResourceId("Microsoft.Storage/storageAccounts");
      // @ts-expect-error Bicep requires at least one resource name.
      fn.extensionResourceId("base-id", "Microsoft.Authorization/locks");
    };

    expect(invalidCalls).toBeTypeOf("function");
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

  it("rejects whole-record expressions for inherited resource group tags", () => {
    const stack = new Stack("core-test");
    const tagExpression = fn.cond<Record<string, string>>(
      true,
      { environment: "production" },
      { environment: "development" },
    );

    expect(
      () =>
        new ResourceGroup(stack, {
          name: "rg-expression-tags",
          location: "eastus",
          tags: tagExpression,
        }),
    ).toThrow("Resource group tags must be a literal record");

    const resourceGroup = new ResourceGroup(stack, {
      name: "rg-literal-tags",
      location: "eastus",
      tags: { environment: "initial" },
    });
    expect(() => {
      resourceGroup.tags = tagExpression;
    }).toThrow("Resource group tags must be a literal record");
  });
});
