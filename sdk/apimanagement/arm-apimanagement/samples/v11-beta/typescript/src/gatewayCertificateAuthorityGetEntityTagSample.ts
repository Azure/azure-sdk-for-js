// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if Certificate entity is assigned to Gateway entity as Certificate Authority.
 *
 * @summary checks if Certificate entity is assigned to Gateway entity as Certificate Authority.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadGatewayCertificateAuthority.json
 */
async function apiManagementHeadGatewayCertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gatewayCertificateAuthority.getEntityTag("rg1", "apimService1", "gw1", "cert1");
}

async function main(): Promise<void> {
  await apiManagementHeadGatewayCertificateAuthority();
}

main().catch(console.error);
