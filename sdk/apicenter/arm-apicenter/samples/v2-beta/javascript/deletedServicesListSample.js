// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists soft-deleted services.
 *
 * @summary lists soft-deleted services.
 * x-ms-original-file: 2024-06-01-preview/DeletedServices_ListBySubscription.json
 */
async function deletedServicesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedServices.list("contoso-resources")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await deletedServicesList();
}

main().catch(console.error);
