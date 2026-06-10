// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 *
 * @summary verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 * x-ms-original-file: 2026-03-01-preview/iothub_certverify.json
 */
async function certificatesVerify(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.verify(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
    "AAAAAAAADGk=",
    { certificate: "#####################################" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesVerify();
}

main().catch(console.error);
