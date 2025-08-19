// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the properties of the specified machine learning team account.
 *
 * @summary Gets the properties of the specified machine learning team account.
 * x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetAccount.json
 */

import { MLTeamAccountManagementClient } from "@azure/arm-machinelearningexperimentation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function accountGet(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNINGEXPERIMENTATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["MACHINELEARNINGEXPERIMENTATION_RESOURCE_GROUP"] || "accountcrud-1234";
  const accountName = "accountcrud5678";
  const credential = new DefaultAzureCredential();
  const client = new MLTeamAccountManagementClient(credential, subscriptionId);
  const result = await client.accounts.get(resourceGroupName, accountName);
  console.log(result);
}

async function main(): Promise<void> {
  await accountGet();
}

main().catch(console.error);
