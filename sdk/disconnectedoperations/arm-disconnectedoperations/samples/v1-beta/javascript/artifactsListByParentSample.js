// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list by parent
 *
 * @summary list by parent
 * x-ms-original-file: 2025-06-01-preview/Artifact_ListByParent_MaximumSet_Gen.json
 */
async function artifactsListByParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.artifacts.listByParent(
    "rgdisconnectedoperations",
    "XOn_Y-7_M-46E-Y",
    "2v5Q3mNihPV88C882LnbQO8",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await artifactsListByParent();
}

main().catch(console.error);
