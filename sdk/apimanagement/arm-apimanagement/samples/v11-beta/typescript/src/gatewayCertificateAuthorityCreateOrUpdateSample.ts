// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to assign Certificate entity to Gateway entity as Certificate Authority.
 *
 * @summary assign Certificate entity to Gateway entity as Certificate Authority.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGatewayCertificateAuthority.json
 */
async function apiManagementCreateGatewayCertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayCertificateAuthority.createOrUpdate(
    "rg1",
    "apimService1",
    "gw1",
    "cert1",
    { isTrusted: false },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGatewayCertificateAuthority();
}

main().catch(console.error);
