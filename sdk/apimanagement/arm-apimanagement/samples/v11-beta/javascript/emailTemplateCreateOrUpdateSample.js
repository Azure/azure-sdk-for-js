// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an Email Template.
 *
 * @summary updates an Email Template.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateTemplate.json
 */
async function apiManagementCreateTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.emailTemplate.createOrUpdate(
    "rg1",
    "apimService1",
    "newIssueNotificationMessage",
    { subject: "Your request for $IssueName was successfully received." },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateTemplate();
}

main().catch(console.error);
