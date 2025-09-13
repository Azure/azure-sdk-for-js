// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validate savings plan patch.
 *
 * @summary Validate savings plan patch.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanValidateUpdate.json
 */

import type { SavingsPlanUpdateValidateRequest } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanValidateUpdate(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const body: SavingsPlanUpdateValidateRequest = {
    benefits: [
      {
        appliedScopeProperties: {
          managementGroupId:
            "/providers/Microsoft.Management/managementGroups/30000000-0000-0000-0000-000000000100",
          tenantId: "30000000-0000-0000-0000-000000000100",
        },
        appliedScopeType: "ManagementGroup",
      },
      {
        appliedScopeProperties: {
          managementGroupId: "/providers/Microsoft.Management/managementGroups/MockMG",
          tenantId: "30000000-0000-0000-0000-000000000100",
        },
        appliedScopeType: "ManagementGroup",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlan.validateUpdate(savingsPlanOrderId, savingsPlanId, body);
  console.log(result);
}

savingsPlanValidateUpdate().catch(console.error);
