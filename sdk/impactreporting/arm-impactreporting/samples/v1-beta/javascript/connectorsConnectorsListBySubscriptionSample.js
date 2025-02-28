// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Connector resources by subscription ID
 *
 * @summary list Connector resources by subscription ID
 * x-ms-original-file: 2024-05-01-preview/Connectors_ListBySubscription.json
 */
async function connectorsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74f5e23f-d4d9-410a-bb4d-8f0608adb10d";
  const client = new ImpactClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.connectors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await connectorsListBySubscription();
}

main().catch(console.error);
