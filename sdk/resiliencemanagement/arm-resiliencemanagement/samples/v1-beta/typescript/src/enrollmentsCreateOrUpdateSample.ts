// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Enrollment.
 *
 * @summary create or update an Enrollment.
 * x-ms-original-file: 2026-04-01-preview/Enrollments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function enrollmentsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  const result = await client.enrollments.createOrUpdate(
    "MyResourceGroup",
    "myUsagePlan",
    "sg1-enrollment",
    { properties: { serviceGroupId: "/providers/Microsoft.Management/serviceGroups/sg1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enrollmentsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
