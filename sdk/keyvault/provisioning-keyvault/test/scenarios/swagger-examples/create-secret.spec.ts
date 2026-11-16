// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVault, Secret } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/secrets
 * Primary schema key: Microsoft.KeyVault/vaults/secrets
 * Also covers: Microsoft.KeyVault/vaults existing parent
 * Scenario: Swagger Secrets_CreateOrUpdate request body
 * provisioning API: KeyVault, Secret
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/createSecret.json
 * Runtime baseline: create-secret.test.baseline.*
 * Gap/reduction: none
 */
describe("swagger create secret", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();
    const vault = new KeyVault(stack, { name: "sample-vault", existing: true });

    new Secret(vault, {
      name: "secret-name",
      properties: {
        value: "secret-value",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/vaults/secrets",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
