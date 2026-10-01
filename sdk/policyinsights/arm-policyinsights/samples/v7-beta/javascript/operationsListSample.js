// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyInsightsClient } = require("@azure/arm-policyinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists available operations.
 *
 * @summary lists available operations.
 * x-ms-original-file: 2024-10-01/Operations_ListOperations.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main() {
  await listOperations();
}

main().catch(console.error);
