// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified certificate associated with the Provisioning Service
 *
 * @summary Deletes the specified certificate associated with the Provisioning Service
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSDeleteCertificate.json
 */
async function dpsDeleteCertificate(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const ifMatch = "AAAAAAAADGk=";
  const provisioningServiceName = "myFirstProvisioningService";
  const certificateName = "cert";
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.dpsCertificate.delete(
    resourceGroupName,
    ifMatch,
    provisioningServiceName,
    certificateName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsDeleteCertificate();
}

main().catch(console.error);
