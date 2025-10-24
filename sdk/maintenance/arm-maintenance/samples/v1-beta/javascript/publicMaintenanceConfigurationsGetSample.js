// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Public Maintenance Configuration record
 *
 * @summary get Public Maintenance Configuration record
 * x-ms-original-file: 2023-10-01-preview/PublicMaintenanceConfigurations_GetForResource.json
 */
async function publicMaintenanceConfigurationsGetForResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.publicMaintenanceConfigurations.get("configuration1");
  console.log(result);
}

async function main() {
  await publicMaintenanceConfigurationsGetForResource();
}

main().catch(console.error);
