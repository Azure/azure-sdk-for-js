// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Adds an application to the specified Batch account.
 *
 * @summary Adds an application to the specified Batch account.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/ApplicationCreate.json
 */

import type { Application, ApplicationCreateOptionalParams } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function applicationCreate(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const applicationName = "app1";
  const parameters: Application = {
    allowUpdates: false,
    displayName: "myAppName",
  };
  const options: ApplicationCreateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.applicationOperations.create(
    resourceGroupName,
    accountName,
    applicationName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationCreate();
}

main().catch(console.error);
