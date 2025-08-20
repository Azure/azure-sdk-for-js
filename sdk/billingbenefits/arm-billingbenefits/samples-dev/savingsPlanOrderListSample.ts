// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all Savings plan orders.
 *
 * @summary List all Savings plan orders.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderList.json
 */

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanOrderList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlanOrder.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

savingsPlanOrderList().catch(console.error);
