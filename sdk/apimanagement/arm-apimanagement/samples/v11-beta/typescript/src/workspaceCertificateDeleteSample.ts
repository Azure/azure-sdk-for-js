// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific certificate.
 *
 * @summary deletes specific certificate.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceCertificate.json
 */
async function apiManagementDeleteWorkspaceCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceCertificate.delete("rg1", "apimService1", "wks1", "tempcert", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceCertificate();
}

main().catch(console.error);
