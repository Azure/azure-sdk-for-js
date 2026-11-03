// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedHsm } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/managedHSMs
 * Primary schema key: Microsoft.KeyVault/managedHSMs
 * Also covers: none
 * Scenario: Microsoft Learn managedHSMs example
 * provisioning API: ManagedHsm
 * Source: arm-schema-ref/Microsoft.KeyVault/2026-02-01/managedhsms.md
 * Runtime baseline: managedhsms.test.baseline.*
 * Gap/reduction: dependsOn is represented with a CDK dependency; deployer().objectId and tenant().tenantId use deterministic IDs.
 */
describe("learning site managed hsms", () => {
  it("renders the Learn baseline outputs", () => {
    const stack = createResourceGroupStack();

    new ManagedHsm(stack, {
      name: "kvhsm230630033342437496",
      location: "eastus",
      sku: {
        family: "B",
        name: "Standard_B1",
      },
      properties: {
        tenantId: "11111111-1111-1111-1111-111111111111",
        initialAdminObjectIds: ["22222222-2222-2222-2222-222222222222"],
        enableSoftDelete: true,
        enablePurgeProtection: false,
        softDeleteRetentionInDays: 90,
        createMode: "default",
        publicNetworkAccess: "Enabled",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
