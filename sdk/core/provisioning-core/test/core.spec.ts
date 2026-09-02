// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ResourceGroup,
  Stack,
  fn,
  isExpression,
  unwrapResourceHandle,
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
    expect(
      (unwrapResourceHandle(resourceGroup) as unknown as Record<string, unknown>)["managedBy"],
    ).toBe("contoso/manager");
    expect(ResourceGroup.apiVersion).toBe("2024-03-01");
  });

  it("creates typed deployment expressions", () => {
    const expression = fn.concat("prefix-", fn.uniqueString("seed"));

    expect(isExpression(expression)).toBe(true);
  });
});
