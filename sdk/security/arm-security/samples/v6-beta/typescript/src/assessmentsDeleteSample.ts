// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result
 *
 * @summary delete a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result
 * x-ms-original-file: 2025-05-04/Assessments/DeleteAssessment_example.json
 */
async function deleteASecurityRecommendationTaskOnAResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  await client.assessments.delete(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachineScaleSets/vmss2",
    "8bb8be0a-6010-4789-812f-e4d661c4ed0e",
  );
}

async function main(): Promise<void> {
  await deleteASecurityRecommendationTaskOnAResource();
}

main().catch(console.error);
