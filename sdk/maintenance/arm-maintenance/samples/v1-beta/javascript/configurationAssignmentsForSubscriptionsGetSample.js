// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get configuration assignment for resource.
 *
 * @summary get configuration assignment for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_Get.json
 */
async function configurationAssignmentsGetParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForSubscriptions.get("workervmConfiguration");
  console.log(result);
}

async function main() {
  await configurationAssignmentsGetParent();
}

main().catch(console.error);
