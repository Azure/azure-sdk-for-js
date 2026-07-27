// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Enrollments by Usage Plan.
 *
 * @summary list Enrollments by Usage Plan.
 * x-ms-original-file: 2026-04-01-preview/Enrollments_List_MaximumSet_Gen.json
 */
async function enrollmentsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enrollments.list("MyResourceGroup", "myUsagePlan")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await enrollmentsListMaximumSet();
}

main().catch(console.error);
