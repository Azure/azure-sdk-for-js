// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProfessionalServiceClient } from "@azure/arm-professionalservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Professional Service resource by its name.
 *
 * @summary gets a Professional Service resource by its name.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceGet.json
 */
async function getAProfessionalServiceSubscriptionLevelResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevel.get(
    "myResourceGroup",
    "myPsResource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAProfessionalServiceSubscriptionLevelResource();
}

main().catch(console.error);
