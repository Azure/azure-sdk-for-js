// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patches a managed certificate. Oly patching of tags is supported
 *
 * @summary patches a managed certificate. Oly patching of tags is supported
 * x-ms-original-file: 2025-10-02-preview/ManagedCertificates_Patch.json
 */
async function patchManagedCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedCertificates.update(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
    { tags: { tag1: "value1", tag2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchManagedCertificate();
}

main().catch(console.error);
