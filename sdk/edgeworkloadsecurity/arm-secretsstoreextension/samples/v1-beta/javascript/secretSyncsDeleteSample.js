// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecretsStoreExtensionManagementClient } = require("@azure/arm-secretsstoreextension");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a SecretSync instance.
 *
 * @summary deletes a SecretSync instance.
 * x-ms-original-file: 2026-09-25-preview/SecretSyncs_Delete_MaximumSet_Gen.json
 */
async function secretSyncsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  await client.secretSyncs.delete("rg-ssc-example", "secretsync-ssc-example");
}

async function main() {
  await secretSyncsDelete();
}

main().catch(console.error);
