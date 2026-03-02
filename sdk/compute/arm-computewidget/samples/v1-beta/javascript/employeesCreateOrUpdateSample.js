// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computewidget");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Employee
 *
 * @summary create a Employee
 * x-ms-original-file: 2022-11-01/Employees_CreateOrUpdate_MaximumSet_Gen.json
 */
async function employeesCreateOrUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.employees.createOrUpdate("rgwidget", "foo", {
    properties: {
      age: 30,
      city: "gydhnntudughbmxlkyzrskcdkotrxn",
      profile: Buffer.from("ms", "base64url"),
    },
    tags: {},
    location: "itajgxyqozseoygnl",
  });
  console.log(result);
}

async function main() {
  await employeesCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
