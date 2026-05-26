// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets alert incidents for a resource scope.
 *
 * @summary gets alert incidents for a resource scope.
 * x-ms-original-file: 2022-08-01-preview/GetAlertIncidents.json
 */
async function getAlertIncidents() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.alertIncidents.listForScope(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "TooManyOwnersAssignedToResource",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAlertIncidents();
}

main().catch(console.error);
