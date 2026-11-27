// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of a long-running Professional Service operation at the subscription scope. All async operations, including resource-group-scoped ones, poll through this endpoint.
 *
 * @summary gets the status of a long-running Professional Service operation at the subscription scope. All async operations, including resource-group-scoped ones, poll through this endpoint.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceGetSubscriptionOperationStatus.json
 */
async function getProfessionalServiceOperationStatusAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceOperationStatuses.getSubscriptionOperationStatus(
    "e24b5b6b-2dfc-41ea-c457-46d0c42494af",
  );
  console.log(result);
}

async function main() {
  await getProfessionalServiceOperationStatusAtSubscriptionScope();
}

main().catch(console.error);
