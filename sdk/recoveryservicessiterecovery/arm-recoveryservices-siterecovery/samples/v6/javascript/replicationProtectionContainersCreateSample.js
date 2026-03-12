// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to create a protection container.
 *
 * @summary operation to create a protection container.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainers_Create.json
 */
async function createAProtectionContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionContainers.create(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    {
      properties: {
        providerSpecificInput: [
          { instanceType: "ReplicationProviderSpecificContainerCreationInput" },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAProtectionContainer();
}

main().catch(console.error);
