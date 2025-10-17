// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an SSH public key.
 *
 * @summary delete an SSH public key.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Delete_MaximumSet_Gen.json
 */
async function sshPublicKeyDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.sshPublicKeyResources.delete("rgcompute", "aaaaaaaaaa");
}

/**
 * This sample demonstrates how to delete an SSH public key.
 *
 * @summary delete an SSH public key.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Delete_MinimumSet_Gen.json
 */
async function sshPublicKeyDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.sshPublicKeyResources.delete("rgcompute", "aaaaaaaaaaaaaaaaaaa");
}

async function main(): Promise<void> {
  await sshPublicKeyDeleteMaximumSetGen();
  await sshPublicKeyDeleteMinimumSetGen();
}

main().catch(console.error);
