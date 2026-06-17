// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get student join requests
 *
 * @summary get student join requests
 * x-ms-original-file: 2021-12-01-preview/JoinRequestList.json
 */
async function joinRequestList() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.joinRequests.list(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    { includeDenied: false },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await joinRequestList();
}

main().catch(console.error);
