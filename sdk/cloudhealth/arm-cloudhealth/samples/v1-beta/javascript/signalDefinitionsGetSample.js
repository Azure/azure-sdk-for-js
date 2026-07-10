// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SignalDefinition
 *
 * @summary get a SignalDefinition
 * x-ms-original-file: 2026-05-01-preview/SignalDefinitions_Get.json
 */
async function signalDefinitionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.signalDefinitions.get(
    "online-store-rg",
    "online-store",
    "sql-cpu-percent",
  );
  console.log(result);
}

async function main() {
  await signalDefinitionsGet();
}

main().catch(console.error);
