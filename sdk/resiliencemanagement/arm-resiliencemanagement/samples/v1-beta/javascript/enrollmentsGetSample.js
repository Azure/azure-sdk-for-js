// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an Enrollment.
 *
 * @summary get an Enrollment.
 * x-ms-original-file: 2026-04-01-preview/Enrollments_Get_MaximumSet_Gen.json
 */
async function enrollmentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  const result = await client.enrollments.get("MyResourceGroup", "myUsagePlan", "sg1-enrollment");
  console.log(result);
}

async function main() {
  await enrollmentsGetMaximumSet();
}

main().catch(console.error);
