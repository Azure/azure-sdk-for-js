// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SignalDefinition
 *
 * @summary get a SignalDefinition
 * x-ms-original-file: 2025-05-01-preview/SignalDefinitions_Get.json
 */
async function signalDefinitionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.signalDefinitions.get("rgopenapi", "myHealthModel", "sig1");
  console.log(result);
}

async function main() {
  await signalDefinitionsGet();
}

main().catch(console.error);
