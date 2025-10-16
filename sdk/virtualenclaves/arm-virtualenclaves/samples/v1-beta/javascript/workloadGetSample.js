// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadResource
 *
 * @summary get a WorkloadResource
 * x-ms-original-file: 2025-05-01-preview/Workload_Get.json
 */
async function workloadGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.workload.get("rgopenapi", "TestMyEnclave", "TestMyWorkload");
  console.log(result);
}

async function main() {
  await workloadGet();
}

main().catch(console.error);
