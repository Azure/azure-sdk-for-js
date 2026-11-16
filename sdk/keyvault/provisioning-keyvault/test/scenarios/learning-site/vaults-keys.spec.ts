// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessPolicy, KeyVault, VaultKey } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

const tenantId = "11111111-1111-1111-1111-111111111111";
const objectId = "22222222-2222-2222-2222-222222222222";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/keys
 * Primary schema key: Microsoft.KeyVault/vaults/keys
 * Also covers: Microsoft.KeyVault/vaults, Microsoft.KeyVault/vaults/accessPolicies
 * Scenario: Microsoft Learn vaults/keys example
 * provisioning API: KeyVault, AccessPolicy, VaultKey
 * Source: arm-schema-ref/Microsoft.KeyVault/2026-02-01/vaults-keys.md
 * Runtime baseline: vaults-keys.test.baseline.*
 * Gap/reduction: deployer().objectId and tenant().tenantId are represented by deterministic IDs; permission casing is normalized to schema enum values.
 */
describe("learning site vaults keys", () => {
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
        enablePurgeProtection: true,
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
    new VaultKey(vault, {
      name: "acctest0001",
      properties: {
        keyOps: ["encrypt", "decrypt", "sign", "verify", "wrapKey", "unwrapKey"],
        keySize: 2048,
        kty: "RSA",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
