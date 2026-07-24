// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get recommended signal configurations for a given Entity (only applicable for Entities representing Azure resources)
 *
 * @summary get recommended signal configurations for a given Entity (only applicable for Entities representing Azure resources)
 * x-ms-original-file: 2026-05-01-preview/Entities_GetSignalRecommendations.json
 */
async function entitiesGetSignalRecommendations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.getSignalRecommendations(
    "online-store-rg",
    "online-store",
    "orders-db",
  );
  console.log(result);
}

async function main() {
  await entitiesGetSignalRecommendations();
}

main().catch(console.error);
