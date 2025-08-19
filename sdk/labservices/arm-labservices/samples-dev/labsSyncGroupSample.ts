// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Action used to manually kick off an AAD group sync job.
 *
 * @summary Action used to manually kick off an AAD group sync job.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Labs/syncLab.json
 */
async function syncLab(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.labs.beginSyncGroupAndWait(resourceGroupName, labName);
  console.log(result);
}

async function main(): Promise<void> {
  await syncLab();
}

main().catch(console.error);
