// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a Retention Policy
 *
 * @summary create or Update a Retention Policy
 * x-ms-original-file: 2025-04-01-preview/RetentionPolicies_CreateOrReplace_MaximumSet_Gen.json
 */
async function retentionPoliciesCreateOrReplaceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.retentionPolicies.createOrReplace("rgdurabletask", "testscheduler", {
    properties: {
      retentionPolicies: [
        { retentionPeriodInDays: 30 },
        { retentionPeriodInDays: 10, orchestrationState: "Failed" },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await retentionPoliciesCreateOrReplaceMaximumSet();
}

main().catch(console.error);
