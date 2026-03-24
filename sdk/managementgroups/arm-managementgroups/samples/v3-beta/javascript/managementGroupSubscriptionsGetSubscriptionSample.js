// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves details about given subscription which is associated with the management group.
 *
 * @summary retrieves details about given subscription which is associated with the management group.
 * x-ms-original-file: 2023-04-01/GetSubscriptionFromManagementGroup.json
 */
async function getSubscriptionFromManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroupSubscriptions.getSubscription(
    "Group",
    "728bcbe4-8d56-4510-86c2-4921b8beefbc",
  );
  console.log(result);
}

async function main() {
  await getSubscriptionFromManagementGroup();
}

main().catch(console.error);
