// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get savings plan.
 *
 * @summary Get savings plan.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanItemGet.json
 */

import type { SavingsPlanGetOptionalParams } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanItemGet(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlan.get(savingsPlanOrderId, savingsPlanId);
  console.log(result);
}

savingsPlanItemGet().catch(console.error);

/**
 * This sample demonstrates how to Get savings plan.
 *
 * @summary Get savings plan.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanItemExpandedGet.json
 */
async function savingsPlanItemWithExpandedRenewPropertiesGet(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const expand = "renewProperties";
  const options: SavingsPlanGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlan.get(savingsPlanOrderId, savingsPlanId, options);
  console.log(result);
}

savingsPlanItemWithExpandedRenewPropertiesGet().catch(console.error);
