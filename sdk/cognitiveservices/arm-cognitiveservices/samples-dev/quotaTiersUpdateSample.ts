// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  QuotaTier} from "@azure/arm-cognitiveservices";
import {
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @summary Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-09-01/examples/UpdateQuotaTier.json
 */
async function updateTheQuotaTierResourceForASubscription(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const defaultParam = "default";
  const tier: QuotaTier = {
    properties: { tierUpgradePolicy: "NoAutoUpgrade" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.quotaTiers.update(defaultParam, tier);
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheQuotaTierResourceForASubscription();
}

main().catch(console.error);
