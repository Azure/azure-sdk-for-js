// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing X509 certificate or does nothing if it does not exist.
 *
 * @summary Deletes an existing X509 certificate or does nothing if it does not exist.
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_certificatesdelete.json
 */

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificatesDelete(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "myhub";
  const certificateName = "cert";
  const ifMatch = "AAAAAAAADGk=";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.certificates.delete(
    resourceGroupName,
    resourceName,
    certificateName,
    ifMatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesDelete();
}

main().catch(console.error);
