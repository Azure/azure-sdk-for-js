// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates an access key for the specified configuration store.
 *
 * @summary regenerates an access key for the specified configuration store.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresRegenerateKey.json
 */
async function configurationStoresRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.configurationStores.regenerateKey("myResourceGroup", "contoso", {
    id: "439AD01B4BE67DB1",
  });
  console.log(result);
}

async function main() {
  await configurationStoresRegenerateKey();
}

main().catch(console.error);
