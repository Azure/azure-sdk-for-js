// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all releases of an API. An API release is created when making an API Revision current. Releases are also used to rollback to previous revisions. Results will be paged and can be constrained by the $top and $skip parameters.
 *
 * @summary lists all releases of an API. An API release is created when making an API Revision current. Releases are also used to rollback to previous revisions. Results will be paged and can be constrained by the $top and $skip parameters.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiReleases.json
 */
async function apiManagementListApiReleases() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiRelease.listByService("rg1", "apimService1", "a1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListApiReleases();
}

main().catch(console.error);
