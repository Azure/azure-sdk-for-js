// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the Maps Account.
 *
 * @summary gets the specified private endpoint connection associated with the Maps Account.
 * x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_Get.json
 */
async function privateEndpointConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "myMapsAccount",
    "privateEndpointConnectionName",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
