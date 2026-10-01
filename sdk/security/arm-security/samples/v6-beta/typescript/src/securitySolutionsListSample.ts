// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Security Solutions for the subscription.
 *
 * @summary gets a list of Security Solutions for the subscription.
 * x-ms-original-file: 2020-01-01/SecuritySolutions/GetSecuritySolutionsSubscription_example.json
 */
async function getSecuritySolutions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securitySolutions.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getSecuritySolutions();
}

main().catch(console.error);
