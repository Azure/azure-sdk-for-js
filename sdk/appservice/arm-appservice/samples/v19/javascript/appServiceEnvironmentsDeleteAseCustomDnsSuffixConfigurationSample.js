// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Custom Dns Suffix configuration of an App Service Environment
 *
 * @summary delete Custom Dns Suffix configuration of an App Service Environment
 * x-ms-original-file: 2025-05-01/DeleteAseCustomDnsSuffixConfiguration.json
 */
async function deleteASECustomDNSSuffixConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.deleteAseCustomDnsSuffixConfiguration(
    "test-rg",
    "test-ase",
  );
  console.log(result);
}

async function main() {
  await deleteASECustomDNSSuffixConfiguration();
}

main().catch(console.error);
