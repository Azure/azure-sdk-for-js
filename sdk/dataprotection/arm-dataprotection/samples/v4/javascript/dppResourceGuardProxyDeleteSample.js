// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the ResourceGuardProxy
 *
 * @summary deletes the ResourceGuardProxy
 * x-ms-original-file: 2025-07-01/ResourceGuardProxyCRUD/DeleteResourceGuardProxy.json
 */
async function deleteResourceGuardProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.dppResourceGuardProxy.delete("SampleResourceGroup", "sampleVault", "swaggerExample");
}

async function main() {
  await deleteResourceGuardProxy();
}

main().catch(console.error);
