// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDB parameter group or replaces an existing parameter group.
 *
 * @summary creates a new HorizonDB parameter group or replaces an existing parameter group.
 * x-ms-original-file: 2026-10-01-preview/ParameterGroups_CreateOrReplace.json
 */
async function createOrReplaceAHorizonDBParameterGroupForAPostgreSQLVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.parameterGroups.createOrReplace(
    "example-resource-group",
    "production-parameters",
    {
      location: "eastus2",
      tags: { environment: "production" },
      properties: {
        postgreSqlVersion: "17",
        parameters: [
          { name: "application_name", value: "horizondb-production" },
          { name: "autovacuum", value: "off" },
          { name: "wal_receiver_timeout", value: "45000" },
          { name: "work_mem", value: "8192" },
          { name: "xmlbinary", value: "base64" },
        ],
        description: "Parameters for production transactional workloads",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceAHorizonDBParameterGroupForAPostgreSQLVersion();
}

main().catch(console.error);
