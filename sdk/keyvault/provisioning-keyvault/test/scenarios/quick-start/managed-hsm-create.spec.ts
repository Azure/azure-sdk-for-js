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
 * Scenario: Azure quickstart managed-hsm-create
 * provisioning API: ManagedHsm
 * Source: https://github.com/Azure/azure-quickstart-templates/tree/1748b1857bc03d505d9b1cab03df56e5e0bf1a25/quickstarts/microsoft.keyvault/managed-hsm-create
 * Runtime baseline: managed-hsm-create.test.baseline.*
 * Gap/reduction: initialAdminObjectIds array parameter is represented by a deterministic object ID.
 */
describe("quickstart managed hsm create", () => {
  it("renders the quickstart Bicep sample", () => {
    const stack = createResourceGroupStack();
    const managedHSMName = stack.parameters.add("managedHSMName", "string", {
      description: "String specifying the name of the managed HSM.",
    });
    const location = stack.parameters.add("location", "string", {
      defaultValue: "eastus",
      description: "String specifying the Azure location where the managed HSM should be created.",
    });
    const softRetentionInDays = stack.parameters.add("softRetentionInDays", "int", {
      defaultValue: 7,
      minValue: 7,
      maxValue: 90,
      description:
        "Specifies the number of days that managed Key Vault will be kept recoverable if deleted.",
    });

    new ManagedHsm(stack, {
      name: managedHSMName,
      location,
      sku: {
        family: "B",
        name: "Standard_B1",
      },
      properties: {
        enableSoftDelete: true,
        softDeleteRetentionInDays: softRetentionInDays,
        enablePurgeProtection: false,
        tenantId: "11111111-1111-1111-1111-111111111111",
        initialAdminObjectIds: ["22222222-2222-2222-2222-222222222222"],
        publicNetworkAccess: "Enabled",
        networkAcls: {
          bypass: "None",
          defaultAction: "Allow",
        },
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
