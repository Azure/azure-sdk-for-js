// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to delete a user resource.
 *
 * @summary Operation to delete a user resource.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Users/deleteUser.json
 */

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteUser(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const userName = "testuser";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.users.beginDeleteAndWait(resourceGroupName, labName, userName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteUser();
}

main().catch(console.error);
