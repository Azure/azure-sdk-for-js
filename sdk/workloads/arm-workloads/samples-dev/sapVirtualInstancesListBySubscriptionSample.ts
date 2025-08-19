// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all Virtual Instances for SAP solutions resources in a Subscription.
 *
 * @summary Gets all Virtual Instances for SAP solutions resources in a Subscription.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_ListBySubscription.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sapVirtualInstancesListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sAPVirtualInstances.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await sapVirtualInstancesListBySubscription();
}

main().catch(console.error);
