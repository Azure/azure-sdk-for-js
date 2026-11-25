// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates a proposed update to an existing SaaS resource without modifying the resource.
 *
 * @summary validates a proposed update to an existing SaaS resource without modifying the resource.
 * x-ms-original-file: 2026-04-01/SaasValidateUpdate.json
 */
async function validateAnUpdateToAnExistingSaaSResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.validateUpdate(
    "myResourceGroup",
    "mySaasResource",
    {
      properties: {
        productCode: "0007150b-0000-0160-2654-64a36bcef7ba",
        quantity: 10,
        intent: "Retain",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateAnUpdateToAnExistingSaaSResource();
}

main().catch(console.error);
