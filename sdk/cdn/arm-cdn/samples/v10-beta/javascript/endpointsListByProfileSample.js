// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists existing CDN endpoints.
 *
 * @summary lists existing CDN endpoints.
 * x-ms-original-file: 2025-12-01/Endpoints_ListByProfile.json
 */
async function endpointsListByProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoints.listByProfile("RG", "profile1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await endpointsListByProfile();
}

main().catch(console.error);
