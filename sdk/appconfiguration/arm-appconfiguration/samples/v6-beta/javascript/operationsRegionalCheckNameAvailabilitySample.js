// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks whether the configuration store name is available for use.
 *
 * @summary checks whether the configuration store name is available for use.
 * x-ms-original-file: 2025-06-01-preview/RegionalCheckNameAvailable.json
 */
async function configurationStoresCheckNameAvailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.operations.regionalCheckNameAvailability("westus", {
    name: "contoso",
    type: "Microsoft.AppConfiguration/configurationStores",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks whether the configuration store name is available for use.
 *
 * @summary checks whether the configuration store name is available for use.
 * x-ms-original-file: 2025-06-01-preview/RegionalCheckNameNotAvailable.json
 */
async function configurationStoresCheckNameNotAvailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.operations.regionalCheckNameAvailability("westus", {
    name: "contoso",
    type: "Microsoft.AppConfiguration/configurationStores",
  });
  console.log(result);
}

async function main() {
  await configurationStoresCheckNameAvailable();
  await configurationStoresCheckNameNotAvailable();
}

main().catch(console.error);
