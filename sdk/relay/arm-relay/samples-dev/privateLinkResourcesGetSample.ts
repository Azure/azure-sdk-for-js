// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource by a specified group name for a container registry.
 *
 * @summary gets a private link resource by a specified group name for a container registry.
 * x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesGet.json
 */
async function nameSpacePrivateEndPointConnectionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "resourcegroup",
    "example-RelayNamespace-5849",
    "{PrivateLinkResource name}",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpacePrivateEndPointConnectionGet();
}

main().catch(console.error);
