// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to acknowledge notification for offer
 *
 * @summary acknowledge notification for offer
 * x-ms-original-file: 2025-01-01/AcknowledgeNotification.json
 */
async function acknowledgeNotification() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStore.acknowledgeOfferNotification(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
    {
      payload: {
        acknowledge: false,
        dismiss: false,
        removeOffer: false,
        removePlans: ["testPlanA"],
      },
    },
  );
}

async function main() {
  await acknowledgeNotification();
}

main().catch(console.error);
