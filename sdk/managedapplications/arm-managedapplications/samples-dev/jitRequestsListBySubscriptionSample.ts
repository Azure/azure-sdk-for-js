// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all JIT requests within the subscription.
 *
 * @summary Lists all JIT requests within the subscription.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/listJitRequestsByResourceGroup.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllJitRequestsWithinTheSubscription(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const result = await client.jitRequests.listBySubscription();
  console.log(result);
}

async function main(): Promise<void> {
  await listsAllJitRequestsWithinTheSubscription();
}

main().catch(console.error);
