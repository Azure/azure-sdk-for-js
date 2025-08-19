// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the details of the user specified by its identifier.
 *
 * @summary Updates the details of the user specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateUser.json
 */

import {
  UserUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementUpdateUser(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const userId = "5931a75ae4bbd512a88c680b";
  const ifMatch = "*";
  const parameters: UserUpdateParameters = {
    email: "foobar@outlook.com",
    firstName: "foo",
    lastName: "bar",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.user.update(
    resourceGroupName,
    serviceName,
    userId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateUser();
}

main().catch(console.error);
