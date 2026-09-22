// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get metadata information on an assessment type in a specific subscription
 *
 * @summary get metadata information on an assessment type in a specific subscription
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/GetAssessmentsMetadata_subscription_example.json
 */
async function getSecurityAssessmentMetadataForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0980887d-03d6-408c-9566-532f3456804e";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assessmentsMetadata.getInSubscription(
    "21300918-b2e3-0346-785f-c77ff57d243b",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSecurityAssessmentMetadataForSubscription();
}

main().catch(console.error);
