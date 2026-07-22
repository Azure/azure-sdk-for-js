// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enable https delivery of the custom domain.
 *
 * @summary enable https delivery of the custom domain.
 * x-ms-original-file: 2025-12-01/CustomDomains_EnableCustomHttpsUsingBYOC.json
 */
async function customDomainsEnableCustomHttpsUsingYourOwnCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.customDomains.enableCustomHttps(
    "RG",
    "profile1",
    "endpoint1",
    "www-someDomain-net",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to enable https delivery of the custom domain.
 *
 * @summary enable https delivery of the custom domain.
 * x-ms-original-file: 2025-12-01/CustomDomains_EnableCustomHttpsUsingCDNManagedCertificate.json
 */
async function customDomainsEnableCustomHttpsUsingCDNManagedCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.customDomains.enableCustomHttps(
    "RG",
    "profile1",
    "endpoint1",
    "www-someDomain-net",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await customDomainsEnableCustomHttpsUsingYourOwnCertificate();
  await customDomainsEnableCustomHttpsUsingCDNManagedCertificate();
}

main().catch(console.error);
