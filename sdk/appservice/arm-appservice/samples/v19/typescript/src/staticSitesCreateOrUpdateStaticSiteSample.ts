// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates a new static site in an existing resource group, or updates an existing static site.
 *
 * @summary description for Creates a new static site in an existing resource group, or updates an existing static site.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateStaticSite.json
 */
async function createOrUpdateAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateStaticSite("rg", "testStaticSite0", {
    location: "West US 2",
    branch: "master",
    buildProperties: { apiLocation: "api", appArtifactLocation: "build", appLocation: "app" },
    repositoryToken: "repoToken123",
    repositoryUrl: "https://github.com/username/RepoName",
    sku: { name: "Basic", tier: "Basic" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAStaticSite();
}

main().catch(console.error);
