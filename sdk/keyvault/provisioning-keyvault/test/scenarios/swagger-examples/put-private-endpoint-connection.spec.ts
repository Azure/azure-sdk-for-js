// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVault, VaultPrivateEndpointConnection } from "@azure/provisioning-keyvault";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

/*
 * Primary resource type: Microsoft.KeyVault/vaults/privateEndpointConnections
 * Primary schema key: Microsoft.KeyVault/vaults/privateEndpointConnections
 * Also covers: Microsoft.KeyVault/vaults existing parent
 * Scenario: Swagger PrivateEndpointConnections_Put request body
 * provisioning API: KeyVault, VaultPrivateEndpointConnection
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/a816c8f8d0ffb56d0d1008b91f23810700dbe8c0/specification/keyvault/resource-manager/Microsoft.KeyVault/KeyVault/stable/2026-02-01/examples/putPrivateEndpointConnection.json
 * Runtime baseline: put-private-endpoint-connection.test.baseline.*
 * Gap/reduction: etag omitted because the public provisioning API does not expose a writable etag field; privateLinkServiceConnectionState.description text is normalized because the exact approval message is irrelevant to resource-shape coverage.
 */
describe("swagger vault private endpoint connection put", () => {
  it("renders the Swagger request body and baseline outputs", () => {
    const stack = createResourceGroupStack();
    const vault = new KeyVault(stack, { name: "sample-vault", existing: true });

    new VaultPrivateEndpointConnection(vault, {
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
      resourceType: "Microsoft.KeyVault/vaults/privateEndpointConnections",
      apiVersion: "2026-02-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
