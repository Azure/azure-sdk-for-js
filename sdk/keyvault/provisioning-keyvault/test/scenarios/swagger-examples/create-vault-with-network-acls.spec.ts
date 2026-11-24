// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVault } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/vaults
 * Primary schema key: Microsoft.KeyVault/vaults
 * Also covers: none
 * Scenario: Swagger Vaults_CreateOrUpdate request body with network ACLs
 * provisioning API: KeyVault
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/createVaultWithNetworkAcls.json
 * Runtime baseline: create-vault-with-network-acls.test.baseline.*
 * Gap/reduction: none
 */
describe("swagger create vault with network acls", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();

    new KeyVault(stack, {
      name: "sample-vault",
      location: "westus",
      properties: {
        enabledForDeployment: true,
        enabledForDiskEncryption: true,
        enabledForTemplateDeployment: true,
        networkAcls: {
          bypass: "AzureServices",
          defaultAction: "Deny",
          ipRules: [
            {
              value: "124.56.78.91",
            },
            {
              value: "'10.91.4.0/24'",
            },
          ],
          virtualNetworkRules: [
            {
              id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1",
            },
          ],
        },
        sku: {
          name: "standard",
          family: "A",
        },
        tenantId: "00000000-0000-0000-0000-000000000000",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/vaults",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
