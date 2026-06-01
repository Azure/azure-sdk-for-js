// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Datadog marketplace agreement in the subscription.
 *
 * @summary create Datadog marketplace agreement in the subscription.
 * x-ms-original-file: 2025-12-26-preview/MarketplaceAgreements_Create.json
 */
async function marketplaceAgreementsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.marketplaceAgreements.createOrUpdate({
    body: { properties: { accepted: true } },
  });
  console.log(result);
}

async function main() {
  await marketplaceAgreementsCreateOrUpdate();
}

main().catch(console.error);
