// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes a content from CDN.
 *
 * @summary removes a content from CDN.
 * x-ms-original-file: 2025-12-01/Endpoints_PurgeContent.json
 */
async function endpointsPurgeContent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.endpoints.purgeContent("RG", "profile1", "endpoint1", {
    contentPaths: ["/folder1"],
  });
}

async function main(): Promise<void> {
  await endpointsPurgeContent();
}

main().catch(console.error);
