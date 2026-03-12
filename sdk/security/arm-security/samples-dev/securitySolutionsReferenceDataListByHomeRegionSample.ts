// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets list of all supported Security Solutions for subscription and location.
 *
 * @summary Gets list of all supported Security Solutions for subscription and location.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/SecuritySolutionsReferenceData/GetSecuritySolutionsReferenceDataSubscriptionLocation_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSecuritySolutionsFromASecurityDataLocation(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ascLocation = "westcentralus";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result =
    await client.securitySolutionsReferenceDataOperations.listByHomeRegion(ascLocation);
  console.log(result);
}

async function main(): Promise<void> {
  await getSecuritySolutionsFromASecurityDataLocation();
}

main().catch(console.error);
