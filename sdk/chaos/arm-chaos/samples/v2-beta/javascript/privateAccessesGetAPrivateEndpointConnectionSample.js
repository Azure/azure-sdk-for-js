// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a private endpoint connection under a private access resource.
 *
 * @summary gets information about a private endpoint connection under a private access resource.
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_GetAPrivateEndpointConnection.json
 */
async function getInformationAboutAPrivateEndpointConnectionUnderAPrivateAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.privateAccesses.getAPrivateEndpointConnection(
    "myResourceGroup",
    "myPrivateAccess",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main() {
  await getInformationAboutAPrivateEndpointConnectionUnderAPrivateAccessResource();
}

main().catch(console.error);
