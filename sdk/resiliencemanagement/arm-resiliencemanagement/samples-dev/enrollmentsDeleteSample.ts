// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an Enrollment.
 *
 * @summary delete an Enrollment.
 * x-ms-original-file: 2026-04-01-preview/Enrollments_Delete_MaximumSet_Gen.json
 */
async function enrollmentsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  await client.enrollments.delete("MyResourceGroup", "myUsagePlan", "sg1-enrollment");
}

async function main(): Promise<void> {
  await enrollmentsDeleteMaximumSet();
}

main().catch(console.error);
