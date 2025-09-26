// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a ResourceGuardProxy
 *
 * @summary creates or Updates a ResourceGuardProxy
 * x-ms-original-file: 2025-07-01/ResourceGuardProxyCRUD/PutResourceGuardProxy.json
 */
async function createResourceGuardProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5e13b949-1218-4d18-8b99-7e12155ec4f7";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppResourceGuardProxy.createOrUpdate(
    "SampleResourceGroup",
    "sampleVault",
    "swaggerExample",
    {
      properties: {
        resourceGuardResourceId:
          "/subscriptions/f9e67185-f313-4e79-aa71-6458d429369d/resourceGroups/ResourceGuardSecurityAdminRG/providers/Microsoft.DataProtection/resourceGuards/ResourceGuardTestResource",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createResourceGuardProxy();
}

main().catch(console.error);
