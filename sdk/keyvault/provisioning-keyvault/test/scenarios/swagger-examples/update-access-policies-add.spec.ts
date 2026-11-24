// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessPolicy, KeyVault } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/accessPolicies
 * Primary schema key: Microsoft.KeyVault/vaults/accessPolicies
 * Also covers: Microsoft.KeyVault/vaults existing parent
 * Scenario: Swagger Vaults_UpdateAccessPolicy add request body
 * provisioning API: KeyVault, AccessPolicy
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/updateAccessPoliciesAdd.json
 * Runtime baseline: update-access-policies-add.test.baseline.*
 * Gap/reduction: none
 */
describe("swagger update access policies add", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();
    const vault = new KeyVault(stack, { name: "sample-vault", existing: true });

    new AccessPolicy(vault, {
      name: "add",
      properties: {
        accessPolicies: [
          {
            objectId: "00000000-0000-0000-0000-000000000000",
            permissions: {
              certificates: ["get"],
              keys: ["encrypt"],
              secrets: ["get"],
            },
            tenantId: "00000000-0000-0000-0000-000000000000",
          },
        ],
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/vaults/accessPolicies",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
