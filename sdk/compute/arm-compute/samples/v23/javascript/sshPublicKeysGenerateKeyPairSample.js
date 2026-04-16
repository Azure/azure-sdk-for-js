// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/sshPublicKeyExamples/SshPublicKey_GenerateKeyPair_EncryptionWithEd25519.json
 */
async function generateAnSshKeyPairWithEd25519Encryption() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const parameters = {
    encryptionType: "Ed25519",
  };
  const options = { parameters };
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
async function generateAnSshKeyPairWithRsaEncryption() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const parameters = {
    encryptionType: "RSA",
  };
  const options = { parameters };
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
async function generateAnSshKeyPair() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeys.generateKeyPair(resourceGroupName, sshPublicKeyName);
  console.log(result);
}

async function main() {
  await generateAnSshKeyPairWithEd25519Encryption();
  await generateAnSshKeyPairWithRsaEncryption();
  await generateAnSshKeyPair();
}

main().catch(console.error);
