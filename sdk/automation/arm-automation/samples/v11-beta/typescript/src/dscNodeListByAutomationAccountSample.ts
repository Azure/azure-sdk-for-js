// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listAllDscNodesByAutomationAccount.json
 */
async function listDSCNodesByAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithCompositeFilter.json
 */
async function listPagedDSCNodesWithFiltersSeparatedByAnd(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    filter:
      "properties/extensionHandler/any(eh: eh/version gt '2.70') and contains(name,'sql') and contains(properties/nodeConfiguration/name,'$$Not$$Configured$$')",
    skip: 0,
    top: 10,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithNameFilter.json
 */
async function listPagedDSCNodesByAutomationAccountWithNameFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    filter: "contains('DSCCOMP',name)",
    skip: 0,
    top: 6,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithNoFilter.json
 */
async function listPagedDSCNodesByAutomationAccountWithNoFilters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    skip: 0,
    top: 2,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithNodeConfigurationCustomFilter.json
 */
async function listPagedDSCNodesByAutomationAccountWithNodeConfigurationCustomFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    filter:
      "contains(properties/nodeConfiguration/name,'SetupServer.localhost,SetupClient.localhost,$$Not$$Configured$$')",
    skip: 0,
    top: 4,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithNodeConfigurationNotAssignedFilter.json
 */
async function listPagedDSCNodesByAutomationAccountWhereNodeConfigurationsAreNotAssignedFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    filter: "properties/nodeConfiguration/name eq ''",
    skip: 0,
    top: 20,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithStatusFilter.json
 */
async function listPagedDSCNodesByAutomationAccountWithNodeStatusFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    filter: "contains(properties/status,'Compliant,NotCompliant')",
    skip: 0,
    top: 4,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of dsc nodes.
 *
 * @summary retrieve a list of dsc nodes.
 * x-ms-original-file: 2024-10-23/listPagedDscNodesByAutomationAccountWithVersionFilter.json
 */
async function listPagedDSCNodesByAutomationAccountWithVersionFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dscNode.listByAutomationAccount("rg", "myAutomationAccount33", {
    filter: "properties/extensionHandler/any(eh: eh/version le '2.70')",
    skip: 0,
    top: 4,
    inlinecount: "allpages",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDSCNodesByAutomationAccount();
  await listPagedDSCNodesWithFiltersSeparatedByAnd();
  await listPagedDSCNodesByAutomationAccountWithNameFilter();
  await listPagedDSCNodesByAutomationAccountWithNoFilters();
  await listPagedDSCNodesByAutomationAccountWithNodeConfigurationCustomFilter();
  await listPagedDSCNodesByAutomationAccountWhereNodeConfigurationsAreNotAssignedFilter();
  await listPagedDSCNodesByAutomationAccountWithNodeStatusFilter();
  await listPagedDSCNodesByAutomationAccountWithVersionFilter();
}

main().catch(console.error);
