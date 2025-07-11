// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Retention Policy
 *
 * @summary delete a Retention Policy
 * x-ms-original-file: 2025-04-01-preview/RetentionPolicies_Delete_MaximumSet_Gen.json
 */
async function retentionPoliciesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.retentionPolicies.delete("rgdurabletask", "testcheduler");
}

async function main() {
  await retentionPoliciesDeleteMaximumSet();
}

main().catch(console.error);
