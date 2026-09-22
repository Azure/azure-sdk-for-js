// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of external security solutions for the subscription.
 *
 * @summary gets a list of external security solutions for the subscription.
 * x-ms-original-file: 2020-01-01/ExternalSecuritySolutions/GetExternalSecuritySolutionsSubscription_example.json
 */
async function getExternalSecuritySolutionsOnASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
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
