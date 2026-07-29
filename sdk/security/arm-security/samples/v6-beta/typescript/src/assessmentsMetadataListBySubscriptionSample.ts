// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get metadata information on all assessment types in a specific subscription
 *
 * @summary get metadata information on all assessment types in a specific subscription
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/ListAssessmentsMetadata_subscription_example.json
 */
async function listSecurityAssessmentMetadataForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0980887d-03d6-408c-9566-532f3456804e";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.assessmentsMetadata.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityAssessmentMetadataForSubscription();
}

main().catch(console.error);
