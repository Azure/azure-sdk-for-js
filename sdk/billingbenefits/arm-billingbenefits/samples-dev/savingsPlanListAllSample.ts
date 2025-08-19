// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List savings plans.
 *
 * @summary List savings plans.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlansList.json
 */

import type { SavingsPlanListAllOptionalParams } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlansList(): Promise<void> {
  const filter = "(properties%2farchived+eq+false)";
  const orderby = "properties/displayName asc";
  const skiptoken = 50;
  const take = 1;
  const options: SavingsPlanListAllOptionalParams = {
    filter,
    orderby,
    skiptoken,
    take,
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlan.listAll(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

savingsPlansList().catch(console.error);
