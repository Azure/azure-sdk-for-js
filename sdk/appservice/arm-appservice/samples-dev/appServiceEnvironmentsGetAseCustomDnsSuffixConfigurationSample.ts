// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Custom Dns Suffix configuration of an App Service Environment
 *
 * @summary get Custom Dns Suffix configuration of an App Service Environment
 * x-ms-original-file: 2025-05-01/GetAseCustomDnsSuffixConfiguration.json
 */
async function getASECustomDNSSuffixConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.getAseCustomDnsSuffixConfiguration(
    "test-rg",
    "test-ase",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASECustomDNSSuffixConfiguration();
}

main().catch(console.error);
