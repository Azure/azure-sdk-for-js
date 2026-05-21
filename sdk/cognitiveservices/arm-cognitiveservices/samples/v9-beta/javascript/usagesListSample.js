// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get usages for the requested subscription
 *
 * @summary get usages for the requested subscription
 * x-ms-original-file: 2026-01-15-preview/ListUsages.json
 */
async function getUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get usages for the requested subscription
 *
 * @summary get usages for the requested subscription
 * x-ms-original-file: 2026-01-15-preview/ListUsagesClassicScope.json
 */
async function getUsagesClassicScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get usages for the requested subscription
 *
 * @summary get usages for the requested subscription
 * x-ms-original-file: 2026-01-15-preview/ListUsagesDataZoneScope.json
 */
async function getUsagesDataZoneScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get usages for the requested subscription
 *
 * @summary get usages for the requested subscription
 * x-ms-original-file: 2026-01-15-preview/ListUsagesGlobalScope.json
 */
async function getUsagesGlobalScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getUsages();
  await getUsagesClassicScope();
  await getUsagesDataZoneScope();
  await getUsagesGlobalScope();
}

main().catch(console.error);
