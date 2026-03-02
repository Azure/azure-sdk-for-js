// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computewidget");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Employee
 *
 * @summary delete a Employee
 * x-ms-original-file: 2022-11-01/Employees_Delete_MaximumSet_Gen.json
 */
async function employeesDeleteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ComputeClient(credential, subscriptionId);
  await client.employees.delete("rgwidget", "foo");
}

async function main() {
  await employeesDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
