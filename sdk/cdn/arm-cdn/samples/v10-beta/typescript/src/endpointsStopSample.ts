// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops an existing running CDN endpoint.
 *
 * @summary stops an existing running CDN endpoint.
 * x-ms-original-file: 2025-12-01/Endpoints_Stop.json
 */
async function endpointsStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.stop("RG", "profile1", "endpoint1");
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsStop();
}

main().catch(console.error);
