// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Starts an existing CDN endpoint that is on a stopped state.
 *
 * @summary Starts an existing CDN endpoint that is on a stopped state.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Endpoints_Start.json
 */
async function endpointsStart(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.beginStartAndWait(
    resourceGroupName,
    profileName,
    endpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsStart();
}

main().catch(console.error);
