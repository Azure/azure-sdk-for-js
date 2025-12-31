// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request
 *
 * @summary returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request
 * x-ms-original-file: 2025-07-01/ResourceGuardProxyCRUD/GetResourceGuardProxy.json
 */
async function getResourceGuardProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppResourceGuardProxy.get(
    "SampleResourceGroup",
    "sampleVault",
    "swaggerExample",
  );
  console.log(result);
}

async function main() {
  await getResourceGuardProxy();
}

main().catch(console.error);
