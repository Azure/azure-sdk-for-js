// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Configuration records within a subscription and resource group
 *
 * @summary get Configuration records within a subscription and resource group
 * x-ms-original-file: 2023-10-01-preview/ApplyUpdatesResourceGroup_List.json
 */
async function applyUpdatesResourceGroupList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applyUpdateForResourceGroup.list("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await applyUpdatesResourceGroupList();
}

main().catch(console.error);
