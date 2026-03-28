// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to from KeyVault, Refresh the certificate being used for authentication with the backend.
 *
 * @summary from KeyVault, Refresh the certificate being used for authentication with the backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshCertificate.json
 */
async function apiManagementRefreshCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.certificate.refreshSecret("rg1", "apimService1", "templateCertkv");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementRefreshCertificate();
}

main().catch(console.error);
