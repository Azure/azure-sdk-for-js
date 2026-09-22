// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specific impacted resource in the subscription by an event.
 *
 * @summary gets the specific impacted resource in the subscription by an event.
 * x-ms-original-file: 2025-05-01/ImpactedResources_Get.json
 */
async function impactedResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const result = await client.impactedResources.get("BC_1-FXZ", "abc-123-ghj-456");
  console.log(result);
}

async function main() {
  await impactedResourcesGet();
}

main().catch(console.error);
