// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get security sub-assessments on all your scanned resources inside a subscription scope
 *
 * @summary get security sub-assessments on all your scanned resources inside a subscription scope
 * x-ms-original-file: 2019-01-01-preview/SubAssessments/ListSubscriptionSubAssessments_example.json
 */
async function listSecuritySubAssessments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.subAssessments.listAll(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecuritySubAssessments();
}

main().catch(console.error);
