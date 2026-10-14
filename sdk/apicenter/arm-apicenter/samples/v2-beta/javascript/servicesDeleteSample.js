// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified service.
 *
 * @summary deletes specified service.
 * x-ms-original-file: 2024-06-01-preview/Services_Delete.json
 */
async function servicesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.services.delete("contoso-resources", "contoso");
}

async function main() {
  await servicesDelete();
}

main().catch(console.error);
