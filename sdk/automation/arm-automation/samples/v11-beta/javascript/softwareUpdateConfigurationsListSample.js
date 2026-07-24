// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all software update configurations for the account.
 *
 * @summary get all software update configurations for the account.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/listSoftwareUpdateConfigurations.json
 */
async function listSoftwareUpdateConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a7d4044-286c-4acb-969a-96639265bf2e";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurations.list("mygroup", "myaccount");
  console.log(result);
}

/**
 * This sample demonstrates how to get all software update configurations for the account.
 *
 * @summary get all software update configurations for the account.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/listSoftwareUpdateConfigurationsByVm.json
 */
async function listSoftwareUpdateConfigurationsTargetingASpecificAzureVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a7d4044-286c-4acb-969a-96639265bf2e";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurations.list("mygroup", "myaccount", {
    filter:
      "properties/updateConfiguration/azureVirtualMachines/any(m: m eq '/subscriptions/1a7d4044-286c-4acb-969a-96639265bf2e/resourceGroups/myresources/providers/Microsoft.Compute/virtualMachines/vm-01')",
  });
  console.log(result);
}

async function main() {
  await listSoftwareUpdateConfigurations();
  await listSoftwareUpdateConfigurationsTargetingASpecificAzureVirtualMachine();
}

main().catch(console.error);
