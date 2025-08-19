// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all organizations under the specified subscription.
 *
 * @summary List all organizations under the specified subscription.
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Organization_ListBySubscription.json
 */
async function organizationListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationListBySubscription();
}

main().catch(console.error);
