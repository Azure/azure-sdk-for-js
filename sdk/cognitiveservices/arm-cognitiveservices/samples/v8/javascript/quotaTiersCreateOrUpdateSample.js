// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @summary Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-09-01/examples/CreateOrUpdateQuotaTier.json
 */
async function updateTheQuotaTierResourceForASubscription() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-00000-0000-0000-000000000000";
  const defaultParam = "default";
  const tier = {
    properties: { tierUpgradePolicy: "NoAutoUpgrade" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.quotaTiers.createOrUpdate(defaultParam, tier);
  console.log(result);
}

async function main() {
  await updateTheQuotaTierResourceForASubscription();
}

main().catch(console.error);
