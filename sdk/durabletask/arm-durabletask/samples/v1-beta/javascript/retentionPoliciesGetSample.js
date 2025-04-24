// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Retention Policy
 *
 * @summary get a Retention Policy
 * x-ms-original-file: 2025-04-01-preview/RetentionPolicies_Get_MaximumSet_Gen.json
 */
async function retentionPoliciesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.retentionPolicies.get("rgdurabletask", "testscheduler");
  console.log(result);
}

async function main() {
  await retentionPoliciesGetMaximumSet();
}

main().catch(console.error);
