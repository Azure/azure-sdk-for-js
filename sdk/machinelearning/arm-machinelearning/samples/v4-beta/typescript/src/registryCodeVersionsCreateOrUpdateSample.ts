// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update version.
 *
 * @summary create or update version.
 * x-ms-original-file: 2025-12-01/Registry/CodeVersion/createOrUpdate.json
 */
async function createOrUpdateRegistryCodeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeVersions.createOrUpdate(
    "test-rg",
    "my-aml-registry",
    "string",
    "string",
    {
      properties: {
        description: "string",
        codeUri: "https://blobStorage/folderName",
        isAnonymous: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryCodeVersion();
}

main().catch(console.error);
