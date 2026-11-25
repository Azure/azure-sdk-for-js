// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable properties or tags on an existing Professional Service resource.
 *
 * @summary updates mutable properties or tags on an existing Professional Service resource.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceUpdate.json
 */
async function updateAProfessionalServiceSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevel.update(
    "myResourceGroup",
    "myPsResource",
    { tags: { environment: "production", costCenter: "CC-4820" } },
  );
  console.log(result);
}

async function main() {
  await updateAProfessionalServiceSubscriptionLevelResource();
}

main().catch(console.error);
