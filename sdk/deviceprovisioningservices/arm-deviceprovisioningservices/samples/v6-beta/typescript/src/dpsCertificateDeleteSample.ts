// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified certificate associated with the Provisioning Service
 *
 * @summary deletes the specified certificate associated with the Provisioning Service
 * x-ms-original-file: 2025-02-01-preview/DPSDeleteCertificate.json
 */
async function dpsDeleteCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  await client.dpsCertificate.delete(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
    "AAAAAAAADGk=",
  );
}

async function main(): Promise<void> {
  await dpsDeleteCertificate();
}

main().catch(console.error);
