// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of ResourceGuardProxies associated with the vault
 *
 * @summary returns the list of ResourceGuardProxies associated with the vault
 * x-ms-original-file: 2025-07-01/ResourceGuardProxyCRUD/ListResourceGuardProxy.json
 */
async function getResourceGuardProxies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dppResourceGuardProxy.list(
    "SampleResourceGroup",
    "sampleVault",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getResourceGuardProxies();
}

main().catch(console.error);
