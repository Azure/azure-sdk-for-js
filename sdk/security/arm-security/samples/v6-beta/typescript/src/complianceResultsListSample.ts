// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to security compliance results in the subscription
 *
 * @summary security compliance results in the subscription
 * x-ms-original-file: 2017-08-01/ComplianceResults/ListComplianceResults_example.json
 */
async function getComplianceResultsOnSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.complianceResults.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getComplianceResultsOnSubscription();
}

main().catch(console.error);
