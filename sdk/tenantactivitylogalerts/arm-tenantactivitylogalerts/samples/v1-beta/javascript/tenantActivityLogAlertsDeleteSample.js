// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-tenantactivitylogalerts");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Tenant Activity Log Alert rule.
 *
 * @summary delete a Tenant Activity Log Alert rule.
 * x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_DeleteRule.json
 */
async function deleteATenantActivityLogAlertRule() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  await client.tenantActivityLogAlerts.delete(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "SampleActivityLogAlertSHRuleOnTenantLevel",
  );
}

async function main() {
  await deleteATenantActivityLogAlertRule();
}

main().catch(console.error);
