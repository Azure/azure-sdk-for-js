// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Professional Service resource.
 *
 * @summary deletes a Professional Service resource.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceDelete.json
 */
async function deleteAProfessionalServiceSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  await client.professionalServiceSubscriptionLevel.delete("myResourceGroup", "myPsResource");
}

async function main() {
  await deleteAProfessionalServiceSubscriptionLevelResource();
}

main().catch(console.error);
