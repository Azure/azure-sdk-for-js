// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation updates a policy exemption with the given scope and name.
 *
 * @summary this operation updates a policy exemption with the given scope and name.
 * x-ms-original-file: 2026-01-01-preview/updatePolicyExemptionWithExemptionManagementMode.json
 */
async function updateAPolicyExemptionWithExemptionManagementMode() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.update(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    { exemptionManagementMode: "Admin" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation updates a policy exemption with the given scope and name.
 *
 * @summary this operation updates a policy exemption with the given scope and name.
 * x-ms-original-file: 2026-01-01-preview/updatePolicyExemptionWithResourceSelectors.json
 */
async function updateAPolicyExemptionWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.update(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
    {
      assignmentScopeValidation: "Default",
      resourceSelectors: [
        {
          name: "SDPRegions",
          selectors: [{ kind: "resourceLocation", in: ["eastus2euap", "centraluseuap"] }],
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await updateAPolicyExemptionWithExemptionManagementMode();
  await updateAPolicyExemptionWithResourceSelectors();
}

main().catch(console.error);
