// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Custom Dns Suffix configuration of an App Service Environment
 *
 * @summary update Custom Dns Suffix configuration of an App Service Environment
 * x-ms-original-file: 2025-05-01/UpdateAseCustomDnsSuffixConfiguration.json
 */
async function updateASECustomDNSSuffixConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.updateAseCustomDnsSuffixConfiguration(
    "test-rg",
    "test-ase",
    {
      certificateUrl: "https://test-kv.vault.azure.net/secrets/contosocert",
      dnsSuffix: "contoso.com",
      keyVaultReferenceIdentity:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/test-rg/providers/microsoft.managedidentity/userassignedidentities/test-user-mi",
    },
  );
  console.log(result);
}

async function main() {
  await updateASECustomDNSSuffixConfiguration();
}

main().catch(console.error);
