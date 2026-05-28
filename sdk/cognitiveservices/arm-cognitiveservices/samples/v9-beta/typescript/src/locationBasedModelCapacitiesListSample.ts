// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Location Based ModelCapacities.
 *
 * @summary list Location Based ModelCapacities.
 * x-ms-original-file: 2026-01-15-preview/ListLocationBasedModelCapacities.json
 */
async function listLocationBasedModelCapacities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedModelCapacities.list(
    "WestUS",
    "OpenAI",
    "ada",
    "1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Location Based ModelCapacities.
 *
 * @summary list Location Based ModelCapacities.
 * x-ms-original-file: 2026-01-15-preview/ListLocationBasedModelCapacitiesClassicScope.json
 */
async function listLocationBasedModelCapacitiesClassicScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedModelCapacities.list(
    "WestUS",
    "OpenAI",
    "ada",
    "1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Location Based ModelCapacities.
 *
 * @summary list Location Based ModelCapacities.
 * x-ms-original-file: 2026-01-15-preview/ListLocationBasedModelCapacitiesDataZoneScope.json
 */
async function listLocationBasedModelCapacitiesDataZoneScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedModelCapacities.list(
    "WestUS",
    "OpenAI",
    "ada",
    "1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Location Based ModelCapacities.
 *
 * @summary list Location Based ModelCapacities.
 * x-ms-original-file: 2026-01-15-preview/ListLocationBasedModelCapacitiesGlobalScope.json
 */
async function listLocationBasedModelCapacitiesGlobalScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedModelCapacities.list(
    "WestUS",
    "OpenAI",
    "ada",
    "1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listLocationBasedModelCapacities();
  await listLocationBasedModelCapacitiesClassicScope();
  await listLocationBasedModelCapacitiesDataZoneScope();
  await listLocationBasedModelCapacitiesGlobalScope();
}

main().catch(console.error);
