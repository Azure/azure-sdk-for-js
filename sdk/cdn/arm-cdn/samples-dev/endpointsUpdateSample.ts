// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EndpointUpdateParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update custom domains, use the Update Custom Domain operation.
 *
 * @summary Updates an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update custom domains, use the Update Custom Domain operation.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Endpoints_Update.json
 */
async function endpointsUpdate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const endpointUpdateProperties: EndpointUpdateParameters = {
    tags: { additionalProperties: "Tag1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.beginUpdateAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    endpointUpdateProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsUpdate();
}

main().catch(console.error);
