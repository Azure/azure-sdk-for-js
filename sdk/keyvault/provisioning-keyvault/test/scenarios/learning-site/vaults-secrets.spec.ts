// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVault, Secret } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

const tenantId = "11111111-1111-1111-1111-111111111111";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/secrets
 * Primary schema key: Microsoft.KeyVault/vaults/secrets
 * Also covers: Microsoft.KeyVault/vaults
 * Scenario: Microsoft Learn vaults/secrets example
 * provisioning API: KeyVault, Secret
 * Source: arm-schema-ref/Microsoft.KeyVault/2026-02-01/vaults-secrets.md
 * Runtime baseline: vaults-secrets.test.baseline.*
 * Gap/reduction: tenant().tenantId is represented by deterministic tenant ID.
 */
describe("learning site vaults secrets", () => {
  it("renders the Learn baseline outputs", () => {
    const stack = createResourceGroupStack();
    const vault = new KeyVault(stack, {
      name: "acctest0001",
      location: "eastus",
      properties: {
        tenantId,
        sku: {
          family: "A",
          name: "standard",
        },
        accessPolicies: [],
        enableSoftDelete: true,
      },
    });

    new Secret(vault, {
      name: "acctest0001",
      properties: {
        value: "szechuan",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
