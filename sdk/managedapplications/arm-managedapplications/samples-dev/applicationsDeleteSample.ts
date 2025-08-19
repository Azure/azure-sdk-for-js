// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the managed application.
 *
 * @summary Deletes the managed application.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/deleteApplication.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteManagedApplication(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["MANAGEDAPPLICATIONS_RESOURCE_GROUP"] || "rg";
  const applicationName = "myManagedApplication";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const result = await client.applications.beginDeleteAndWait(resourceGroupName, applicationName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteManagedApplication();
}

main().catch(console.error);
