// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates a proposed update to an existing Professional Service resource without modifying the resource.
 *
 * @summary validates a proposed update to an existing Professional Service resource without modifying the resource.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceValidateUpdate.json
 */
async function validateAnUpdateToAnExistingProfessionalServiceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevel.validateUpdate(
    "myResourceGroup",
    "myPsResource",
    { tags: { environment: "production", costCenter: "CC-4820" }, properties: { quantity: 2 } },
  );
  console.log(result);
}

async function main() {
  await validateAnUpdateToAnExistingProfessionalServiceResource();
}

main().catch(console.error);
