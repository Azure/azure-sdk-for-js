// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get properties of a multi-role pool.
 *
 * @summary description for Get properties of a multi-role pool.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_GetMultiRolePool.json
 */
async function getPropertiesOfAMultiRolePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.getMultiRolePool("test-rg", "test-ase");
  console.log(result);
}

async function main() {
  await getPropertiesOfAMultiRolePool();
}

main().catch(console.error);
