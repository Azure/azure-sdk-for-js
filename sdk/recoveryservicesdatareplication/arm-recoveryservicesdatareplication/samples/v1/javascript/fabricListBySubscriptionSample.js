// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of fabrics in the given subscription.
 *
 * @summary gets the list of fabrics in the given subscription.
 * x-ms-original-file: 2024-09-01/Fabric_ListBySubscription.json
 */
async function listsTheFabricsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fabric.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheFabricsBySubscription();
}

main().catch(console.error);
