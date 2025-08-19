// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Refresh all alerts for a resource scope.
 *
 * @summary Refresh all alerts for a resource scope.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-08-01-preview/examples/RefreshAllAlerts.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function refreshAllAlerts(): Promise<void> {
  const scope = "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alerts.beginRefreshAllAndWait(scope);
  console.log(result);
}

async function main(): Promise<void> {
  await refreshAllAlerts();
}

main().catch(console.error);
