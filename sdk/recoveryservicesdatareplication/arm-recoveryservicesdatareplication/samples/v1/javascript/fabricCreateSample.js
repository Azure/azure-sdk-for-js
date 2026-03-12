// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the fabric.
 *
 * @summary creates the fabric.
 * x-ms-original-file: 2024-09-01/Fabric_Create.json
 */
async function putsTheFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabric.create("rgswagger_2024-09-01", "wPR", {
    location: "tqygutlpob",
    properties: {
      customProperties: {
        instanceType: "FabricModelCustomProperties",
      },
    },
  });
  console.log(result);
}

async function main() {
  await putsTheFabric();
}

main().catch(console.error);
