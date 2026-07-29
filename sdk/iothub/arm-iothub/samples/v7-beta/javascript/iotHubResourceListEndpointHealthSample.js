// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the health for routing endpoints.
 *
 * @summary get the health for routing endpoints.
 * x-ms-original-file: 2026-03-01-preview/iothub_routingendpointhealth.json
 */
async function iotHubResourceGetEndpointHealth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iotHubResource.listEndpointHealth("myResourceGroup", "testHub")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await iotHubResourceGetEndpointHealth();
}

main().catch(console.error);
