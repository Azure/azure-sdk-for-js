// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the resource.
 *
 * @summary get the resource.
 * x-ms-original-file: 2025-06-01-preview/Images_Get_MaximumSet_Gen.json
 */
async function imagesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.images.get("rgdisconnectedoperations", "bT62l-KS7g1-uh", "2P6");
  console.log(result);
}

async function main() {
  await imagesGet();
}

main().catch(console.error);
