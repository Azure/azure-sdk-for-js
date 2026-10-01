// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service.
 *
 * @summary initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service.
 * x-ms-original-file: 2026-02-01-preview/GenerateRecommendations.json
 */
async function generateRecommendations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  await client.recommendations.generate();
}

async function main() {
  await generateRecommendations();
}

main().catch(console.error);
