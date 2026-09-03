// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh all alerts for a resource scope.
 *
 * @summary refresh all alerts for a resource scope.
 * x-ms-original-file: 2022-08-01-preview/RefreshAllAlerts.json
 */
async function refreshAllAlerts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alerts.refreshAll(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await refreshAllAlerts();
}

main().catch(console.error);
