// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of external security solutions for the subscription.
 *
 * @summary Gets a list of external security solutions for the subscription.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/ExternalSecuritySolutions/GetExternalSecuritySolutionsSubscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getExternalSecuritySolutionsOnASubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalSecuritySolutions.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getExternalSecuritySolutionsOnASubscription();
}

main().catch(console.error);
