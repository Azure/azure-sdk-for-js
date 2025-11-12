// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotDpsClient } = require("@azure/arm-deviceprovisioningservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 *
 * @summary update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 * x-ms-original-file: 2025-02-01-preview/DPSPatch.json
 */
async function dpsPatch() {
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

async function main() {
  await dpsPatch();
}

main().catch(console.error);
