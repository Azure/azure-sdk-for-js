// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 *
 * @summary Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/sshPublicKeyExamples/SshPublicKey_ListBySubscription_MaximumSet_Gen.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sshPublicKeyListBySubscriptionMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sshPublicKeys.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 *
 * @summary Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to get the next page of SSH public keys.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/sshPublicKeyExamples/SshPublicKey_ListBySubscription_MinimumSet_Gen.json
 */
async function sshPublicKeyListBySubscriptionMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sshPublicKeys.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await sshPublicKeyListBySubscriptionMaximumSetGen();
  await sshPublicKeyListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
