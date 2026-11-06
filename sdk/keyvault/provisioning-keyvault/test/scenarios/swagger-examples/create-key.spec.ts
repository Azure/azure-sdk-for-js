// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVault, VaultKey } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/keys
 * Primary schema key: Microsoft.KeyVault/vaults/keys
 * Also covers: Microsoft.KeyVault/vaults existing parent
 * Scenario: Swagger Keys_CreateIfNotExist request body
 * provisioning API: KeyVault, VaultKey
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/createKey.json
 * Runtime baseline: create-key.test.baseline.*
 * Gap/reduction: none
 */
describe("swagger create key", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();
    const vault = new KeyVault(stack, {
      name: "sample-vault-name",
      existing: true,
    });

    new VaultKey(vault, {
      name: "sample-key-name",
      properties: {
        kty: "RSA",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/vaults/keys",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
