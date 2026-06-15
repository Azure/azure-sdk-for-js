// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing HorizonDb parameter group.
 *
 * @summary updates an existing HorizonDb parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_Update.json
 */
async function updateAHorizonDbParameterGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbParameterGroups.update(
    "exampleresourcegroup",
    "exampleparametergroup",
    {
      tags: { team: "updated-data-platform" },
      properties: {
        parameters: [
          { name: "max_connections", value: "300" },
          { name: "log_min_error_statement", value: "warning" },
        ],
        description: "Updated parameter group for high-throughput workloads",
        applyImmediately: true,
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateAHorizonDbParameterGroup();
}

main().catch(console.error);
