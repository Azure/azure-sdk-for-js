// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SshGenerateKeyPairInputParameters,
  SshPublicKeysGenerateKeyPairOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair_EncryptionWithEd25519.json
 */
async function generateAnSshKeyPairWithEd25519Encryption(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const parameters: SshGenerateKeyPairInputParameters = {
    encryptionType: "Ed25519",
  };
  const options: SshPublicKeysGenerateKeyPairOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeys.generateKeyPair(
    resourceGroupName,
    sshPublicKeyName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair_EncryptionWithRSA.json
 */
async function generateAnSshKeyPairWithRsaEncryption(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const parameters: SshGenerateKeyPairInputParameters = {
    encryptionType: "RSA",
  };
  const options: SshPublicKeysGenerateKeyPairOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeys.generateKeyPair(
    resourceGroupName,
    sshPublicKeyName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair.json
 */
async function generateAnSshKeyPair(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeys.generateKeyPair(
    resourceGroupName,
    sshPublicKeyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateAnSshKeyPairWithEd25519Encryption();
  await generateAnSshKeyPairWithRsaEncryption();
  await generateAnSshKeyPair();
}

main().catch(console.error);
