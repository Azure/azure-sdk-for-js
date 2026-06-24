// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDB parameter group or updates an existing parameter group.
 *
 * @summary creates a new HorizonDB parameter group or updates an existing parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_CreateOrUpdate.json
 */
async function createOrUpdateAHorizonDBParameterGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbParameterGroups.createOrUpdate(
    "exampleresourcegroup",
    "exampleparametergroup",
    {
      location: "westus2",
      tags: { env: "dev", team: "data-platform" },
      properties: {
        parameters: [
          { name: "max_connections", value: "200" },
          { name: "log_min_error_statement", value: "error" },
          { name: "shared_buffers", value: "2000" },
        ],
        description: "Parameter group for high-throughput workloads",
        pgVersion: 17,
        applyImmediately: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAHorizonDBParameterGroup();
}

main().catch(console.error);
