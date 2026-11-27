// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unsubscribes from a Professional Service subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled.
 *
 * @summary unsubscribes from a Professional Service subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceUnsubscribe.json
 */
async function unsubscribeFromAProfessionalServiceSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevel.unsubscribe(
    "myResourceGroup",
    "myPsResource",
    {
      unsubscribeOnly: true,
      reasonCode: 4,
      feedback: "Engagement complete",
      deletionSource: "CustomerCancellation",
    },
  );
  console.log(result);
}

async function main() {
  await unsubscribeFromAProfessionalServiceSubscriptionLevelResource();
}

main().catch(console.error);
