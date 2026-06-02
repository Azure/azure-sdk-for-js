// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of external Security Solutions for the subscription and location.
 *
 * @summary gets a list of external Security Solutions for the subscription and location.
 * x-ms-original-file: 2020-01-01/ExternalSecuritySolutions/GetExternalSecuritySolutionsSubscriptionLocation_example.json
 */
async function getExternalSecuritySolutionsOnASubscriptionFromSecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalSecuritySolutions.listByHomeRegion("centralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getExternalSecuritySolutionsOnASubscriptionFromSecurityDataLocation();
}

main().catch(console.error);
