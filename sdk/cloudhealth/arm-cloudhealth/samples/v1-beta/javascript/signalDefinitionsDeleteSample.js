// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a SignalDefinition
 *
 * @summary delete a SignalDefinition
 * x-ms-original-file: 2025-05-01-preview/SignalDefinitions_Delete.json
 */
async function signalDefinitionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.signalDefinitions.delete("rgopenapi", "model1", "sig");
}

async function main() {
  await signalDefinitionsDelete();
}

main().catch(console.error);
