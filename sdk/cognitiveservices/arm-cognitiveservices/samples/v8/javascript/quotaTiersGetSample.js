// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @summary Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-09-01/examples/GetQuotaTier.json
 */
async function getTheQuotaTierInformationForASubscription() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const defaultParam = "default";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.quotaTiers.get(defaultParam);
  console.log(result);
}

async function main() {
  await getTheQuotaTierInformationForASubscription();
}

main().catch(console.error);
