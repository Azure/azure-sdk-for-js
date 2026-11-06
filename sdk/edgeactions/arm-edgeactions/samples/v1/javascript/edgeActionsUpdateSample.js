// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags of an Edge Action. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. Do not include sku in PATCH requests; any supplied sku, including null or the existing value, is rejected.
 *
 * @summary updates the tags of an Edge Action. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. Do not include sku in PATCH requests; any supplied sku, including null or the existing value, is rejected.
 * x-ms-original-file: 2026-10-01/EdgeActions_Update.json
 */
async function updateEdgeAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActions.update("testrg", "edgeAction1", {
    tags: { environment: "production" },
  });
  console.log(result);
}

async function main() {
  await updateEdgeAction();
}

main().catch(console.error);
