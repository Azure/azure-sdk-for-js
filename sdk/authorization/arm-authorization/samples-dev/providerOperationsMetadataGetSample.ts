// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets provider operations metadata for the specified resource provider.
 *
 * @summary gets provider operations metadata for the specified resource provider.
 * x-ms-original-file: 2022-04-01/GetProviderOperationsRP.json
 */
async function listProviderOperationsMetadataForResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.providerOperationsMetadata.get("resourceProviderNamespace");
  console.log(result);
}

async function main(): Promise<void> {
  await listProviderOperationsMetadataForResourceProvider();
}

main().catch(console.error);
