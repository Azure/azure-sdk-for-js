// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of configurations.
 *
 * @summary retrieve a list of configurations.
 * x-ms-original-file: 2024-10-23/getAllDscConfigurations.json
 */
async function getDSCConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscConfiguration.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of configurations.
 *
 * @summary retrieve a list of configurations.
 * x-ms-original-file: 2024-10-23/getPagedDscConfigurationsWithNoFilter.json
 */
async function listPagedDSCConfigurationsWithNoFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscConfiguration.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
    { skip: 0, top: 3, inlinecount: "allpages" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of configurations.
 *
 * @summary retrieve a list of configurations.
 * x-ms-original-file: 2024-10-23/getPagedlDscConfigurationsWithNameFilter.json
 */
async function listPagedDSCConfigurationsWithNameFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscConfiguration.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
    { filter: "contains(name,'server')", skip: 0, top: 2, inlinecount: "allpages" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getDSCConfiguration();
  await listPagedDSCConfigurationsWithNoFilter();
  await listPagedDSCConfigurationsWithNameFilter();
}

main().catch(console.error);
