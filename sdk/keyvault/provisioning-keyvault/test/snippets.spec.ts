// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceGroup, Stack } from "@azure/provisioning-core";
import { KeyVault } from "../src/index.js";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("StackResourceGroupKeyVault", () => {
    const stack = new Stack("my-app");
    const resourceGroup = new ResourceGroup(stack, {
      name: "rg-my-app",
      location: "eastus",
    });

    const vault = new KeyVault(resourceGroup, {
      name: "kv-my-app",
      properties: {
        tenantId: "11111111-1111-1111-1111-111111111111",
        sku: { family: "A", name: "standard" },
      },
    });
  });
});
