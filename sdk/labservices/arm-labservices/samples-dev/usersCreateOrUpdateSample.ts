// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to create or update a lab user.
 *
 * @summary Operation to create or update a lab user.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Users/putUser.json
 */

import type { User } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putUser(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const userName = "testuser";
  const body: User = {
    additionalUsageQuota: "PT10H",
    email: "testuser@contoso.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.users.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    userName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putUser();
}

main().catch(console.error);
