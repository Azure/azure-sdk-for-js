// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific Security Solution.
 *
 * @summary gets a specific Security Solution.
 * x-ms-original-file: 2020-01-01/SecuritySolutions/GetSecuritySolutionsResourceGroupLocation_example.json
 */
async function getASecuritySolutionFromASecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securitySolutions.get("myRg2", "centralus", "paloalto7");
  console.log(result);
}

async function main(): Promise<void> {
  await getASecuritySolutionFromASecurityDataLocation();
}

main().catch(console.error);
