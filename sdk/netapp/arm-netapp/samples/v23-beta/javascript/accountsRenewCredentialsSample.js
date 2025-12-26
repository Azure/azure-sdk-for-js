// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to renew identity credentials that are used to authenticate to key vault, for customer-managed key encryption. If encryption.identity.principalId does not match identity.principalId, running this operation will fix it.
 *
 * @summary renew identity credentials that are used to authenticate to key vault, for customer-managed key encryption. If encryption.identity.principalId does not match identity.principalId, running this operation will fix it.
 * x-ms-original-file: 2025-09-01-preview/Accounts_RenewCredentials.json
 */
async function accountsRenewCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.accounts.renewCredentials("myRG", "account1");
}

async function main() {
  await accountsRenewCredentials();
}

main().catch(console.error);
