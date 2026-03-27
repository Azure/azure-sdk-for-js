// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get usages for the requested Cognitive Services account
 *
 * @summary get usages for the requested Cognitive Services account
 * x-ms-original-file: 2026-01-15-preview/GetUsages.json
 */
async function getUsages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listUsages("myResourceGroup", "TestUsage02");
  console.log(result);
}

/**
 * This sample demonstrates how to get usages for the requested Cognitive Services account
 *
 * @summary get usages for the requested Cognitive Services account
 * x-ms-original-file: 2026-01-15-preview/GetUsagesClassicScope.json
 */
async function getUsagesClassicScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listUsages("myResourceGroup", "TestUsage02");
  console.log(result);
}

/**
 * This sample demonstrates how to get usages for the requested Cognitive Services account
 *
 * @summary get usages for the requested Cognitive Services account
 * x-ms-original-file: 2026-01-15-preview/GetUsagesDataZoneScope.json
 */
async function getUsagesDataZoneScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listUsages("myResourceGroup", "TestUsage02");
  console.log(result);
}

/**
 * This sample demonstrates how to get usages for the requested Cognitive Services account
 *
 * @summary get usages for the requested Cognitive Services account
 * x-ms-original-file: 2026-01-15-preview/GetUsagesGlobalScope.json
 */
async function getUsagesGlobalScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listUsages("myResourceGroup", "TestUsage02");
  console.log(result);
}

async function main(): Promise<void> {
  await getUsages();
  await getUsagesClassicScope();
  await getUsagesDataZoneScope();
  await getUsagesGlobalScope();
}

main().catch(console.error);
