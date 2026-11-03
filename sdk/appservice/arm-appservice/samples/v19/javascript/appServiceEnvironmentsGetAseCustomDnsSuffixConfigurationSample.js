// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Custom Dns Suffix configuration of an App Service Environment
 *
 * @summary get Custom Dns Suffix configuration of an App Service Environment
 * x-ms-original-file: 2025-05-01/GetAseCustomDnsSuffixConfiguration.json
 */
async function getASECustomDNSSuffixConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.getAseCustomDnsSuffixConfiguration(
    "test-rg",
    "test-ase",
  );
  console.log(result);
}

async function main() {
  await getASECustomDNSSuffixConfiguration();
}

main().catch(console.error);
