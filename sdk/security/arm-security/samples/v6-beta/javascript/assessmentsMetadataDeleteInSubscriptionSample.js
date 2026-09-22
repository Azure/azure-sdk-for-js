// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete metadata information on an assessment type in a specific subscription, will cause the deletion of all the assessments of that type in that subscription
 *
 * @summary delete metadata information on an assessment type in a specific subscription, will cause the deletion of all the assessments of that type in that subscription
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/DeleteAssessmentsMetadata_subscription_example.json
 */
async function deleteASecurityAssessmentMetadataForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0980887d-03d6-408c-9566-532f3456804e";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.assessmentsMetadata.deleteInSubscription("ca039e75-a276-4175-aebc-bcd41e4b14b7");
}

async function main() {
  await deleteASecurityAssessmentMetadataForSubscription();
}

main().catch(console.error);
