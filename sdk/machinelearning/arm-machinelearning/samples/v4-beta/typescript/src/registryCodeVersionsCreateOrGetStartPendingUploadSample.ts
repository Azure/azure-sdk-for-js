// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a storage location and credential for the client to upload a code asset to.
 *
 * @summary generate a storage location and credential for the client to upload a code asset to.
 * x-ms-original-file: 2025-12-01/Registry/CodeVersion/createOrGetStartPendingUpload.json
 */
async function createOrGetStartPendingUploadRegistryCodeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeVersions.createOrGetStartPendingUpload(
    "test-rg",
    "registryName",
    "string",
    "string",
    { pendingUploadId: "string", pendingUploadType: "TemporaryBlobReference" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrGetStartPendingUploadRegistryCodeVersion();
}

main().catch(console.error);
