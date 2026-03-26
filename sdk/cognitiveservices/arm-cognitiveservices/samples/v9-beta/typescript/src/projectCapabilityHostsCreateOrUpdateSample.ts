// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update project capabilityHost.
 *
 * @summary create or update project capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/ProjectCapabilityHost/createOrUpdate.json
 */
async function createOrUpdateProjectCapabilityHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectCapabilityHosts.createOrUpdate(
    "test-rg",
    "account-1",
    "project-1",
    "capabilityHostName",
    {
      properties: {
        aiServicesConnections: ["aoai_connection"],
        storageConnections: ["blob_connection"],
        threadStorageConnections: ["aca_connection"],
        vectorStoreConnections: ["acs_connection"],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateProjectCapabilityHost();
}

main().catch(console.error);
