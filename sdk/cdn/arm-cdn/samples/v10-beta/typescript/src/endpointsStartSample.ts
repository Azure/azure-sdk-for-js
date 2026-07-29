// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts an existing CDN endpoint that is on a stopped state.
 *
 * @summary starts an existing CDN endpoint that is on a stopped state.
 * x-ms-original-file: 2025-12-01/Endpoints_Start.json
 */
async function endpointsStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.start("RG", "profile1", "endpoint1");
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsStart();
}

main().catch(console.error);
