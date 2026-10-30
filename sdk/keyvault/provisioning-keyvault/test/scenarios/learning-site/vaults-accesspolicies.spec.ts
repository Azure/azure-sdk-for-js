// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessPolicy, KeyVault } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

const tenantId = "11111111-1111-1111-1111-111111111111";
const objectId = "22222222-2222-2222-2222-222222222222";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/accessPolicies
 * Primary schema key: Microsoft.KeyVault/vaults/accessPolicies
 * Also covers: Microsoft.KeyVault/vaults
 * Scenario: Microsoft Learn vaults/accessPolicies example
 * provisioning API: KeyVault, AccessPolicy
 * Source: arm-schema-ref/Microsoft.KeyVault/2026-02-01/vaults-accesspolicies.md
 * Runtime baseline: vaults-accesspolicies.test.baseline.*
 * Gap/reduction: deployer().objectId and tenant().tenantId are represented by deterministic IDs; permission casing is normalized to schema enum values.
 */
describe("learning site vaults access policies", () => {
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

    new AccessPolicy(vault, {
      name: "add",
      properties: {
        accessPolicies: [
          {
            tenantId,
            objectId,
            permissions: {
              certificates: ["get"],
              keys: ["encrypt"],
              secrets: ["get"],
            },
          },
        ],
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
