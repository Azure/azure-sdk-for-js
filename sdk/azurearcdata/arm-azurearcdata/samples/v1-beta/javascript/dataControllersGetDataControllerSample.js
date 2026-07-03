// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves a dataController resource
 *
 * @summary retrieves a dataController resource
 * x-ms-original-file: 2026-03-01-preview/GetDataController.json
 */
async function getADataController() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.dataControllers.getDataController("testrg", "testdataController");
  console.log(result);
}

async function main() {
  await getADataController();
}

main().catch(console.error);
