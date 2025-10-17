// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about an SSH public key.
 *
 * @summary retrieves information about an SSH public key.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Get.json
 */
async function getAnSshPublicKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.get("myResourceGroup", "mySshPublicKeyName");
  console.log(result);
}

async function main() {
  await getAnSshPublicKey();
}

main().catch(console.error);
