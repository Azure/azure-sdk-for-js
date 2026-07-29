// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-10-02-preview/Revisions_List1.json
 */
async function listContainerAppRevisions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsDiagnostics.listRevisions(
    "rg",
    "testcontainerApp0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppRevisions();
}

main().catch(console.error);
