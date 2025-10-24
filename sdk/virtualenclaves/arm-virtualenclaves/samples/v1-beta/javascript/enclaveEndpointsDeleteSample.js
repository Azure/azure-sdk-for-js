// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EnclaveEndpointResource
 *
 * @summary delete a EnclaveEndpointResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Delete.json
 */
async function enclaveEndpointsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  await client.enclaveEndpoints.delete("rgopenapi", "TestMyEnclave", "TestMyEnclaveEndpoint");
}

async function main() {
  await enclaveEndpointsDelete();
}

main().catch(console.error);
