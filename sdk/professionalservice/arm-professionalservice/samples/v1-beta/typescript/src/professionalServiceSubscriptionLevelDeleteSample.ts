// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProfessionalServiceClient } from "@azure/arm-professionalservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Professional Service resource.
 *
 * @summary deletes a Professional Service resource.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceDelete.json
 */
async function deleteAProfessionalServiceSubscriptionLevelResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  await client.professionalServiceSubscriptionLevel.delete("myResourceGroup", "myPsResource");
}

async function main(): Promise<void> {
  await deleteAProfessionalServiceSubscriptionLevelResource();
}

main().catch(console.error);
