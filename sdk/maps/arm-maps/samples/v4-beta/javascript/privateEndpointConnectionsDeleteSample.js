// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the Maps Account.
 *
 * @summary deletes the specified private endpoint connection associated with the Maps Account.
 * x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_Delete.json
 */
async function privateEndpointConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "myResourceGroup",
    "myMapsAccount",
    "privateEndpointConnectionName",
  );
}

async function main() {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
