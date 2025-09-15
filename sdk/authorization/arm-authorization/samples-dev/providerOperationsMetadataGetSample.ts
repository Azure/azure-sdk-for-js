// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets provider operations metadata for the specified resource provider.
 *
 * @summary Gets provider operations metadata for the specified resource provider.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetProviderOperationsRP.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listProviderOperationsMetadataForResourceProvider(): Promise<void> {
  const resourceProviderNamespace = "resourceProviderNamespace";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.providerOperationsMetadataOperations.get(resourceProviderNamespace);
  console.log(result);
}

async function main(): Promise<void> {
  await listProviderOperationsMetadataForResourceProvider();
}

main().catch(console.error);
