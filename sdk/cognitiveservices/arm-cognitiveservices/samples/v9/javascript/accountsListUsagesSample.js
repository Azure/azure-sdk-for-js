// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get usages for the requested Cognitive Services account
 *
 * @summary get usages for the requested Cognitive Services account
 * x-ms-original-file: 2026-07-01/GetUsages.json
 */
async function getUsages() {
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
 * x-ms-original-file: 2026-07-01/GetUsagesClassicScope.json
 */
async function getUsagesClassicScope() {
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
 * x-ms-original-file: 2026-07-01/GetUsagesDataZoneScope.json
 */
async function getUsagesDataZoneScope() {
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
 * x-ms-original-file: 2026-07-01/GetUsagesGlobalScope.json
 */
async function getUsagesGlobalScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.listUsages("myResourceGroup", "TestUsage02");
  console.log(result);
}

async function main() {
  await getUsages();
  await getUsagesClassicScope();
  await getUsagesDataZoneScope();
  await getUsagesGlobalScope();
}

main().catch(console.error);
