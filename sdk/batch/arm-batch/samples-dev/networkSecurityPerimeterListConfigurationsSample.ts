// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the NSP configurations in the specified account.
 *
 * @summary Lists all of the NSP configurations in the specified account.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/NspConfigurationsList.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listNspConfigurations(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterOperations.listConfigurations(
    resourceGroupName,
    accountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listNspConfigurations();
}

main().catch(console.error);
