// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a node customization resource. This will create a new version.
 *
 * @summary create or update a node customization resource. This will create a new version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_CreateOrUpdate.json
 */
async function nodeCustomizationsCreateOrUpdate() {
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

async function main() {
  await nodeCustomizationsCreateOrUpdate();
}

main().catch(console.error);
