// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoClient } from "@azure/arm-contoso";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Employee
 *
 * @summary get a Employee
 * x-ms-original-file: 2021-11-01/Employees_Get.json
 */
async function employeesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ContosoClient(credential, subscriptionId);
  const result = await client.employees.get("rgopenapi", "le-8MU--J3W6q8D386p3-iT3");
  console.log(result);
}

async function main(): Promise<void> {
  await employeesGet();
}

main().catch(console.error);
