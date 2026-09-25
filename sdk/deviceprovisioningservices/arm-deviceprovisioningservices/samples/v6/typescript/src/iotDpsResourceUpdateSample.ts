// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsClient } from "@azure/arm-deviceprovisioningservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 *
 * @summary update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 * x-ms-original-file: 2026-08-31/DPSPatch.json
 */
async function dpsPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.update(
    "myResourceGroup",
    "myFirstProvisioningService",
    { tags: { foo: "bar" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 *
 * @summary update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 * x-ms-original-file: 2026-08-31/DPSPatch_DisableLocalAuth.json
 */
async function dpsPatchDisableLocalAuth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotDpsClient(credential, subscriptionId);
  const result = await client.iotDpsResource.update(
    "myResourceGroup",
    "myFirstProvisioningService",
    { tags: { foo: "bar" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dpsPatch();
  await dpsPatchDisableLocalAuth();
}

main().catch(console.error);
