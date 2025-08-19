// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an existing origin within an endpoint.
 *
 * @summary Deletes an existing origin within an endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Origins_Delete.json
 */
async function originsDelete(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const originName = "origin1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.origins.beginDeleteAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    originName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await originsDelete();
}

main().catch(console.error);
