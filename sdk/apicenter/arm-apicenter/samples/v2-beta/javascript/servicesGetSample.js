// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns details of the service.
 *
 * @summary returns details of the service.
 * x-ms-original-file: 2024-06-01-preview/Services_Get.json
 */
async function servicesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.services.get("contoso-resources", "contoso");
  console.log(result);
}

async function main() {
  await servicesGet();
}

main().catch(console.error);
