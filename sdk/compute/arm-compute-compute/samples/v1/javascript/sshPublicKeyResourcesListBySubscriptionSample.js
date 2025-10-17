// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 *
 * @summary lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_ListBySubscription_MaximumSet_Gen.json
 */
async function sshPublicKeyListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sshPublicKeyResources.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 *
 * @summary lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_ListBySubscription_MinimumSet_Gen.json
 */
async function sshPublicKeyListBySubscriptionMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sshPublicKeyResources.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sshPublicKeyListBySubscriptionMaximumSetGen();
  await sshPublicKeyListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
