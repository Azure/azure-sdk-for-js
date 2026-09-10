// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a single policy enrollment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy enrollment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyEnrollment.json
 */
async function retrieveAPolicyEnrollment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyEnrollments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this operation retrieves a single policy enrollment, given its name and the scope it was created at.
 *
 * @summary this operation retrieves a single policy enrollment, given its name and the scope it was created at.
 * x-ms-original-file: 2026-01-01-preview/getPolicyEnrollmentWithResourceSelectors.json
 */
async function retrieveAPolicyEnrollmentWithResourceSelectors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyEnrollments.get(
    "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/demoCluster",
    "DemoExpensiveVM",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicyEnrollment();
  await retrieveAPolicyEnrollmentWithResourceSelectors();
}

main().catch(console.error);
