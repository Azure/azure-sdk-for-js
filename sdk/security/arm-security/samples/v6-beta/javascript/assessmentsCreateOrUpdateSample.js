// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result
 *
 * @summary create a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result
 * x-ms-original-file: 2025-05-04/Assessments/PutAssessment_example.json
 */
async function createSecurityRecommendationTaskOnAResource() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.assessments.createOrUpdate(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachineScaleSets/vmss2",
    "8bb8be0a-6010-4789-812f-e4d661c4ed0e",
    { resourceDetails: { source: "Azure" }, status: { code: "Healthy" } },
  );
  console.log(result);
}

async function main() {
  await createSecurityRecommendationTaskOnAResource();
}

main().catch(console.error);
