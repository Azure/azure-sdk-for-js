// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to permanently deletes specified service.
 *
 * @summary permanently deletes specified service.
 * x-ms-original-file: 2024-06-01-preview/DeletedServices_Delete.json
 */
async function deletedServicesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.deletedServices.delete("contoso-resources", "contoso");
}

async function main() {
  await deletedServicesDelete();
}

main().catch(console.error);
