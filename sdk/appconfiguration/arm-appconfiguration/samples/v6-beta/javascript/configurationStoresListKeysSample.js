// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the access key for the specified configuration store.
 *
 * @summary lists the access key for the specified configuration store.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresListKeys.json
 */
async function configurationStoresListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationStores.listKeys("myResourceGroup", "contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await configurationStoresListKeys();
}

main().catch(console.error);
