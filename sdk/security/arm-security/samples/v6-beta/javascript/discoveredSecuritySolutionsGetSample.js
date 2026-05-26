// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific discovered Security Solution.
 *
 * @summary gets a specific discovered Security Solution.
 * x-ms-original-file: 2020-01-01/DiscoveredSecuritySolutions/GetDiscoveredSecuritySolutionResourceGroupLocation_example.json
 */
async function getDiscoveredSecuritySolutionFromASecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.discoveredSecuritySolutions.get("myRg2", "centralus", "paloalto7");
  console.log(result);
}

async function main() {
  await getDiscoveredSecuritySolutionFromASecurityDataLocation();
}

main().catch(console.error);
