// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TenantActivityLogAlertsManagementClient } = require("@azure/arm-tenantactivitylogalerts");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates 'tags' and 'enabled' fields in an existing Tenant Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation.
 *
 * @summary updates 'tags' and 'enabled' fields in an existing Tenant Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation.
 * x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_UpdateRule.json
 */
async function patchATenantActivityLogAlertRule() {
  const credential = new DefaultAzureCredential();
  const client = new TenantActivityLogAlertsManagementClient(credential);
  const result = await client.tenantActivityLogAlerts.update(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "SampleActivityLogAlertSHRuleOnTenantLevel",
    { enabled: false, tags: { key1: "value1", key2: "value2" } },
  );
  console.log(result);
}

async function main() {
  await patchATenantActivityLogAlertRule();
}

main().catch(console.error);
