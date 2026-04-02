// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a private endpoint connections on the Maps Account.
 *
 * @summary get a private endpoint connections on the Maps Account.
 * x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_ListByAccount.json
 */
async function privateEndpointConnectionsListByAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByAccount(
    "myResourceGroup",
    "myMapsAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionsListByAccount();
}

main().catch(console.error);
