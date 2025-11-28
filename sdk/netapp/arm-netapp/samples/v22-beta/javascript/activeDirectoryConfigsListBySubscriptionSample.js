// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all active directory configurations within the subscription
 *
 * @summary list all active directory configurations within the subscription
 * x-ms-original-file: 2025-09-01-preview/ActiveDirectoryConfigs_ListBySubscription.json
 */
async function activeDirectoryConfigsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activeDirectoryConfigs.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await activeDirectoryConfigsListBySubscription();
}

main().catch(console.error);
