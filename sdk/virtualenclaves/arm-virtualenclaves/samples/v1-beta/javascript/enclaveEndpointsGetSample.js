// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a EnclaveEndpointResource
 *
 * @summary get a EnclaveEndpointResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Get.json
 */
async function enclaveEndpointsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveEndpoints.get(
    "rgopenapi",
    "TestMyEnclave",
    "TestMyEnclaveEndpoint",
  );
  console.log(result);
}

async function main() {
  await enclaveEndpointsGet();
}

main().catch(console.error);
