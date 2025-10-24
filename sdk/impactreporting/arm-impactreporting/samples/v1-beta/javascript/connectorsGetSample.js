// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Connector
 *
 * @summary get a Connector
 * x-ms-original-file: 2024-05-01-preview/Connectors_Get.json
 */
async function connectorsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74f5e23f-d4d9-410a-bb4d-8f0608adb10d";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.connectors.get("testconnector1");
  console.log(result);
}

async function main() {
  await connectorsGet();
}

main().catch(console.error);
