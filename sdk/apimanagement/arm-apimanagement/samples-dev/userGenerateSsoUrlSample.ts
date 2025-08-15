// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves a redirection URL containing an authentication token for signing a given user into the developer portal.
 *
 * @summary Retrieves a redirection URL containing an authentication token for signing a given user into the developer portal.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUserGenerateSsoUrl.json
 */
async function apiManagementUserGenerateSsoUrl(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const userId = "57127d485157a511ace86ae7";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.user.generateSsoUrl(
    resourceGroupName,
    serviceName,
    userId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUserGenerateSsoUrl();
}

main().catch(console.error);
