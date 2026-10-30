// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all markup rules for a billing account and billing profile.
 *
 * @summary list all markup rules for a billing account and billing profile.
 * x-ms-original-file: 2026-06-01/MarkupRulesList.json
 */
async function markupRulesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.markupRules.list(
    "2af90bea-080c-438c-8977-17cddd5f115a:ef5ce3cf-f5af-4fcb-a5ed-c376e1d6d2b6",
    "cbf78278-f4b8-43d9-8f13-47112da1c63e",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await markupRulesList();
}

main().catch(console.error);
