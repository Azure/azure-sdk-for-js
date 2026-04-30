// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to invite user to the organization
 *
 * @summary invite user to the organization
 * x-ms-original-file: 2025-08-18-preview/Access_InviteUser_MaximumSet_Gen.json
 */
async function accessInviteUserMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.inviteUser("rgconfluent", "aqwpihgldcvqwq", {
    organizationId: "aojvtivybqtuwwulokimwyh",
    email: "jtborwwroz",
    upn: "eyck",
    invitedUserDetails: { invitedEmail: "ozfkzouvjbvndqpyoxqbwtpzeiip", authType: "yaokrbtlql" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to invite user to the organization
 *
 * @summary invite user to the organization
 * x-ms-original-file: 2025-08-18-preview/Access_InviteUser_MinimumSet_Gen.json
 */
async function accessInviteUserMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.inviteUser("rgconfluent", "skqsedhorkejhhntdsiwroffkjld", {});
  console.log(result);
}

async function main(): Promise<void> {
  await accessInviteUserMaximumSet();
  await accessInviteUserMinimumSet();
}

main().catch(console.error);
