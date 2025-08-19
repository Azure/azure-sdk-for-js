// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of Azure Large Instances in the specified subscription. The
operations returns various properties of each Azure Large Instance.
 *
 * @summary Gets a list of Azure Large Instances in the specified subscription. The
operations returns various properties of each Azure Large Instance.
 * x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_ListBySubscription.json
 */

import { LargeInstanceManagementClient } from "@azure/arm-largeinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function azureLargeInstanceListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["LARGEINSTANCE_SUBSCRIPTION_ID"] || "f0f4887f-d13c-4943-a8ba-d7da28d2a3fd";
  const credential = new DefaultAzureCredential();
  const client = new LargeInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureLargeInstanceOperations.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await azureLargeInstanceListBySubscription();
}

main().catch(console.error);
