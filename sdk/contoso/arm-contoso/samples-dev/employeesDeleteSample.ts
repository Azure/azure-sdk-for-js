// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoClient } from "@azure/arm-contoso";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Employee
 *
 * @summary delete a Employee
 * x-ms-original-file: 2021-10-01-preview/Employees_Delete.json
 */
async function employeesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ContosoClient(credential, subscriptionId);
  await client.employees.delete("rgopenapi", "5vX--BxSu3ux48rI4O9OQ569");
}

async function main(): Promise<void> {
  await employeesDelete();
}

main().catch(console.error);
