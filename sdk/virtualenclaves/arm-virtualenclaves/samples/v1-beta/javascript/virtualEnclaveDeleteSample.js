// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EnclaveResource
 *
 * @summary delete a EnclaveResource
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Delete.json
 */
async function virtualEnclaveDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  await client.virtualEnclave.delete("rgopenapi", "TestMyEnclave");
}

async function main() {
  await virtualEnclaveDelete();
}

main().catch(console.error);
