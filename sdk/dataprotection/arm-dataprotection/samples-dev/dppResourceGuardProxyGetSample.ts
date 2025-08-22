// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request
 *
 * @summary Returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/ResourceGuardProxyCRUD/GetResourceGuardProxy.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getResourceGuardProxy(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const vaultName = "sampleVault";
  const resourceGuardProxyName = "swaggerExample";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppResourceGuardProxy.get(
    resourceGroupName,
    vaultName,
    resourceGuardProxyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getResourceGuardProxy();
}

main().catch(console.error);
