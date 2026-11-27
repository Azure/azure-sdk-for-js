// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts.
 *
 * @summary updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts.
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_Update.json
 */
async function updateZkpRollupTagsIdentityAndBootNode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.zkpRollups.update("testrg", "Jack", {
    tags: { env: "test" },
    identity: {
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/additionalReader":
          {},
      },
    },
    properties: { bootNodeIp: "10.0.0.4" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts.
 *
 * @summary updates rollup tags, identity attachments or configuration. Metadata-only updates complete synchronously. Configuration changes reconcile the rollup and existing partition asynchronously, preserving checkpoints and discovered contracts.
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_UpdateConfiguration.json
 */
async function updateZkpRollupConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.zkpRollups.update("testrg", "Jack", {
    properties: {
      tokenOwnerAccounts: ["0x2222222222222222222222222222222222222222"],
      bootNodeId:
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      bootNodeIp: "10.0.0.5",
      bootNodeP2PPort: 30304,
      bootNodeRpcPort: 8546,
    },
  });
  console.log(result);
}

async function main() {
  await updateZkpRollupTagsIdentityAndBootNode();
  await updateZkpRollupConfiguration();
}

main().catch(console.error);
