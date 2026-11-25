// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks whether a proposed Professional Service resource name is available.
 *
 * @summary checks whether a proposed Professional Service resource name is available.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceCheckNameAvailability.json
 */
async function checkNameAvailabilityForAProfessionalServiceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevelGlobal.checkNameAvailability({
    name: "/subscriptions/1a950b42-75c2-44a6-ab02-fc0f840997aa/resourceGroups/myResourceGroup/providers/Microsoft.ProfessionalService/resources/myPsResource",
    type: "Microsoft.ProfessionalService/resources",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailabilityForAProfessionalServiceResource();
}

main().catch(console.error);
