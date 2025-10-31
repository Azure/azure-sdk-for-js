// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EnclaveConnectionResource
 *
 * @summary delete a EnclaveConnectionResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Delete.json
 */
async function enclaveConnectionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  await client.enclaveConnection.delete("rgopenapi", "TestMyEnclaveConnection");
}

async function main() {
  await enclaveConnectionDelete();
}

main().catch(console.error);
