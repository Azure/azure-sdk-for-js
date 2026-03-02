// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-computewidget";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Employee resources by subscription ID
 *
 * @summary list Employee resources by subscription ID
 * x-ms-original-file: 2022-11-01/Employees_ListBySubscription_MaximumSet_Gen.json
 */
async function employeesListBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.employees.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Employee resources by subscription ID
 *
 * @summary list Employee resources by subscription ID
 * x-ms-original-file: 2022-11-01/Employees_ListBySubscription_MinimumSet_Gen.json
 */
async function employeesListBySubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.employees.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await employeesListBySubscriptionGeneratedByMaximumSetRule();
  await employeesListBySubscriptionGeneratedByMinimumSetRule();
}

main().catch(console.error);
