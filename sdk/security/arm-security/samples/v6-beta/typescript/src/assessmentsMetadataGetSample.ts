// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get metadata information on an assessment type
 *
 * @summary get metadata information on an assessment type
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/GetAssessmentsMetadata_example.json
 */
async function getSecurityAssessmentMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.assessmentsMetadata.get("21300918-b2e3-0346-785f-c77ff57d243b");
  console.log(result);
}

async function main(): Promise<void> {
  await getSecurityAssessmentMetadata();
}

main().catch(console.error);
