// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AfdPurgeParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Removes a content from AzureFrontDoor.
 *
 * @summary Removes a content from AzureFrontDoor.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDEndpoints_PurgeContent.json
 */
async function afdEndpointsPurgeContent(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const contents: AfdPurgeParameters = {
    contentPaths: ["/folder1"],
    domains: ["endpoint1-abcdefghijklmnop.z01.azurefd.net"],
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdEndpoints.beginPurgeContentAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    contents,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdEndpointsPurgeContent();
}

main().catch(console.error);
