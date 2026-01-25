// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upload certificate.
 *
 * @summary upload certificate.
 * x-ms-original-file: 2025-12-01-preview/UploadCertificate.json
 */
async function uploadCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.clusters.uploadCertificate("test-rg", "myCluster", {
    properties: { certificates: ["base64cert", "base64cert"] },
  });
}

async function main(): Promise<void> {
  await uploadCertificate();
}

main().catch(console.error);
