// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate savings plan patch.
 *
 * @summary validate savings plan patch.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanValidateUpdate.json
 */
async function savingsPlanValidateUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlan.validateUpdate(
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
    {
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
    },
  );
  console.log(result);
}

async function main() {
  await savingsPlanValidateUpdate();
}

main().catch(console.error);
