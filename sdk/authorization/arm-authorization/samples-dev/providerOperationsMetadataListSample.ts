// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets provider operations metadata for all resource providers.
 *
 * @summary gets provider operations metadata for all resource providers.
 * x-ms-original-file: 2022-04-01/GetAllProviderOperations.json
 */
async function listProviderOperationsMetadataForAllResourceProviders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.providerOperationsMetadata.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProviderOperationsMetadataForAllResourceProviders();
}

main().catch(console.error);
