// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 *
 * @summary lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 * x-ms-original-file: 2025-05-01-preview/Organizations_List_MaximumSet_Gen.json
 */
async function organizationsListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.list("ruxvg@xqkmdhrnoo.hlmbpm", "egh")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 *
 * @summary lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created
 * x-ms-original-file: 2025-05-01-preview/Organizations_List_MinimumSet_Gen.json
 */
async function organizationsListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.list("ruxvg@xqkmdhrnoo.hlmbpm", "egh")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationsListMaximumSetGen();
  await organizationsListMinimumSetGen();
}

main().catch(console.error);
