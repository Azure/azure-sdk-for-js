// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get available SKUs for scaling a multi-role pool.
 *
 * @summary description for Get available SKUs for scaling a multi-role pool.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListMultiRolePoolSkus.json
 */
async function getAvailableSKUsForScalingAMultiRolePool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listMultiRolePoolSkus(
    "test-rg",
    "test-ase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAvailableSKUsForScalingAMultiRolePool();
}

main().catch(console.error);
