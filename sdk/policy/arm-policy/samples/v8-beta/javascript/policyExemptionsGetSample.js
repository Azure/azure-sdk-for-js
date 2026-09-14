// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a single policy exemption, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy exemption, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyExemption.json
 */
async function retrieveAPolicyExemption() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation retrieves a single policy exemption, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy exemption, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyExemptionWithResourceSelectors.json
 */
async function retrieveAPolicyExemptionWithResourceSelectors() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyExemptions.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicyExemption();
  await retrieveAPolicyExemptionWithResourceSelectors();
}

main().catch(console.error);
