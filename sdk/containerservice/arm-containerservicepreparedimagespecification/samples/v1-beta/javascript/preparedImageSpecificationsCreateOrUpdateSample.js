// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicepreparedimagespecification");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a prepared image specification resource with a client-provided version. Created versions are immutable; provide a different properties.version value to create a new version.
 *
 * @summary create or update a prepared image specification resource with a client-provided version. Created versions are immutable; provide a different properties.version value to create a new version.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_CreateOrUpdate.json
 */
async function preparedImageSpecificationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.preparedImageSpecifications.createOrUpdate(
    "rg1",
    "my-prepared-image-specification",
    {
      properties: {
        version: "20250101-abcd1234",
        containerImages: ["redis:8.0.0"],
        customizationScripts: [
          {
            name: "initialize-node",
            executionPoint: "NodeImageBuildTime",
            scriptType: "Bash",
            script:
              'echo "test prepared image specification" > /var/log/test-node-customization.txt',
          },
        ],
        identityProfile: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
        },
      },
      tags: { team: "blue" },
      location: "westus2",
    },
  );
  console.log(result);
}

async function main() {
  await preparedImageSpecificationsCreateOrUpdate();
}

main().catch(console.error);
