// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh an alert.
 *
 * @summary refresh an alert.
 * x-ms-original-file: 2022-08-01-preview/RefreshAlert.json
 */
async function refreshAlert() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alerts.refresh(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "AzureRolesAssignedOutsidePimAlert",
  );
  console.log(result);
}

async function main() {
  await refreshAlert();
}

main().catch(console.error);
