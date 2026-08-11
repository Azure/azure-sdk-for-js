// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the custom services list. The list of custom services provided shall be overwritten.
 *
 * @summary updates the custom services list. The list of custom services provided shall be overwritten.
 * x-ms-original-file: 2026-03-15-preview/Compute/updateCustomServices.json
 */
async function updateCustomServices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.computeOperations.updateCustomServices("testrg123", "workspaces123", "compute123", [
    {
      name: "rstudio-workbench",
      docker: { privileged: true },
      endpoints: [
        { name: "connect", hostIp: undefined, published: 4444, target: 8787, protocol: "http" },
      ],
      environmentVariables: {
        RSP_LICENSE: { type: "local", value: "XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX" },
      },
      image: { type: "docker", reference: "ghcr.io/azure/rstudio-workbench:latest" },
      volumes: [
        { type: "bind", readOnly: true, source: "/mnt/azureuser/", target: "/home/testuser/" },
      ],
    },
  ]);
}

async function main() {
  await updateCustomServices();
}

main().catch(console.error);
