// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 *
 * @summary Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 * x-ms-original-file: specification/deviceprovisioningservices/resource-manager/Microsoft.Devices/preview/2023-03-01-preview/examples/DPSPatch.json
 */

import type { TagsResource } from "@azure/arm-deviceprovisioningservices";
import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dpsPatch(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEPROVISIONINGSERVICES_SUBSCRIPTION_ID"] ||
    "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName =
    process.env["DEVICEPROVISIONINGSERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const provisioningServiceName = "myFirstProvisioningService";
  const provisioningServiceTags: TagsResource = { tags: { foo: "bar" } };
  const credential = new DefaultAzureCredential();
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.beginUpdateAndWait(
    resourceGroupName,
    provisioningServiceName,
    provisioningServiceTags,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsPatch();
}

main().catch(console.error);
