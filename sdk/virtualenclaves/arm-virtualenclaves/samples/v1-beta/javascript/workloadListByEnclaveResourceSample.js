// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list WorkloadResource resources by EnclaveResource
 *
 * @summary list WorkloadResource resources by EnclaveResource
 * x-ms-original-file: 2025-05-01-preview/Workload_ListByEnclaveResource.json
 */
async function workloadListByEnclaveResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workload.listByEnclaveResource("rgopenapi", "TestMyEnclave")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workloadListByEnclaveResource();
}

main().catch(console.error);
