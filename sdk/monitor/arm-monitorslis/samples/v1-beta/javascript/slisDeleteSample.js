// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorslis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an SLI resource.
 *
 * @summary deletes an SLI resource.
 * x-ms-original-file: 2025-03-01-preview/Slis_Delete.json
 */
async function deleteSli() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  await client.slis.delete("testSG", "testSli");
}

async function main() {
  await deleteSli();
}

main().catch(console.error);
