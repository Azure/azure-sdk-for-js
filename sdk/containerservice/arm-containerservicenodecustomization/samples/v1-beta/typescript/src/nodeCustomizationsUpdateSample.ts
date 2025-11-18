// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a NodeCustomization
 *
 * @summary update a NodeCustomization
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Update.json
 */
async function nodeCustomizationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.nodeCustomizations.update("rg1", "my-node-customization", {
    tags: { key5558: "xufgvdnarflvwbcdkmhqhgbop" },
    properties: {
      containerImages: ["qmetlvqgbvhjnncyraxlhs"],
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
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nodeCustomizationsUpdate();
}

main().catch(console.error);
