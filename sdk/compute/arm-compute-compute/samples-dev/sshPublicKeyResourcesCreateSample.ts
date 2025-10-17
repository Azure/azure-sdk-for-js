// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new SSH public key resource.
 *
 * @summary creates a new SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Create.json
 */
async function createANewSSHPublicKeyResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.create(
    "myResourceGroup",
    "mySshPublicKeyName",
    { location: "westus", properties: { publicKey: "{ssh-rsa public key}" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createANewSSHPublicKeyResource();
}

main().catch(console.error);
