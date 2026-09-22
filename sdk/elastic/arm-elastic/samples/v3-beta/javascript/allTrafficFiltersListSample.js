// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control.
 *
 * @summary list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control.
 * x-ms-original-file: 2025-06-01/AllTrafficFilters_list.json
 */
async function allTrafficFiltersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.allTrafficFilters.list("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await allTrafficFiltersList();
}

main().catch(console.error);
