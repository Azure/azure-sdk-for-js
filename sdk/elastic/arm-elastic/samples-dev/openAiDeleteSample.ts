// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities.
 *
 * @summary Delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/OpenAI_Delete.json
 */
async function openAiDelete(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const integrationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.openAI.delete(
    resourceGroupName,
    monitorName,
    integrationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await openAiDelete();
}

main().catch(console.error);
