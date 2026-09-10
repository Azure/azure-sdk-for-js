// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation updates a policy enrollment with the given scope and name.
 *
 * @summary this operation updates a policy enrollment with the given scope and name.
 * x-ms-original-file: 2026-01-01-preview/updatePolicyEnrollmentWithResourceSelectors.json
 */
async function updateAPolicyEnrollmentWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyEnrollments.update(
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
  await updateAPolicyEnrollmentWithResourceSelectors();
}

main().catch(console.error);
