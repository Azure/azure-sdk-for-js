// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DatadogAgreementResource,
  MarketplaceAgreementsCreateOrUpdateOptionalParams,
} from "@azure/arm-datadog";
import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create Datadog marketplace agreement in the subscription.
 *
 * @summary Create Datadog marketplace agreement in the subscription.
 * x-ms-original-file: specification/datadog/resource-manager/Microsoft.Datadog/stable/2023-01-01/examples/MarketplaceAgreements_Create.json
 */
async function marketplaceAgreementsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DATADOG_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const body: DatadogAgreementResource = { properties: { accepted: true } };
  const options: MarketplaceAgreementsCreateOrUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.marketplaceAgreements.createOrUpdate(options);
  console.log(result);
}

async function main(): Promise<void> {
  await marketplaceAgreementsCreateOrUpdate();
}

main().catch(console.error);
