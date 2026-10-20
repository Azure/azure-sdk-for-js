// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the label revision histories for a Container App.
 *
 * @summary lists the label revision histories for a Container App.
 * x-ms-original-file: 2026-07-01/LabelHistory_List.json
 */
async function listContainerAppAllLabelHistory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsLabelHistory.listLabelHistory(
    "rg",
    "testContainerApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppAllLabelHistory();
}

main().catch(console.error);
