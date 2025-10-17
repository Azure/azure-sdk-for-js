// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys.
 *
 * @summary lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_ListByResourceGroup_MaximumSet_Gen.json
 */
async function sshPublicKeyListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sshPublicKeyResources.listByResourceGroup("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys.
 *
 * @summary lists all of the SSH public keys in the specified resource group. Use the nextLink property in the response to get the next page of SSH public keys.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_ListByResourceGroup_MinimumSet_Gen.json
 */
async function sshPublicKeyListByResourceGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sshPublicKeyResources.listByResourceGroup("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sshPublicKeyListByResourceGroupMaximumSetGen();
  await sshPublicKeyListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
