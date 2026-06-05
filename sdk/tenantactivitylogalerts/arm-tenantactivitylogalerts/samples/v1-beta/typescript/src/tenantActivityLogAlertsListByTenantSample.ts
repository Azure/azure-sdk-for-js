// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TenantActivityLogAlertsManagementClient } from "@azure/arm-tenantactivitylogalerts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all Tenant Activity Log Alert rules in the tenant.
 *
 * @summary get a list of all Tenant Activity Log Alert rules in the tenant.
 * x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_ListByTenant.json
 */
async function listActivityLogAlertsByTenant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new TenantActivityLogAlertsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.tenantActivityLogAlerts.listByTenant()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listActivityLogAlertsByTenant();
}

main().catch(console.error);
