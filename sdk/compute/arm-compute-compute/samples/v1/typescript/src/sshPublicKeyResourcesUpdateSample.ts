// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a new SSH public key resource.
 *
 * @summary updates a new SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Update_MaximumSet_Gen.json
 */
async function sshPublicKeyUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.update("rgcompute", "aaaaaaaaaaaa", {
    properties: { publicKey: "{ssh-rsa public key}" },
    tags: { key2854: "a" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a new SSH public key resource.
 *
 * @summary updates a new SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Update_MinimumSet_Gen.json
 */
async function sshPublicKeyUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.update("rgcompute", "aaaaaaaaaaa", {});
  console.log(result);
}

async function main(): Promise<void> {
  await sshPublicKeyUpdateMaximumSetGen();
  await sshPublicKeyUpdateMinimumSetGen();
}

main().catch(console.error);
