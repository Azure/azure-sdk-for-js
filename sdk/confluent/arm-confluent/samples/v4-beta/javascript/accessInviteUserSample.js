// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to invite user to the organization
 *
 * @summary invite user to the organization
 * x-ms-original-file: 2025-08-18-preview/Access_InviteUser_MaximumSet_Gen.json
 */
async function accessInviteUserMaximumSet() {
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
async function accessInviteUserMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.inviteUser("rgconfluent", "skqsedhorkejhhntdsiwroffkjld", {});
  console.log(result);
}

async function main() {
  await accessInviteUserMaximumSet();
  await accessInviteUserMinimumSet();
}

main().catch(console.error);
