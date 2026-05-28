// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @summary update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 * x-ms-original-file: 2026-01-15-preview/CreateOrUpdateQuotaTier.json
 */
async function updateTheQuotaTierResourceForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.quotaTiers.createOrUpdate("default", {
    properties: { tierUpgradePolicy: "NoAutoUpgrade" },
  });
  console.log(result);
}

async function main() {
  await updateTheQuotaTierResourceForASubscription();
}

main().catch(console.error);
