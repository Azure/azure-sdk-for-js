// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh LDAP Bind DN password by fetching the latest password from Azure Key Vault.
 *
 * @summary refresh LDAP Bind DN password by fetching the latest password from Azure Key Vault.
 * x-ms-original-file: 2026-04-15-preview/Accounts_RefreshLdapBindPassword.json
 */
async function netAppAccountsRefreshLdapBindPassword(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.accounts.refreshLdapBindPassword("myRG", "account1");
}

async function main(): Promise<void> {
  await netAppAccountsRefreshLdapBindPassword();
}

main().catch(console.error);
