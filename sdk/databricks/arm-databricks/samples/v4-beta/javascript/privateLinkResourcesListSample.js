// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private link resources for a given workspace
 *
 * @summary list private link resources for a given workspace
 * x-ms-original-file: 2026-01-01/ListPrivateLinkResources.json
 */
async function listPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("myResourceGroup", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinkResources();
}

main().catch(console.error);
