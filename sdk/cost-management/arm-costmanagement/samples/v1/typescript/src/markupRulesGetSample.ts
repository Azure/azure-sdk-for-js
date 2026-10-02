// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a markup rule by name for a billing account and billing profile.
 *
 * @summary get a markup rule by name for a billing account and billing profile.
 * x-ms-original-file: 2026-06-01/MarkupRulesGet.json
 */
async function markupRulesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.markupRules.get(
    "2af90bea-080c-438c-8977-17cddd5f115a:ef5ce3cf-f5af-4fcb-a5ed-c376e1d6d2b6",
    "cbf78278-f4b8-43d9-8f13-47112da1c63e",
    "markup-2022",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await markupRulesGet();
}

main().catch(console.error);
