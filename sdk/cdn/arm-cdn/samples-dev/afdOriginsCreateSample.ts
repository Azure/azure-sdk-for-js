// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AFDOrigin } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new origin within the specified origin group.
 *
 * @summary Creates a new origin within the specified origin group.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDOrigins_Create.json
 */
async function afdOriginsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const originGroupName = "origingroup1";
  const originName = "origin1";
  const origin: AFDOrigin = {
    enabledState: "Enabled",
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "host1.foo.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.beginCreateAndWait(
    resourceGroupName,
    profileName,
    originGroupName,
    originName,
    origin,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdOriginsCreate();
}

main().catch(console.error);
