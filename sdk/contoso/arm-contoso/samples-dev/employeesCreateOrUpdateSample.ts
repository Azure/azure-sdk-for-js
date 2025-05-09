// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoClient } from "@azure/arm-contoso";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Employee
 *
 * @summary create a Employee
 * x-ms-original-file: 2021-10-01-preview/Employees_CreateOrUpdate.json
 */
async function employeesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ContosoClient(credential, subscriptionId);
  const result = await client.employees.createOrUpdate("rgopenapi", "9KF-f-8b", {
    properties: {
      age: 30,
      city: "gydhnntudughbmxlkyzrskcdkotrxn",
      profile: "ms",
    },
    tags: { key2913: "urperxmkkhhkp" },
    location: "itajgxyqozseoygnl",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await employeesCreateOrUpdate();
}

main().catch(console.error);
