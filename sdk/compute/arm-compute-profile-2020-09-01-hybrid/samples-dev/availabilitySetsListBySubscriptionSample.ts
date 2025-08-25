// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all availability sets in a subscription.
 *
 * @summary Lists all availability sets in a subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2020-06-01/examples/ListAvailabilitySetsInASubscription.json
 */

import type { AvailabilitySetsListBySubscriptionOptionalParams } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAvailabilitySetsInASubscription(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const expand = "virtualMachines\\$ref";
  const options: AvailabilitySetsListBySubscriptionOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.listBySubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAvailabilitySetsInASubscription();
}

main().catch(console.error);
