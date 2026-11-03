// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the available Namespaces within a resource group.
 *
 * @summary lists the available Namespaces within a resource group.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceListByResourceGroup.json
 */
async function namespaceListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listByResourceGroup("ResurceGroupSample")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await namespaceListByResourceGroup();
}

main().catch(console.error);
