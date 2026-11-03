// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a security sub-assessment on your scanned resource
 *
 * @summary get a security sub-assessment on your scanned resource
 * x-ms-original-file: 2019-01-01-preview/SubAssessments/GetSubAssessment_example.json
 */
async function getSecurityRecommendationTaskFromSecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.subAssessments.get(
    "subscriptions/212f9889-769e-45ae-ab43-6da33674bd26/resourceGroups/DEMORG/providers/Microsoft.Compute/virtualMachines/vm2",
    "1195afff-c881-495e-9bc5-1486211ae03f",
    "95f7da9c-a2a4-1322-0758-fcd24ef09b85",
  );
  console.log(result);
}

async function main() {
  await getSecurityRecommendationTaskFromSecurityDataLocation();
}

main().catch(console.error);
