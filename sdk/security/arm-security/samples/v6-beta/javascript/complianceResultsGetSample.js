// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to security Compliance Result
 *
 * @summary security Compliance Result
 * x-ms-original-file: 2017-08-01/ComplianceResults/GetComplianceResults_example.json
 */
async function getComplianceResultsOnSubscription() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.complianceResults.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "DesignateMoreThanOneOwner",
  );
  console.log(result);
}

async function main() {
  await getComplianceResultsOnSubscription();
}

main().catch(console.error);
