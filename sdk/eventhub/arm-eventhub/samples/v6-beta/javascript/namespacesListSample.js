// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available Namespaces within a subscription, irrespective of the resource groups.
 *
 * @summary lists all the available Namespaces within a subscription, irrespective of the resource groups.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceList.json
 */
async function namespacesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await namespacesListBySubscription();
}

main().catch(console.error);
