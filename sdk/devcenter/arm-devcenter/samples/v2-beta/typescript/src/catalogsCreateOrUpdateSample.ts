// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a catalog.
 *
 * @summary creates or updates a catalog.
 * x-ms-original-file: 2026-01-01-preview/Catalogs_CreateAdo.json
 */
async function catalogsCreateOrUpdateAdo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.catalogs.createOrUpdate("rg1", "Contoso", "CentralCatalog", {
    properties: {
      adoGit: {
        path: "/templates",
        branch: "main",
        secretIdentifier: "https://contosokv.vault.azure.net/secrets/CentralRepoPat",
        uri: "https://contoso@dev.azure.com/contoso/contosoOrg/_git/centralrepo-fakecontoso",
      },
      syncType: "Scheduled",
      autoImageBuildEnableStatus: "Enabled",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a catalog.
 *
 * @summary creates or updates a catalog.
 * x-ms-original-file: 2026-01-01-preview/Catalogs_CreateGitHub.json
 */
async function catalogsCreateOrUpdateGitHub(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.catalogs.createOrUpdate("rg1", "Contoso", "CentralCatalog", {
    properties: {
      gitHub: {
        path: "/templates",
        branch: "main",
        secretIdentifier: "https://contosokv.vault.azure.net/secrets/CentralRepoPat",
        uri: "https://github.com/Contoso/centralrepo-fake.git",
      },
      syncType: "Manual",
      autoImageBuildEnableStatus: "Enabled",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await catalogsCreateOrUpdateAdo();
  await catalogsCreateOrUpdateGitHub();
}

main().catch(console.error);
