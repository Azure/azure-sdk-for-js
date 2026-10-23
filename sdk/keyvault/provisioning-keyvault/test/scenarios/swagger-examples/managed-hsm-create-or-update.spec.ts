// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedHsm } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/managedHSMs
 * Primary schema key: Microsoft.KeyVault/managedHSMs
 * Also covers: none
 * Scenario: Swagger ManagedHsms_CreateOrUpdate request body
 * provisioning API: ManagedHsm
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/ManagedHsm_CreateOrUpdate.json
 * Runtime baseline: managed-hsm-create-or-update.test.baseline.*
 * Gap/reduction: none
 */
describe("swagger managed hsm create or update", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();

    new ManagedHsm(stack, {
      name: "hsm1",
      location: "westus",
      properties: {
        enablePurgeProtection: false,
        enableSoftDelete: true,
        initialAdminObjectIds: ["00000000-0000-0000-0000-000000000000"],
        softDeleteRetentionInDays: 90,
        tenantId: "00000000-0000-0000-0000-000000000000",
      },
      sku: {
        family: "B",
        name: "Standard_B1",
      },
      tags: {
        Dept: "hsm",
        Environment: "dogfood",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/managedHSMs",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
