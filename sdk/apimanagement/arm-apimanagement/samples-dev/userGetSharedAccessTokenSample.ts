// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  UserTokenParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the Shared Access Authorization Token for the User.
 *
 * @summary Gets the Shared Access Authorization Token for the User.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUserToken.json
 */
async function apiManagementUserToken(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const userId = "userId1718";
  const parameters: UserTokenParameters = {
    expiry: new Date("2019-04-21T00:44:24.2845269Z"),
    keyType: "primary",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.user.getSharedAccessToken(
    resourceGroupName,
    serviceName,
    userId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUserToken();
}

main().catch(console.error);
