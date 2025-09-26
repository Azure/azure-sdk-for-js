// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the ResourceGuardProxy
 *
 * @summary deletes the ResourceGuardProxy
 * x-ms-original-file: 2025-07-01/ResourceGuardProxyCRUD/DeleteResourceGuardProxy.json
 */
async function deleteResourceGuardProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.dppResourceGuardProxy.delete(
    "SampleResourceGroup",
    "sampleVault",
    "swaggerExample",
  );
}

async function main(): Promise<void> {
  await deleteResourceGuardProxy();
}

main().catch(console.error);
