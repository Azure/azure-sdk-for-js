// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of all user identities.
 *
 * @summary list of all user identities.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListUserIdentities.json
 */
async function apiManagementListUserIdentities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userIdentities.list(
    "rg1",
    "apimService1",
    "57f2af53bb17172280f44057",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListUserIdentities();
}

main().catch(console.error);
