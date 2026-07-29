// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a sandbox custom image.
 *
 * @summary updates a sandbox custom image.
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImageUpdate.json
 */
async function kustoSandboxCustomImagesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.update(
    "kustorptest",
    "kustoCluster",
    "customImage8",
    { languageVersion: "3.10.8", requirementsFileContent: "Requests", language: "Python" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoSandboxCustomImagesUpdate();
}

main().catch(console.error);
