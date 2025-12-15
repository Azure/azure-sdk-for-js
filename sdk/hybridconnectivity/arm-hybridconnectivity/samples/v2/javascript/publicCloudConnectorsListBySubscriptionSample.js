// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list PublicCloudConnector resources by subscription ID
 *
 * @summary list PublicCloudConnector resources by subscription ID
 * x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListBySubscription.json
 */
async function publicCloudConnectorsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicCloudConnectors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await publicCloudConnectorsListBySubscription();
}

main().catch(console.error);
