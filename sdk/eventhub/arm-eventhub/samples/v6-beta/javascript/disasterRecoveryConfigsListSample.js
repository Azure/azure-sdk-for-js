// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Alias(Disaster Recovery configurations)
 *
 * @summary gets all Alias(Disaster Recovery configurations)
 * x-ms-original-file: 2026-01-01/disasterRecoveryConfigs/EHAliasList.json
 */
async function ehAliasList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "exampleSubscriptionId";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disasterRecoveryConfigs.list(
    "exampleResourceGroup",
    "sdk-Namespace-8859",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ehAliasList();
}

main().catch(console.error);
