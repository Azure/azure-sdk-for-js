// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InviteBody } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to invite a user to a lab.
 *
 * @summary Operation to invite a user to a lab.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Users/inviteUser.json
 */
async function inviteUser(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const userName = "testuser";
  const body: InviteBody = { text: "Invitation to lab testlab" };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.users.beginInviteAndWait(resourceGroupName, labName, userName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await inviteUser();
}

main().catch(console.error);
