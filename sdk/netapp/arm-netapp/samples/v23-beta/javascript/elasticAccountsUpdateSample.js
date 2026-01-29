// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified NetApp Elastic Account
 *
 * @summary patch the specified NetApp Elastic Account
 * x-ms-original-file: 2025-09-01-preview/ElasticAccounts_Update.json
 */
async function elasticAccountsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticAccounts.update("myRG", "account1", {
    tags: { Tag1: "Value1" },
  });
  console.log(result);
}

async function main() {
  await elasticAccountsUpdate();
}

main().catch(console.error);
