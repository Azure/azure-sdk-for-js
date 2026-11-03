// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to associates existing subscription with the management group.
 *
 * @summary associates existing subscription with the management group.
 * x-ms-original-file: 2023-04-01/AddManagementGroupSubscription.json
 */
async function addSubscriptionToManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroupSubscriptions.create(
    "Group",
    "728bcbe4-8d56-4510-86c2-4921b8beefbc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addSubscriptionToManagementGroup();
}

main().catch(console.error);
