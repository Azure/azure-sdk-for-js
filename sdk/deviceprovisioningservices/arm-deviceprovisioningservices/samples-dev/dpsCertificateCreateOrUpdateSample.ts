// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add new certificate or update an existing certificate.
 *
 * @summary add new certificate or update an existing certificate.
 * x-ms-original-file: 2025-02-01-preview/DPSCertificateCreateOrUpdate.json
 */
async function dpsCreateOrUpdateCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.createOrUpdate(
    "myResourceGroup",
    "myFirstProvisioningService",
    "cert",
    { properties: { certificate: Buffer.from("MA==") } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsCreateOrUpdateCertificate();
}

main().catch(console.error);
