// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a EnclaveResource
 *
 * @summary get a EnclaveResource
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Get.json
 */
async function virtualEnclaveGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.virtualEnclave.get("rgopenapi", "TestMyEnclave");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualEnclaveGet();
}

main().catch(console.error);
