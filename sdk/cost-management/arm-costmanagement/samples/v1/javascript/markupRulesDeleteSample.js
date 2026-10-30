// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a markup rule for a billing account and billing profile.
 *
 * @summary delete a markup rule for a billing account and billing profile.
 * x-ms-original-file: 2026-06-01/MarkupRulesDelete.json
 */
async function markupRulesDelete() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.markupRules.delete(
    "2af90bea-080c-438c-8977-17cddd5f115a:ef5ce3cf-f5af-4fcb-a5ed-c376e1d6d2b6",
    "cbf78278-f4b8-43d9-8f13-47112da1c63e",
    "markup-2022",
  );
}

async function main() {
  await markupRulesDelete();
}

main().catch(console.error);
