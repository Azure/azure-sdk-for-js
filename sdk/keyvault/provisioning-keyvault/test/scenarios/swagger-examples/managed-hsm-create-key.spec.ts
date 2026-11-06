// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedHsm, ManagedHsmKey } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/managedHSMs/keys
 * Primary schema key: Microsoft.KeyVault/managedHSMs/keys
 * Also covers: Microsoft.KeyVault/managedHSMs existing parent
 * Scenario: Swagger ManagedHsmKeys_CreateIfNotExist request body
 * provisioning API: ManagedHsm, ManagedHsmKey
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/managedHsmCreateKey.json
 * Runtime baseline: managed-hsm-create-key.test.baseline.*
 * Gap/reduction: none
 */
describe("swagger managed hsm create key", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();
    const hsm = new ManagedHsm(stack, {
      name: "sample-managedhsm-name",
      existing: true,
    });

    new ManagedHsmKey(hsm, {
      name: "sample-key-name",
      properties: {
        kty: "RSA",
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/managedHSMs/keys",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
