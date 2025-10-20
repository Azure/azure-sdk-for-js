// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a WorkloadResource
 *
 * @summary create a WorkloadResource
 * x-ms-original-file: 2025-05-01-preview/Workload_CreateOrUpdate.json
 */
async function workloadCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.workload.createOrUpdate(
    "rgopenapi",
    "TestMyEnclave",
    "TestMyWorkload",
    {
      properties: { resourceGroupCollection: [] },
      tags: { TestKey: "TestValue" },
      location: "westcentralus",
    },
  );
  console.log(result);
}

async function main() {
  await workloadCreateOrUpdate();
}

main().catch(console.error);
