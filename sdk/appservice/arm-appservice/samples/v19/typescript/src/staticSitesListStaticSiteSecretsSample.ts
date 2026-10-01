// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Lists the secrets for an existing static site.
 *
 * @summary description for Lists the secrets for an existing static site.
 * x-ms-original-file: 2025-05-01/ListStaticSiteSecrets.json
 */
async function listSecretsForAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.listStaticSiteSecrets("rg", "testStaticSite0");
  console.log(result);
}

async function main(): Promise<void> {
  await listSecretsForAStaticSite();
}

main().catch(console.error);
