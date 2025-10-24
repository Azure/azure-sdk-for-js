// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to check for resource name availability.
 * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
 * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 *
 * @summary aPI to check for resource name availability.
 * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
 * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 * x-ms-original-file: 2025-08-01/CheckNameAvailability_Available.json
 */
async function availabilityStatusOfResourceNameWhenNoResourceWithSameNameTypeAndSubscriptionExistsNorHasBeenDeletedWithinLast24Hours() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.recoveryServices.checkNameAvailability("resGroupFoo", "westus", {
    name: "swaggerExample",
    type: "Microsoft.RecoveryServices/Vaults",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to aPI to check for resource name availability.
 * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
 * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 *
 * @summary aPI to check for resource name availability.
 * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
 * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 * x-ms-original-file: 2025-08-01/CheckNameAvailability_NotAvailable.json
 */
async function availabilityStatusOfResourceNameWhenResourceWithSameNameTypeAndSubscriptionExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.recoveryServices.checkNameAvailability("resGroupBar", "westus", {
    name: "swaggerExample2",
    type: "Microsoft.RecoveryServices/Vaults",
  });
  console.log(result);
}

async function main() {
  await availabilityStatusOfResourceNameWhenNoResourceWithSameNameTypeAndSubscriptionExistsNorHasBeenDeletedWithinLast24Hours();
  await availabilityStatusOfResourceNameWhenResourceWithSameNameTypeAndSubscriptionExists();
}

main().catch(console.error);
