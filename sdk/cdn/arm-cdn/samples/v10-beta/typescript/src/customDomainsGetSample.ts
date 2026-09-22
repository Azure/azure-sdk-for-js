// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing custom domain within an endpoint.
 *
 * @summary gets an existing custom domain within an endpoint.
 * x-ms-original-file: 2025-12-01/CustomDomains_Get.json
 */
async function customDomainsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.customDomains.get(
    "RG",
    "profile1",
    "endpoint1",
    "www-someDomain-net",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await customDomainsGet();
}

main().catch(console.error);
