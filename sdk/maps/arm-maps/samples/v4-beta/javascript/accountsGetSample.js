// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Maps Account.
 *
 * @summary get a Maps Account.
 * x-ms-original-file: 2025-10-01-preview/GetAccount.json
 */
async function getAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.get("myResourceGroup", "myMapsAccount");
  console.log(result);
}

async function main() {
  await getAccount();
}

main().catch(console.error);
