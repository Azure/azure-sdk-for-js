// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing HorizonDB parameter group. Each connected pool's applyMethod setting controls whether dynamic parameter changes become effective immediately or remain pending until a customer-initiated pool Restart. Static parameter changes always remain pending until a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply pending changes. The operation fails with a conflict while a previous update to this parameter group is still being processed.
 *
 * @summary updates an existing HorizonDB parameter group. Each connected pool's applyMethod setting controls whether dynamic parameter changes become effective immediately or remain pending until a customer-initiated pool Restart. Static parameter changes always remain pending until a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply pending changes. The operation fails with a conflict while a previous update to this parameter group is still being processed.
 * x-ms-original-file: 2026-10-01-preview/ParameterGroups_Update.json
 */
async function updateAHorizonDBParameterGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.parameterGroups.update(
    "example-resource-group",
    "production-parameters",
    {
      tags: { environment: "production", team: "data-platform" },
      properties: {
        parameters: [
          { name: "application_name", value: "horizondb-production" },
          { name: "autovacuum", value: "off" },
          { name: "wal_receiver_timeout", value: "45000" },
          { name: "work_mem", value: "8192" },
          { name: "xmlbinary", value: "base64" },
        ],
        description: "Updated parameters for production transactional workloads",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAHorizonDBParameterGroup();
}

main().catch(console.error);
