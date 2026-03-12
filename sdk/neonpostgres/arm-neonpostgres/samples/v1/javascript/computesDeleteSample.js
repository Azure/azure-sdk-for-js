// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Compute
 *
 * @summary delete a Compute
 * x-ms-original-file: 2025-03-01/Computes_Delete_MaximumSet_Gen.json
 */
async function computesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.computes.delete("rgneon", "test-org", "entity-name", "entity-name", "entity-name");
}

async function main() {
  await computesDeleteMaximumSet();
}

main().catch(console.error);
