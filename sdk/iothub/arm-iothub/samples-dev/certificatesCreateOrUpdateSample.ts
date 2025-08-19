// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Adds new or replaces existing certificate.
 *
 * @summary Adds new or replaces existing certificate.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_certificatescreateorupdate.json
 */

import type { CertificateDescription } from "@azure/arm-iothub";
import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificatesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "iothub";
  const certificateName = "cert";
  const certificateDescription: CertificateDescription = {
    properties: { certificate: "############################################" },
  };
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.createOrUpdate(
    resourceGroupName,
    resourceName,
    certificateName,
    certificateDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesCreateOrUpdate();
}

main().catch(console.error);
