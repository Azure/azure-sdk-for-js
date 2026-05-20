// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @summary gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 * x-ms-original-file: 2026-01-15-preview/GetQuotaTier.json
 */
async function getTheQuotaTierInformationForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.quotaTiers.get("default");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheQuotaTierInformationForASubscription();
}

main().catch(console.error);
