// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get OpenAI integration status for a given integration.
 *
 * @summary Get OpenAI integration status for a given integration.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_GetStatus.json
 */
async function openAiGetStatus(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const integrationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.getStatus(resourceGroupName, monitorName, integrationName);
  console.log(result);
}

async function main(): Promise<void> {
  await openAiGetStatus();
}

main().catch(console.error);
