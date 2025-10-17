// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair.json
 */
async function generateAnSSHKeyPair(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.generateKeyPair(
    "myResourceGroup",
    "mySshPublicKeyName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair_EncryptionWithEd25519.json
 */
async function generateAnSSHKeyPairWithEd25519Encryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.generateKeyPair(
    "myResourceGroup",
    "mySshPublicKeyName",
    { parameters: { encryptionType: "Ed25519" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair_EncryptionWithRSA.json
 */
async function generateAnSSHKeyPairWithRSAEncryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.generateKeyPair(
    "myResourceGroup",
    "mySshPublicKeyName",
    { parameters: { encryptionType: "RSA" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateAnSSHKeyPair();
  await generateAnSSHKeyPairWithEd25519Encryption();
  await generateAnSSHKeyPairWithRSAEncryption();
}

main().catch(console.error);
