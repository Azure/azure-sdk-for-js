// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a specific Security Solution.
 *
 * @summary Gets a specific Security Solution.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/SecuritySolutions/GetSecuritySolutionsResourceGroupLocation_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getASecuritySolutionFromASecurityDataLocation(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const resourceGroupName = process.env["SECURITY_RESOURCE_GROUP"] || "myRg2";
  const ascLocation = "centralus";
  const securitySolutionName = "paloalto7";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securitySolutions.get(
    resourceGroupName,
    ascLocation,
    securitySolutionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASecuritySolutionFromASecurityDataLocation();
}

main().catch(console.error);
