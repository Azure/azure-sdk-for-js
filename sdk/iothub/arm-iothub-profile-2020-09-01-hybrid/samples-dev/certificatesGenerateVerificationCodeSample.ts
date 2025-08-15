// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate.
 *
 * @summary Generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/preview/2019-07-01-preview/examples/iothub_generateverificationcode.json
 */
async function certificatesGenerateVerificationCode(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const certificateName = "cert";
  const ifMatch = "AAAAAAAADGk=";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.generateVerificationCode(
    resourceGroupName,
    resourceName,
    certificateName,
    ifMatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesGenerateVerificationCode();
}

main().catch(console.error);
