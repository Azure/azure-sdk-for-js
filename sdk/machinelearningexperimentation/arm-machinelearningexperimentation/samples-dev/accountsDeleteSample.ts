// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a machine learning team account.
 *
 * @summary Deletes a machine learning team account.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteAccount.json
 */

import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function accountDelete(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "myAccount";
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.accounts.delete(resourceGroupName, accountName);
  console.log(result);
}

async function main(): Promise<void> {
  await accountDelete();
}

main().catch(console.error);
