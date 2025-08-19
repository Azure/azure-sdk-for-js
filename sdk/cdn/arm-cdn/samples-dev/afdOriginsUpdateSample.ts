// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an existing origin within an origin group.
 *
 * @summary Updates an existing origin within an origin group.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDOrigins_Update.json
 */

import type { AFDOriginUpdateParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function afdOriginsUpdate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const originGroupName = "origingroup1";
  const originName = "origin1";
  const originUpdateProperties: AFDOriginUpdateParameters = {
    enabledState: "Enabled",
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.beginUpdateAndWait(
    resourceGroupName,
    profileName,
    originGroupName,
    originName,
    originUpdateProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdOriginsUpdate();
}

main().catch(console.error);
