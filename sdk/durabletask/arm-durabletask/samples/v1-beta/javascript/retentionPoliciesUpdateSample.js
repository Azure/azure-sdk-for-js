// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Retention Policy
 *
 * @summary update a Retention Policy
 * x-ms-original-file: 2025-04-01-preview/RetentionPolicies_Update_MaximumSet_Gen.json
 */
async function retentionPoliciesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.retentionPolicies.update("rgdurabletask", "testscheduler", {
    properties: {
      retentionPolicies: [
        { retentionPeriodInDays: 30 },
        { retentionPeriodInDays: 10, orchestrationState: "Failed" },
        { retentionPeriodInDays: 24, orchestrationState: "Completed" },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await retentionPoliciesUpdateMaximumSet();
}

main().catch(console.error);
