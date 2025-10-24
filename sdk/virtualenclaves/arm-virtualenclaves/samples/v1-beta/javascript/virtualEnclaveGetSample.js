// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a EnclaveResource
 *
 * @summary get a EnclaveResource
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Get.json
 */
async function virtualEnclaveGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.virtualEnclave.get("rgopenapi", "TestMyEnclave");
  console.log(result);
}

async function main() {
  await virtualEnclaveGet();
}

main().catch(console.error);
