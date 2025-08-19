// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to restart an Azure Large Instance (only for compute instances)
 *
 * @summary The operation to restart an Azure Large Instance (only for compute instances)
 * x-ms-original-file: specification/azurelargeinstance/resource-manager/Microsoft.AzureLargeInstance/preview/2023-07-20-preview/examples/AzureLargeInstance_Restart.json
 */

import { LargeInstanceManagementClient } from "@azure/arm-largeinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function azureLargeInstanceRestart(): Promise<void> {
  const subscriptionId =
    process.env["LARGEINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["LARGEINSTANCE_RESOURCE_GROUP"] || "myResourceGroup";
  const azureLargeInstanceName = "myALInstance";
  const credential = new DefaultAzureCredential();
  const client = new LargeInstanceManagementClient(credential, subscriptionId);
  const result = await client.azureLargeInstanceOperations.beginRestartAndWait(
    resourceGroupName,
    azureLargeInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureLargeInstanceRestart();
}

main().catch(console.error);
