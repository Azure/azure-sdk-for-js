// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Connector
 *
 * @summary update a Connector
 * x-ms-original-file: 2024-05-01-preview/Connectors_Update.json
 */
async function connectorsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74f5e23f-d4d9-410a-bb4d-8f0608adb10d";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.connectors.update("testconnector1", {
    properties: { connectorType: "AzureMonitor" },
  });
  console.log(result);
}

async function main() {
  await connectorsUpdate();
}

main().catch(console.error);
