// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @summary Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-09-01/examples/GetQuotaTier.json
 */
async function getTheQuotaTierInformationForASubscription(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const defaultParam = "default";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.quotaTiers.get(defaultParam);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheQuotaTierInformationForASubscription();
}

main().catch(console.error);
