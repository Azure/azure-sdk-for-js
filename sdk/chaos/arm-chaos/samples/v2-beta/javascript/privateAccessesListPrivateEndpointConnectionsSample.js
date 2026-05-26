// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list information about private endpoint connections under a private access resource
 *
 * @summary list information about private endpoint connections under a private access resource
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_ListPrivateEndpointConnections.json
 */
async function listAllPrivateEndpointConnectionsUnderAPrivateAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateAccesses.listPrivateEndpointConnections(
    "myResourceGroup",
    "myPrivateAccess",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllPrivateEndpointConnectionsUnderAPrivateAccessResource();
}

main().catch(console.error);
