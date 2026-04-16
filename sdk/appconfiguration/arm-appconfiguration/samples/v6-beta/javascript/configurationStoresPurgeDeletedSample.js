// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to permanently deletes the specified configuration store.
 *
 * @summary permanently deletes the specified configuration store.
 * x-ms-original-file: 2025-06-01-preview/DeletedConfigurationStoresPurge.json
 */
async function purgeADeletedConfigurationStore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  await client.configurationStores.purgeDeleted("westus", "contoso");
}

async function main() {
  await purgeADeletedConfigurationStore();
}

main().catch(console.error);
