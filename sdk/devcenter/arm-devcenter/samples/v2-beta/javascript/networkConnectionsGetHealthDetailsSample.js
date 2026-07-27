// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets health check status details.
 *
 * @summary gets health check status details.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_GetHealthDetails.json
 */
async function networkConnectionsGetHealthDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.getHealthDetails("rg1", "eastusnetwork");
  console.log(result);
}

async function main() {
  await networkConnectionsGetHealthDetails();
}

main().catch(console.error);
