// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TenantActivityLogAlertsManagementClient } from "@azure/arm-tenantactivitylogalerts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Tenant Activity Log Alert rule.
 *
 * @summary get Tenant Activity Log Alert rule.
 * x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_GetRule.json
 */
async function getATenantActivityLogAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new TenantActivityLogAlertsManagementClient(credential);
  const result = await client.tenantActivityLogAlerts.get(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "SampleActivityLogAlertSHRuleOnTenantLevel",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getATenantActivityLogAlertRule();
}

main().catch(console.error);
