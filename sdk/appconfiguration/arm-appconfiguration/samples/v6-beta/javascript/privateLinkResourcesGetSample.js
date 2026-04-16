// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource that need to be created for a configuration store.
 *
 * @summary gets a private link resource that need to be created for a configuration store.
 * x-ms-original-file: 2025-06-01-preview/PrivateLinkResourceGet.json
 */
async function privateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "myResourceGroup",
    "contoso",
    "configurationStores",
  );
  console.log(result);
}

async function main() {
  await privateLinkResourcesGet();
}

main().catch(console.error);
