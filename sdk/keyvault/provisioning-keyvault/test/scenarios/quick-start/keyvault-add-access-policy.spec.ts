// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessPolicy, KeyVault } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/accessPolicies
 * Primary schema key: Microsoft.KeyVault/vaults/accessPolicies
 * Also covers: Microsoft.KeyVault/vaults existing parent
 * Scenario: Azure quickstart keyvault-add-access-policy
 * provisioning API: KeyVault, AccessPolicy
 * Source: https://github.com/Azure/azure-quickstart-templates/tree/1748b1857bc03d505d9b1cab03df56e5e0bf1a25/quickstarts/microsoft.keyvault/keyvault-add-access-policy
 * Runtime baseline: keyvault-add-access-policy.test.baseline.*
 * Gap/reduction: ARM JSON concat name is represented as parent existing vault plus leaf access policy name.
 */
describe("quickstart keyvault add access policy", () => {
  it("renders the quickstart Bicep sample", () => {
    const stack = createResourceGroupStack();
    const keyVaultName = stack.parameters.add("keyVaultName", "string", {
      description: "Specifies the name of the key vault.",
    });
    const objectId = stack.parameters.add("objectId", "string", {
      description: "Specifies the object ID for the access policy.",
    });
    const vault = new KeyVault(stack, { name: keyVaultName, existing: true });

    new AccessPolicy(vault, {
      name: "add",
      properties: {
        accessPolicies: [
          {
            tenantId: "11111111-1111-1111-1111-111111111111",
            objectId,
            permissions: {
              secrets: ["list"],
            },
          },
        ],
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
