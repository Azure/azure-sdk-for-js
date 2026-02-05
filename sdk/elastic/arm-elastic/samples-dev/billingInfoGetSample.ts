// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 *
 * @summary Retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/BillingInfo_Get.json
 */
async function billingInfoGet(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.billingInfo.get(resourceGroupName, monitorName);
  console.log(result);
}

async function main(): Promise<void> {
  await billingInfoGet();
}

main().catch(console.error);
