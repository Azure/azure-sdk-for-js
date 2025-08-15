// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get a savings plan.
 *
 * @summary Get a savings plan.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasGet.json
 */
async function savingsPlanOrderAliasGet(): Promise<void> {
  const savingsPlanOrderAliasName = "spAlias123";
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrderAlias.get(savingsPlanOrderAliasName);
  console.log(result);
}

savingsPlanOrderAliasGet().catch(console.error);
