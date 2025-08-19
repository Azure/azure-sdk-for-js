// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AFDDomainUpdateParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing domain within a profile.
 *
 * @summary Updates an existing domain within a profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDCustomDomains_Update.json
 */
async function afdCustomDomainsUpdate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const customDomainName = "domain1";
  const customDomainUpdateProperties: AFDDomainUpdateParameters = {
    azureDnsZone: { id: "" },
    tlsSettings: {
      certificateType: "CustomerCertificate",
      minimumTlsVersion: "TLS12",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdCustomDomains.beginUpdateAndWait(
    resourceGroupName,
    profileName,
    customDomainName,
    customDomainUpdateProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdCustomDomainsUpdate();
}

main().catch(console.error);
