// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SignalDefinition resources by HealthModel
 *
 * @summary list SignalDefinition resources by HealthModel
 * x-ms-original-file: 2025-05-01-preview/SignalDefinitions_ListByHealthModel.json
 */
async function signalDefinitionsListByHealthModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalDefinitions.listByHealthModel(
    "rgopenapi",
    "myHealthModel",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await signalDefinitionsListByHealthModel();
}

main().catch(console.error);
