// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoClient } from "@azure/arm-contoso";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Employee
 *
 * @summary update a Employee
 * x-ms-original-file: 2021-11-01/Employees_Update.json
 */
async function employeesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ContosoClient(credential, subscriptionId);
  const result = await client.employees.update("rgopenapi", "-XhyNJ--", {
    tags: { key7952: "no" },
    properties: { age: 24, city: "uyfg", profile: "oapgijcswfkruiuuzbwco" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await employeesUpdate();
}

main().catch(console.error);
