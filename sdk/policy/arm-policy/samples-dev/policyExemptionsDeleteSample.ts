// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation deletes a policy exemption, given its name and the scope it was created in. The scope of a policy exemption is the part of its ID preceding '/providers/Microsoft.Authorization/policyExemptions/{policyExemptionName}'.
 *
 * @summary this operation deletes a policy exemption, given its name and the scope it was created in. The scope of a policy exemption is the part of its ID preceding '/providers/Microsoft.Authorization/policyExemptions/{policyExemptionName}'.
 * x-ms-original-file: 2026-01-01-preview/deletePolicyExemption.json
 */
async function deleteAPolicyExemption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  await client.policyExemptions.delete(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
  );
}

async function main(): Promise<void> {
  await deleteAPolicyExemption();
}

main().catch(console.error);
