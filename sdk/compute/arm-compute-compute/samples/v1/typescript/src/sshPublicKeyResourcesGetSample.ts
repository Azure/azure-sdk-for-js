// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about an SSH public key.
 *
 * @summary retrieves information about an SSH public key.
 * x-ms-original-file: 2025-04-01/sshPublicKeyExamples/SshPublicKey_Get.json
 */
async function getAnSshPublicKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.sshPublicKeyResources.get("myResourceGroup", "mySshPublicKeyName");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnSshPublicKey();
}

main().catch(console.error);
