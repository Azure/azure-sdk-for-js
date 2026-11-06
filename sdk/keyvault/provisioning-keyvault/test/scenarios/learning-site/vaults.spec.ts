// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVault } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

const tenantId = "11111111-1111-1111-1111-111111111111";
const objectId = "22222222-2222-2222-2222-222222222222";

/*
 * Primary resource type: Microsoft.KeyVault/vaults
 * Primary schema key: Microsoft.KeyVault/vaults
 * Also covers: none
 * Scenario: Microsoft Learn vaults example
 * provisioning API: KeyVault
 * Source: arm-schema-ref/Microsoft.KeyVault/2026-02-01/vaults.md
 * Runtime baseline: vaults.test.baseline.*
 * Gap/reduction: deployer().objectId and tenant().tenantId are represented by deterministic IDs.
 */
describe("learning site vaults", () => {
  it("renders the Learn baseline outputs", () => {
    const stack = createResourceGroupStack();

    new KeyVault(stack, {
      name: "acctest0001",
      location: "eastus",
      properties: {
        tenantId,
        sku: {
          family: "A",
          name: "standard",
        },
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
        enableSoftDelete: true,
        createMode: "default",
        enableRbacAuthorization: false,
        enabledForDeployment: false,
        enabledForDiskEncryption: false,
        enabledForTemplateDeployment: false,
        publicNetworkAccess: "Enabled",
        softDeleteRetentionInDays: 7,
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
