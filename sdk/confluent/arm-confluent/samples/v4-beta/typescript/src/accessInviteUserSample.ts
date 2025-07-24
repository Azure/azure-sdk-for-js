// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to invite user to the organization
 *
 * @summary invite user to the organization
 * x-ms-original-file: 2024-07-01/Access_InviteUser.json
 */
async function accessInviteUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.inviteUser("myResourceGroup", "myOrganization", {
    invitedUserDetails: {
      authType: "AUTH_TYPE_SSO",
      invitedEmail: "user2@onmicrosoft.com",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accessInviteUser();
}

main().catch(console.error);
