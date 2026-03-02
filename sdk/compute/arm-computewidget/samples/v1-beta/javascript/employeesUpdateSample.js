// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computewidget");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Employee
 *
 * @summary update a Employee
 * x-ms-original-file: 2022-11-01/Employees_Update_MaximumSet_Gen.json
 */
async function employeesUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.employees.update("rgwidget", "foo", {
    tags: {},
    properties: {
      age: 24,
      city: "uyfg",
      profile: Buffer.from("oapgijcswfkruiuuzbwco", "base64url"),
    },
  });
  console.log(result);
}

async function main() {
  await employeesUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
