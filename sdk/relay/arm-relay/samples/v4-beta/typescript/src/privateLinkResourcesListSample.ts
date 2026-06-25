// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the private link resources for a container registry.
 *
 * @summary lists the private link resources for a container registry.
 * x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesList.json
 */
async function nameSpacePrivateLinkResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.privateLinkResources.list(
    "resourcegroup",
    "example-RelayNamespace-5849",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpacePrivateLinkResourcesGet();
}

main().catch(console.error);
