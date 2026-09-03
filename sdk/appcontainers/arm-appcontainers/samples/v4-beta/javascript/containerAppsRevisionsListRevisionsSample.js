// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Revisions for a given Container App.
 *
 * @summary get the Revisions for a given Container App.
 * x-ms-original-file: 2025-10-02-preview/Revisions_List.json
 */
async function listContainerAppRevisions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsRevisions.listRevisions("rg", "testcontainerApp0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppRevisions();
}

main().catch(console.error);
