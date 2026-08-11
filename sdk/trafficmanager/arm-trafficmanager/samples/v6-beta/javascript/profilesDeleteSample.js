// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Traffic Manager profile.
 *
 * @summary deletes a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-DELETE.json
 */
async function profileDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.delete(
    "azuresdkfornetautoresttrafficmanager1323",
    "azuresdkfornetautoresttrafficmanager3880",
  );
  console.log(result);
}

async function main() {
  await profileDelete();
}

main().catch(console.error);
