// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing origin within an origin group.
 *
 * @summary updates an existing origin within an origin group.
 * x-ms-original-file: 2025-12-01/AFDOrigins_Update.json
 */
async function afdOriginsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.update("RG", "profile1", "origingroup1", "origin1", {
    enabledState: "Enabled",
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await afdOriginsUpdate();
}

main().catch(console.error);
