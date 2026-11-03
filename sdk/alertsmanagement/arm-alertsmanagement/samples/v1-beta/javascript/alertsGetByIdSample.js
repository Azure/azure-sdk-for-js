// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-alertsmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information related to a specific alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to get alert by id then use parent resource of scope. So in this example get alert by id call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}'.
 *
 * @summary get information related to a specific alert. If scope is a deleted resource then please use scope as parent resource of the delete resource. For example if my alert id is '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/virtualMachines/vm1/providers/Microsoft.AlertsManagement/alerts/{alertId}' and 'vm1' is deleted then if you want to get alert by id then use parent resource of scope. So in this example get alert by id call will look like this: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AlertsManagement/alerts/{alertId}'.
 * x-ms-original-file: 2025-05-25-preview/Alerts_GetById.json
 */
async function getById() {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.alerts.getById(
    "subscriptions/3b540246-808d-4331-99aa-917b808a9166/resourcegroups/servicedeskresourcegroup/providers/microsoft.insights/components/servicedeskappinsight",
    "66114d64-d9d9-478b-95c9-b789d6502100",
  );
  console.log(result);
}

async function main() {
  await getById();
}

main().catch(console.error);
