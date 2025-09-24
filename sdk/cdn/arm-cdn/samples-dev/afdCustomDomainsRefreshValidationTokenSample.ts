// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the domain validation token.
 *
 * @summary Updates the domain validation token.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDCustomDomains_RefreshValidationToken.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function afdCustomDomainsDelete(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const customDomainName = "domain1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdCustomDomains.beginRefreshValidationTokenAndWait(
    resourceGroupName,
    profileName,
    customDomainName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdCustomDomainsDelete();
}

main().catch(console.error);
