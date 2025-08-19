// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get metadata information on all assessment types
 *
 * @summary Get metadata information on all assessment types
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2021-06-01/examples/AssessmentsMetadata/ListAssessmentsMetadata_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSecurityAssessmentMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.assessmentsMetadata.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityAssessmentMetadata();
}

main().catch(console.error);
