// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to details of a specific Compliance.
 *
 * @summary details of a specific Compliance.
 * x-ms-original-file: 2017-08-01-preview/Compliances/GetCompliance_example.json
 */
async function getSecurityComplianceDataForADay() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.compliances.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "2018-01-01Z",
  );
  console.log(result);
}

async function main() {
  await getSecurityComplianceDataForADay();
}

main().catch(console.error);
