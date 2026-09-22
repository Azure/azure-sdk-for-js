// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the jobs available under the given resource group.
 *
 * @summary lists all the jobs available under the given resource group.
 * x-ms-original-file: 2025-07-01/JobsListByResourceGroup.json
 */
async function jobsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listByResourceGroup("YourResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await jobsListByResourceGroup();
}

main().catch(console.error);
