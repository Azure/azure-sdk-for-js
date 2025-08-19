// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 *
 * @summary Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/iothub_certverify.json
 */

import type { CertificateVerificationDescription } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificatesVerify(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myFirstProvisioningService";
  const certificateName = "cert";
  const ifMatch = "AAAAAAAADGk=";
  const certificateVerificationBody: CertificateVerificationDescription = {
    certificate: "#####################################",
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.verify(
    resourceGroupName,
    resourceName,
    certificateName,
    ifMatch,
    certificateVerificationBody,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesVerify();
}

main().catch(console.error);
