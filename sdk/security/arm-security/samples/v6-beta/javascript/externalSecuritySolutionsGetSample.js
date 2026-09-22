// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific external Security Solution.
 *
 * @summary gets a specific external Security Solution.
 * x-ms-original-file: 2020-01-01/ExternalSecuritySolutions/GetExternalSecuritySolution_example.json
 */
async function getExternalSecuritySolution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.externalSecuritySolutions.get(
    "defaultresourcegroup-eus",
    "centralus",
    "aad_defaultworkspace-20ff7fc3-e762-44dd-bd96-b71116dcdc23-eus",
  );
  console.log(result);
}

async function main() {
  await getExternalSecuritySolution();
}

main().catch(console.error);
