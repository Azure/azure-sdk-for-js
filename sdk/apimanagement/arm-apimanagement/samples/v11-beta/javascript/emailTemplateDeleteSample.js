// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reset the Email Template to default template provided by the API Management service instance.
 *
 * @summary reset the Email Template to default template provided by the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteTemplate.json
 */
async function apiManagementDeleteTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.emailTemplate.delete("rg1", "apimService1", "newIssueNotificationMessage", "*");
}

async function main() {
  await apiManagementDeleteTemplate();
}

main().catch(console.error);
