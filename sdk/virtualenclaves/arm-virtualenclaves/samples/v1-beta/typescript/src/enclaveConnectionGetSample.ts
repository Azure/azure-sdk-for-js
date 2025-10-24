// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a EnclaveConnectionResource
 *
 * @summary get a EnclaveConnectionResource
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Get.json
 */
async function enclaveConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveConnection.get("rgopenapi", "TestMyEnclaveConnection");
  console.log(result);
}

async function main(): Promise<void> {
  await enclaveConnectionGet();
}

main().catch(console.error);
