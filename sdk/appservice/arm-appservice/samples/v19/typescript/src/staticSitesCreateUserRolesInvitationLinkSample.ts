// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates an invitation link for a user with the role
 *
 * @summary description for Creates an invitation link for a user with the role
 * x-ms-original-file: 2025-05-01/CreateUserRolesInvitationLink.json
 */
async function createAnInvitationLinkForAUserForAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createUserRolesInvitationLink("rg", "testStaticSite0", {
    domain: "happy-sea-15afae3e.azurestaticwebsites.net",
    numHoursToExpiration: 1,
    provider: "aad",
    roles: "admin,contributor",
    userDetails: "username",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAnInvitationLinkForAUserForAStaticSite();
}

main().catch(console.error);
