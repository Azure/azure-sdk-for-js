// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ValidateCustomDomainInput } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validates the custom domain mapping to ensure it maps to the correct CDN endpoint in DNS.
 *
 * @summary Validates the custom domain mapping to ensure it maps to the correct CDN endpoint in DNS.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Endpoints_ValidateCustomDomain.json
 */
async function endpointsValidateCustomDomain(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const customDomainProperties: ValidateCustomDomainInput = {
    hostName: "www.someDomain.com",
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.validateCustomDomain(
    resourceGroupName,
    profileName,
    endpointName,
    customDomainProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsValidateCustomDomain();
}

main().catch(console.error);
