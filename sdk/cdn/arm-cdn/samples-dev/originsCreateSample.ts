// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new origin within the specified endpoint.
 *
 * @summary Creates a new origin within the specified endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Origins_Create.json
 */

import type { Origin } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function originsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const originName = "www-someDomain-net";
  const origin: Origin = {
    enabled: true,
    hostName: "www.someDomain.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "www.someDomain.net",
    priority: 1,
    privateLinkApprovalMessage: "Please approve the connection request for this Private Link",
    privateLinkLocation: "eastus",
    privateLinkResourceId:
      "/subscriptions/subid/resourcegroups/rg1/providers/Microsoft.Network/privateLinkServices/pls1",
    weight: 50,
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.origins.beginCreateAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    originName,
    origin,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await originsCreate();
}

main().catch(console.error);
