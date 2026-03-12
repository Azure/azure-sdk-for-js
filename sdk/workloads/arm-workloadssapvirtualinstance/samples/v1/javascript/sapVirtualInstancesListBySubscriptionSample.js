// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Virtual Instances for SAP solutions resources in a Subscription.
 *
 * @summary gets all Virtual Instances for SAP solutions resources in a Subscription.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_ListBySubscription.json
 */
async function sapVirtualInstancesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sapVirtualInstances.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sapVirtualInstancesListBySubscription();
}

main().catch(console.error);
