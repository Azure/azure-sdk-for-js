// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computewidget");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Employee
 *
 * @summary get a Employee
 * x-ms-original-file: 2022-11-01/Employees_Get_MaximumSet_Gen.json
 */
async function employeesGetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.employees.get("rgwidget", "foo");
  console.log(result);
}

async function main() {
  await employeesGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
