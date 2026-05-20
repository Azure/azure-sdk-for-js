// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all network security perimeter configurations for a configuration store.
 *
 * @summary lists all network security perimeter configurations for a configuration store.
 * x-ms-original-file: 2025-08-01-preview/ConfigurationStoresListNetworkSecurityPerimeterConfigurations.json
 */
async function networkSecurityPerimeterConfigurationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.listByConfigurationStore(
    "myResourceGroup",
    "contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkSecurityPerimeterConfigurationsList();
}

main().catch(console.error);
