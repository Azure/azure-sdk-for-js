// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified private link resource for the given group id (sub-resource)
 *
 * @summary get the specified private link resource for the given group id (sub-resource)
 * x-ms-original-file: 2026-01-01/PrivateLinkResourcesGet.json
 */
async function getAPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "myResourceGroup",
    "myWorkspace",
    "databricks_ui_api",
  );
  console.log(result);
}

async function main() {
  await getAPrivateLinkResource();
}

main().catch(console.error);
