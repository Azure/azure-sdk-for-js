// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get security assessments on all your scanned resources inside a scope
 *
 * @summary get security assessments on all your scanned resources inside a scope
 * x-ms-original-file: 2025-05-04/Assessments/ListAssessments_example.json
 */
async function listSecurityAssessments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.assessments.list(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityAssessments();
}

main().catch(console.error);
