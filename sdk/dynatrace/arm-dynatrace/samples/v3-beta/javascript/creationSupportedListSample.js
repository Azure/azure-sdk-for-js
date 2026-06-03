// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to informs if the current subscription is being already monitored for selected Dynatrace environment.
 *
 * @summary informs if the current subscription is being already monitored for selected Dynatrace environment.
 * x-ms-original-file: 2024-04-24/CreationSupported_List.json
 */
async function creationSupportedList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.creationSupported.list("00000000-0000-0000-0000");
  console.log(result);
}

async function main() {
  await creationSupportedList();
}

main().catch(console.error);
