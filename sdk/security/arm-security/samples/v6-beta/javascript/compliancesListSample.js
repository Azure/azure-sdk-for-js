// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Compliance scores of the specific management group.
 *
 * @summary the Compliance scores of the specific management group.
 * x-ms-original-file: 2017-08-01-preview/Compliances/GetCompliances_example.json
 */
async function getSecurityComplianceDataOverTime() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.compliances.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSecurityComplianceDataOverTime();
}

main().catch(console.error);
