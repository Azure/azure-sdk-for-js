// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the applications within a subscription.
 *
 * @summary Lists all the applications within a subscription.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/listApplicationsByResourceGroup.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllTheApplicationsWithinASubscription(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllTheApplicationsWithinASubscription();
}

main().catch(console.error);
