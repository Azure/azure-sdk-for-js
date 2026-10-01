// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to security compliance results in the subscription
 *
 * @summary security compliance results in the subscription
 * x-ms-original-file: 2017-08-01/ComplianceResults/ListComplianceResults_example.json
 */
async function getComplianceResultsOnSubscription() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.complianceResults.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getComplianceResultsOnSubscription();
}

main().catch(console.error);
