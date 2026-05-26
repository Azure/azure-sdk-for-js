// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a security assessment on your scanned resource
 *
 * @summary get a security assessment on your scanned resource
 * x-ms-original-file: 2025-05-04/Assessments/GetAssessmentWithExpand_example.json
 */
async function getSecurityRecommendationTaskFromSecurityDataLocationWithExpandParameter() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.assessments.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachineScaleSets/vmss2",
    "21300918-b2e3-0346-785f-c77ff57d243b",
    { expand: "links" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a security assessment on your scanned resource
 *
 * @summary get a security assessment on your scanned resource
 * x-ms-original-file: 2025-05-04/Assessments/GetAssessment_example.json
 */
async function getSecurityRecommendationTaskFromSecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.assessments.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachineScaleSets/vmss2",
    "21300918-b2e3-0346-785f-c77ff57d243b",
  );
  console.log(result);
}

async function main() {
  await getSecurityRecommendationTaskFromSecurityDataLocationWithExpandParameter();
  await getSecurityRecommendationTaskFromSecurityDataLocation();
}

main().catch(console.error);
