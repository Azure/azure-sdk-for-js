// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of dsc node configurations.
 *
 * @summary retrieve a list of dsc node configurations.
 * x-ms-original-file: 2024-10-23/listDscNodeConfigurations.json
 */
async function listDSCNodeConfigurationsByAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNodeConfiguration.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc node configurations.
 *
 * @summary retrieve a list of dsc node configurations.
 * x-ms-original-file: 2024-10-23/listPagedDscNodeConfigurationsWithNameFilter.json
 */
async function listPagedDSCNodeConfigurationsByAutomationAccountWithNameFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNodeConfiguration.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
    { filter: "contains('.localhost',name)", skip: 0, top: 2, inlinecount: "allpages" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc node configurations.
 *
 * @summary retrieve a list of dsc node configurations.
 * x-ms-original-file: 2024-10-23/listPagedDscNodeConfigurationsWithNoFilter.json
 */
async function listPagedDSCNodeConfigurationsByAutomationAccountWithNoFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNodeConfiguration.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
    { skip: 0, top: 4, inlinecount: "allpages" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDSCNodeConfigurationsByAutomationAccount();
  await listPagedDSCNodeConfigurationsByAutomationAccountWithNameFilter();
  await listPagedDSCNodeConfigurationsByAutomationAccountWithNoFilter();
}

main().catch(console.error);
