// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all Maps Accounts in a Resource Group
 *
 * @summary get all Maps Accounts in a Resource Group
 * x-ms-original-file: 2025-10-01-preview/ListAccountsByResourceGroup.json
 */
async function listAccountsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAccountsByResourceGroup();
}

main().catch(console.error);
