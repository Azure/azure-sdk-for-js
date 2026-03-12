// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new custom domain within an endpoint.
 *
 * @summary Creates a new custom domain within an endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/CustomDomains_Create.json
 */

import type { CustomDomainParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function customDomainsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const customDomainName = "www-someDomain-net";
  const customDomainProperties: CustomDomainParameters = {
    hostName: "www.someDomain.net",
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.customDomains.beginCreateAndWait(
    resourceGroupName,
    profileName,
    endpointName,
    customDomainName,
    customDomainProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await customDomainsCreate();
}

main().catch(console.error);
