// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a savings plan order.
 *
 * @summary Get a savings plan order.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderGet.json
 */

import type { SavingsPlanOrderGetOptionalParams } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanOrderGet(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrder.get(savingsPlanOrderId);
  console.log(result);
}

savingsPlanOrderGet().catch(console.error);

/**
 * This sample demonstrates how to Get a savings plan order.
 *
 * @summary Get a savings plan order.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderExpandedGet.json
 */
async function savingsPlanOrderWithExpandedPaymentsGet(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const expand = "schedule";
  const options: SavingsPlanOrderGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrder.get(savingsPlanOrderId, options);
  console.log(result);
}

savingsPlanOrderWithExpandedPaymentsGet().catch(console.error);
