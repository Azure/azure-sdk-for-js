// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-tenantactivitylogalerts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all Tenant Activity Log Alert rules in a management group.
 *
 * @summary get a list of all Tenant Activity Log Alert rules in a management group.
 * x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_ListByManagementGroup.json
 */
async function listActivityLogAlertsByManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.tenantActivityLogAlerts.listByManagementGroup(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listActivityLogAlertsByManagementGroup();
}

main().catch(console.error);
