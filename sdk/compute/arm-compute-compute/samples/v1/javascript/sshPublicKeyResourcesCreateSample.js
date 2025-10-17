// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new SSH public key resource.
 *
 * @summary creates a new SSH public key resource.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Create.json
 */
async function createANewSSHPublicKeyResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.create(
    "myResourceGroup",
    "mySshPublicKeyName",
    { location: "westus", properties: { publicKey: "{ssh-rsa public key}" } },
  );
  console.log(result);
}

async function main() {
  await createANewSSHPublicKeyResource();
}

main().catch(console.error);
