// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a HealthModel
 *
 * @summary create a HealthModel
 * x-ms-original-file: 2026-05-01-preview/HealthModels_Create.json
 */
async function healthModelsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.healthModels.create("online-store-rg", "online-store", {
    properties: {},
    identity: { type: "SystemAssigned" },
    tags: { environment: "production", team: "online-store" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await healthModelsCreate();
}

main().catch(console.error);
