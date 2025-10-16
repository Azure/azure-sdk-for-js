// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a EnclaveConnectionResource
 *
 * @summary update a EnclaveConnectionResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Update.json
 */
async function enclaveConnectionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveConnection.update("rgopenapi", "TestMyEnclaveConnection", {
    tags: { sampletag: "samplevalue" },
    properties: { sourceCidr: "10.0.0.0/24" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await enclaveConnectionUpdate();
}

main().catch(console.error);
