// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a node customization resource. This will create a new version.
 *
 * @summary create or update a node customization resource. This will create a new version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_CreateOrUpdate.json
 */
async function nodeCustomizationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.nodeCustomizations.createOrUpdate("rg1", "my-node-customization", {
    properties: {
      containerImages: ["redis:8.0.0"],
      customizationScripts: [
        {
          name: "initialize-node",
          executionPoint: "NodeImageBuildTime",
          scriptType: "Bash",
          script: 'echo "test node customization" > /var/log/test-node-customization.txt',
        },
      ],
      identityProfile: {},
    },
    tags: { team: "blue" },
    location: "westus2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nodeCustomizationsCreateOrUpdate();
}

main().catch(console.error);
