// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Sends confirmation
 *
 * @summary Sends confirmation
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUserConfirmationPasswordSend.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUserConfirmationPasswordSend(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const userId = "57127d485157a511ace86ae7";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.userConfirmationPassword.send(
    resourceGroupName,
    serviceName,
    userId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUserConfirmationPasswordSend();
}

main().catch(console.error);
