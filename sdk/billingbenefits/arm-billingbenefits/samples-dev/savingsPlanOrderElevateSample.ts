// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Elevate as owner on savings plan order based on billing permissions.
 *
 * @summary Elevate as owner on savings plan order based on billing permissions.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderElevate.json
 */

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanOrderElevate(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrder.elevate(savingsPlanOrderId);
  console.log(result);
}

savingsPlanOrderElevate().catch(console.error);
