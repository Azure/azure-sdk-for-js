// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh all alerts for a resource scope.
 *
 * @summary refresh all alerts for a resource scope.
 * x-ms-original-file: 2022-08-01-preview/RefreshAllAlerts.json
 */
async function refreshAllAlerts() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alerts.refreshAll(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
  );
  console.log(result);
}

async function main() {
  await refreshAllAlerts();
}

main().catch(console.error);
