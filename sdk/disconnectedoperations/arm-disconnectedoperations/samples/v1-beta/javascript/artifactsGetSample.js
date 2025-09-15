// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the resource
 *
 * @summary get the resource
 * x-ms-original-file: 2025-06-01-preview/Artifacts_Get_MaximumSet_Gen.json
 */
async function artifactsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.artifacts.get(
    "rgdisconnectedoperations",
    "J_3-_S--_-UM_-_7w11",
    "PMY-",
    "-8Y-Us1BNNG6-H5w6-2--RP",
  );
  console.log(result);
}

async function main() {
  await artifactsGet();
}

main().catch(console.error);
