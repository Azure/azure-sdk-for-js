// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Certificate.
 *
 * @summary deletes the specified Certificate.
 * x-ms-original-file: 2025-10-02-preview/Certificate_Delete.json
 */
async function deleteCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.certificates.delete("examplerg", "testcontainerenv", "certificate-firendly-name");
}

async function main(): Promise<void> {
  await deleteCertificate();
}

main().catch(console.error);
