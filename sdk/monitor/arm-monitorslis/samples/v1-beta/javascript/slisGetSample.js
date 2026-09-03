// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorslis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an SLI resource.
 *
 * @summary gets an SLI resource.
 * x-ms-original-file: 2025-03-01-preview/Slis_Get.json
 */
async function getSli() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.slis.get("testSG", "testSli");
  console.log(result);
}

async function main() {
  await getSli();
}

main().catch(console.error);
