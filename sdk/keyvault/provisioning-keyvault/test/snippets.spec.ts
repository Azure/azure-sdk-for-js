// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack, ResourceGroup } from "@azure/provisioning-core";
import { KeyVault } from "@azure/provisioning-keyvault";
import { afterEach, describe, it } from "vitest";

describe("documentation snippets", () => {
  afterEach(() => {
    Stack.clearRoots();
  });

  it("StackResourceGroupKeyVault", () => {
    const stack = new Stack("my-app");
    const group = new ResourceGroup(stack, { location: "eastus" });
    const vault = new KeyVault(group, {
      properties: {
        tenantId: "00000000-0000-0000-0000-000000000000",
        sku: { family: "A", name: "standard" },
      },
    });
    stack.outputs.add("vaultId", "string", vault.id);
  });
});
