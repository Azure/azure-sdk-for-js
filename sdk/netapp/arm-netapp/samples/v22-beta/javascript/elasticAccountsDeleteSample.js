// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified NetApp elastic account
 *
 * @summary delete the specified NetApp elastic account
 * x-ms-original-file: 2025-09-01-preview/ElasticAccounts_Delete.json
 */
async function elasticAccountsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticAccounts.delete("myRG", "account1");
}

async function main() {
  await elasticAccountsDelete();
}

main().catch(console.error);
