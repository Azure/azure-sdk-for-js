// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get OpenAI integration rule for a given monitor resource.
 *
 * @summary Get OpenAI integration rule for a given monitor resource.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_Get.json
 */

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function openAiGet(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const integrationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.get(resourceGroupName, monitorName, integrationName);
  console.log(result);
}

async function main(): Promise<void> {
  await openAiGet();
}

main().catch(console.error);
