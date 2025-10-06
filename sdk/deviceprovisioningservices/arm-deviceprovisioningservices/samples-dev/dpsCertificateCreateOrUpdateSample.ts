// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Add new certificate or update an existing certificate.
 *
 * @summary Add new certificate or update an existing certificate.
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSCertificateCreateOrUpdate.json
 */

import type { CertificateResponse } from "@azure/arm-deviceprovisioningservices";
import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dpsCreateOrUpdateCertificate(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const provisioningServiceName = "myFirstProvisioningService";
  const certificateName = "cert";
  const certificateDescription: CertificateResponse = {
    properties: { certificate: Buffer.from("MA==") as Uint8Array },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.createOrUpdate(
    resourceGroupName,
    provisioningServiceName,
    certificateName,
    certificateDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsCreateOrUpdateCertificate();
}

main().catch(console.error);
