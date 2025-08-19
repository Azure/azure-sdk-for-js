// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get metadata information on an assessment type in a specific subscription
 *
 * @summary Get metadata information on an assessment type in a specific subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2021-06-01/examples/AssessmentsMetadata/GetAssessmentsMetadata_subscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSecurityAssessmentMetadataForSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "0980887d-03d6-408c-9566-532f3456804e";
  const assessmentMetadataName = "21300918-b2e3-0346-785f-c77ff57d243b";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assessmentsMetadata.getInSubscription(assessmentMetadataName);
  console.log(result);
}

async function main(): Promise<void> {
  await getSecurityAssessmentMetadataForSubscription();
}

main().catch(console.error);
