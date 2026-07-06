// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a dataController resource
 *
 * @summary updates a dataController resource
 * x-ms-original-file: 2026-03-01-preview/UpdateDataController.json
 */
async function updatesADataControllerTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.dataControllers.patchDataController("testrg", "testdataController1", {
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await updatesADataControllerTags();
}

main().catch(console.error);
