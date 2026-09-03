// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all supported Security Solutions for the subscription.
 *
 * @summary gets a list of all supported Security Solutions for the subscription.
 * x-ms-original-file: 2020-01-01/SecuritySolutionsReferenceData/GetSecuritySolutionsReferenceDataSubscription_example.json
 */
async function getSecuritySolutions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securitySolutionsReferenceData.list();
  console.log(result);
}

async function main() {
  await getSecuritySolutions();
}

main().catch(console.error);
