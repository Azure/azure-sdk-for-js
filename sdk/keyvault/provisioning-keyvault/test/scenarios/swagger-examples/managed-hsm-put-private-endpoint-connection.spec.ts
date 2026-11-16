// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedHsmPrivateEndpointConnection, ManagedHsm } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/managedHSMs/privateEndpointConnections
 * Primary schema key: Microsoft.KeyVault/managedHSMs/privateEndpointConnections
 * Also covers: Microsoft.KeyVault/managedHSMs existing parent
 * Scenario: Swagger MHSMPrivateEndpointConnections_Put request body
 * provisioning API: ManagedHsm, ManagedHsmPrivateEndpointConnection
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/ManagedHsm_putPrivateEndpointConnection.json
 * Runtime baseline: managed-hsm-put-private-endpoint-connection.test.baseline.*
 * Gap/reduction: privateLinkServiceConnectionState.description text is normalized because the exact approval message is irrelevant to resource-shape coverage.
 */
describe("swagger managed hsm private endpoint connection put", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();
    const hsm = new ManagedHsm(stack, { name: "sample-mhsm", existing: true });

    new ManagedHsmPrivateEndpointConnection(hsm, {
      name: "sample-pec",
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Approved by cdk test.",
        },
      },
    });

    const rendered = renderStackArtifacts(stack);
    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.KeyVault/managedHSMs/privateEndpointConnections",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
