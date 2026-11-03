// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of all supported Security Solutions for subscription and location.
 *
 * @summary gets list of all supported Security Solutions for subscription and location.
 * x-ms-original-file: 2020-01-01/SecuritySolutionsReferenceData/GetSecuritySolutionsReferenceDataSubscriptionLocation_example.json
 */
async function getSecuritySolutionsFromASecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securitySolutionsReferenceData.listByHomeRegion("westcentralus");
  console.log(result);
}

async function main(): Promise<void> {
  await getSecuritySolutionsFromASecurityDataLocation();
}

main().catch(console.error);
