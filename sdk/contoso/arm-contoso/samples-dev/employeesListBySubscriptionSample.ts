// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoClient } from "@azure/arm-contoso";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Employee resources by subscription ID
 *
 * @summary list Employee resources by subscription ID
 * x-ms-original-file: 2021-11-01/Employees_ListBySubscription.json
 */
async function employeesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ContosoClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.employees.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await employeesListBySubscription();
}

main().catch(console.error);
