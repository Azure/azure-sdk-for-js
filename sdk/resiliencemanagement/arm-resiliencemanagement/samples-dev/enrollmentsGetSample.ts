// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an Enrollment.
 *
 * @summary get an Enrollment.
 * x-ms-original-file: 2026-04-01-preview/Enrollments_Get_MaximumSet_Gen.json
 */
async function enrollmentsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  const result = await client.enrollments.get("MyResourceGroup", "myUsagePlan", "sg1-enrollment");
  console.log(result);
}

async function main(): Promise<void> {
  await enrollmentsGetMaximumSet();
}

main().catch(console.error);
