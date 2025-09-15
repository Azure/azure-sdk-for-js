// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the replication extension in the given vault.
 *
 * @summary creates the replication extension in the given vault.
 * x-ms-original-file: 2024-09-01/ReplicationExtension_Create.json
 */
async function putsTheReplicationExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.replicationExtension.create(
    "rgrecoveryservicesdatareplication",
    "4",
    "g16yjJ",
    {
      properties: {
        customProperties: {
          instanceType: "ReplicationExtensionModelCustomProperties",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await putsTheReplicationExtension();
}

main().catch(console.error);
