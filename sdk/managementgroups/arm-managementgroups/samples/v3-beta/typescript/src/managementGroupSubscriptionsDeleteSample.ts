// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to de-associates subscription from the management group.
 *
 * @summary de-associates subscription from the management group.
 * x-ms-original-file: 2023-04-01/RemoveManagementGroupSubscription.json
 */
async function deleteSubscriptionFromManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  await client.managementGroupSubscriptions.delete("Group", "728bcbe4-8d56-4510-86c2-4921b8beefbc");
}

async function main(): Promise<void> {
  await deleteSubscriptionFromManagementGroup();
}

main().catch(console.error);
