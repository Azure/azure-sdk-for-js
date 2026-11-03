// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to associates existing subscription with the management group.
 *
 * @summary associates existing subscription with the management group.
 * x-ms-original-file: 2023-04-01/AddManagementGroupSubscription.json
 */
async function addSubscriptionToManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroupSubscriptions.create(
    "Group",
    "728bcbe4-8d56-4510-86c2-4921b8beefbc",
  );
  console.log(result);
}

async function main() {
  await addSubscriptionToManagementGroup();
}

main().catch(console.error);
