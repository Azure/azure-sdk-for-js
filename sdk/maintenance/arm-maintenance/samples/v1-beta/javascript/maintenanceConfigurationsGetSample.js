// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Configuration record
 *
 * @summary get Configuration record
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_GetForResource.json
 */
async function maintenanceConfigurationsGetForResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get("examplerg", "configuration1");
  console.log(result);
}

/**
 * This sample demonstrates how to get Configuration record
 *
 * @summary get Configuration record
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_GetForResource_GuestOSPatchLinux.json
 */
async function maintenanceConfigurationsGetForResourceGuestOSPatchLinux() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get("examplerg", "configuration1");
  console.log(result);
}

/**
 * This sample demonstrates how to get Configuration record
 *
 * @summary get Configuration record
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_GetForResource_GuestOSPatchWindows.json
 */
async function maintenanceConfigurationsGetForResourceGuestOSPatchWindows() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.get("examplerg", "configuration1");
  console.log(result);
}

async function main() {
  await maintenanceConfigurationsGetForResource();
  await maintenanceConfigurationsGetForResourceGuestOSPatchLinux();
  await maintenanceConfigurationsGetForResourceGuestOSPatchWindows();
}

main().catch(console.error);
