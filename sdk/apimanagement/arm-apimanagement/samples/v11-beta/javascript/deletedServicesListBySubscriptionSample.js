// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all soft-deleted services available for undelete for the given subscription.
 *
 * @summary lists all soft-deleted services available for undelete for the given subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeletedServicesListBySubscription.json
 */
async function apiManagementDeletedServicesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedServices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementDeletedServicesListBySubscription();
}

main().catch(console.error);
