// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new SSH public key resource.
 *
 * @summary Creates a new SSH public key resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/sshPublicKeyExamples/SshPublicKey_Create.json
 */

import {
  SshPublicKeyResource,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createANewSshPublicKeyResource(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const parameters: SshPublicKeyResource = {
    location: "westus",
    publicKey: "{ssh-rsa public key}",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.sshPublicKeys.create(
    resourceGroupName,
    sshPublicKeyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createANewSshPublicKeyResource();
}

main().catch(console.error);
