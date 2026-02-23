// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-artifactsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists artifact signing accounts within a resource group.
 *
 * @summary lists artifact signing accounts within a resource group.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListByResourceGroup.json
 */
async function listsArtifactSigningAccountsWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.codeSigningAccounts.listByResourceGroup("MyResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsArtifactSigningAccountsWithinAResourceGroup();
}

main().catch(console.error);
