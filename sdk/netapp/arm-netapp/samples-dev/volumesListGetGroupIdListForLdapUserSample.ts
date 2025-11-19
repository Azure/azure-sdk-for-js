// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the list of group Ids for a specific LDAP User
 *
 * @summary returns the list of group Ids for a specific LDAP User
 * x-ms-original-file: 2025-09-01-preview/GroupIdListForLDAPUser.json
 */
async function getGroupIdListForUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.listGetGroupIdListForLdapUser(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    { username: "user1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getGroupIdListForUser();
}

main().catch(console.error);
