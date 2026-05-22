// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update version.
 *
 * @summary create or update version.
 * x-ms-original-file: 2025-12-01/Workspace/DataVersionBase/createOrUpdate.json
 */
async function createOrUpdateWorkspaceDataVersionBase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.dataVersions.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      properties: {
        description: "string",
        dataType: "uri_file",
        dataUri: "string",
        isAnonymous: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceDataVersionBase();
}

main().catch(console.error);
