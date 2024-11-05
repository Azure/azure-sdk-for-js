// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  SshPublicKeysGenerateKeyPairParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 *
 * @summary Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/sshPublicKeyExamples/SshPublicKeys_GenerateKeyPair.json
 */
async function generateAnSshKeyPair() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const sshPublicKeyName = "mySshPublicKeyName";
  const options: SshPublicKeysGenerateKeyPairParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}/generateKeyPair",
      subscriptionId,
      resourceGroupName,
      sshPublicKeyName
    )
    .post(options);
  console.log(result);
}

generateAnSshKeyPair().catch(console.error);
