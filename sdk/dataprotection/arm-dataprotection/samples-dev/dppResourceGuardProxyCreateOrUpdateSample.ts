// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or Updates a ResourceGuardProxy
 *
 * @summary Creates or Updates a ResourceGuardProxy
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/ResourceGuardProxyCRUD/PutResourceGuardProxy.json
 */

import type { ResourceGuardProxyBaseResource } from "@azure/arm-dataprotection";
import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createResourceGuardProxy(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const vaultName = "sampleVault";
  const resourceGuardProxyName = "swaggerExample";
  const parameters: ResourceGuardProxyBaseResource = {
    properties: {
      resourceGuardResourceId:
        "/subscriptions/f9e67185-f313-4e79-aa71-6458d429369d/resourceGroups/ResourceGuardSecurityAdminRG/providers/Microsoft.DataProtection/resourceGuards/ResourceGuardTestResource",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppResourceGuardProxy.createOrUpdate(
    resourceGroupName,
    vaultName,
    resourceGuardProxyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createResourceGuardProxy();
}

main().catch(console.error);
