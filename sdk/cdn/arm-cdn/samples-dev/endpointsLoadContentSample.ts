// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LoadParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Pre-loads a content to CDN. Available for Verizon Profiles.
 *
 * @summary Pre-loads a content to CDN. Available for Verizon Profiles.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Endpoints_LoadContent.json
 */
async function endpointsLoadContent(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const contentFilePaths: LoadParameters = { contentPaths: ["/folder1"] };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.beginLoadContentAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    contentFilePaths,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsLoadContent();
}

main().catch(console.error);
