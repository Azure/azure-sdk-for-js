// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Invite user to the organization
 *
 * @summary Invite user to the organization
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Access_InviteUser.json
 */

import type { AccessInviteUserAccountModel } from "@azure/arm-confluent";
import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function accessInviteUser(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const organizationName = "myOrganization";
  const body: AccessInviteUserAccountModel = {
    invitedUserDetails: {
      authType: "AUTH_TYPE_SSO",
      invitedEmail: "user2@onmicrosoft.com",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.inviteUser(resourceGroupName, organizationName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await accessInviteUser();
}

main().catch(console.error);
