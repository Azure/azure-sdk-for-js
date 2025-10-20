// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadResource
 *
 * @summary delete a WorkloadResource
 * x-ms-original-file: 2025-05-01-preview/Workload_Delete.json
 */
async function workloadDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  await client.workload.delete("rgopenapi", "TestMyEnclave", "TestMyWorkload");
}

async function main() {
  await workloadDelete();
}

main().catch(console.error);
