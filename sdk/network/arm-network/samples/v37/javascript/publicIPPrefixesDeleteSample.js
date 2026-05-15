// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified public IP prefix.
 *
 * @summary deletes the specified public IP prefix.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixDelete.json
 */
async function deletePublicIPPrefix() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.publicIPPrefixes.delete("rg1", "test-ipprefix");
}

async function main() {
  await deletePublicIPPrefix();
}

main().catch(console.error);
