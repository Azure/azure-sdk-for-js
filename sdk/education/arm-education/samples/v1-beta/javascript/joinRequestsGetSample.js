// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get student join requests
 *
 * @summary get student join requests
 * x-ms-original-file: 2021-12-01-preview/JoinRequest.json
 */
async function joinRequest() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.joinRequests.get(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    "{joinRequestName}",
  );
  console.log(result);
}

async function main() {
  await joinRequest();
}

main().catch(console.error);
