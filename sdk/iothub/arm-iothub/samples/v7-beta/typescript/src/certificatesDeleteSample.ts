// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing X509 certificate or does nothing if it does not exist.
 *
 * @summary deletes an existing X509 certificate or does nothing if it does not exist.
 * x-ms-original-file: 2026-03-01-preview/iothub_certificatesdelete.json
 */
async function certificatesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  await client.certificates.delete("myResourceGroup", "myhub", "cert", "AAAAAAAADGk=");
}

async function main(): Promise<void> {
  await certificatesDelete();
}

main().catch(console.error);
