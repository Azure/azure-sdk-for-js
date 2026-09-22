// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a project catalog.
 *
 * @summary creates or updates a project catalog.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_CreateAdo.json
 */
async function projectCatalogsCreateOrUpdateAdo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.createOrUpdate(
    "rg1",
    "DevProject",
    "CentralCatalog",
    {
      adoGit: {
        path: "/templates",
        branch: "main",
        secretIdentifier: "https://contosokv.vault.azure.net/secrets/CentralRepoPat",
        uri: "https://contoso@dev.azure.com/contoso/contosoOrg/_git/centralrepo-fakecontoso",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a project catalog.
 *
 * @summary creates or updates a project catalog.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_CreateGitHub.json
 */
async function projectCatalogsCreateOrUpdateGitHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.createOrUpdate(
    "rg1",
    "DevProject",
    "CentralCatalog",
    {
      gitHub: {
        path: "/templates",
        branch: "main",
        secretIdentifier: "https://contosokv.vault.azure.net/secrets/CentralRepoPat",
        uri: "https://github.com/Contoso/centralrepo-fake.git",
      },
    },
  );
  console.log(result);
}

async function main() {
  await projectCatalogsCreateOrUpdateAdo();
  await projectCatalogsCreateOrUpdateGitHub();
}

main().catch(console.error);
