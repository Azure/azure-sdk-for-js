// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecretsStoreExtensionManagementClient } = require("@azure/arm-secretsstoreextension");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the SecretSync instances within a resource group.
 *
 * @summary lists the SecretSync instances within a resource group.
 * x-ms-original-file: 2026-09-25-preview/SecretSyncs_ListByResourceGroup_MaximumSet_Gen.json
 */
async function secretSyncsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secretSyncs.listByResourceGroup("rg-ssc-example")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await secretSyncsListByResourceGroup();
}

main().catch(console.error);
