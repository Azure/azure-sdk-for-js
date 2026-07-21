// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this triggers detection of any drifts from the desired state of Resources and RBAC.
 *
 * @summary this triggers detection of any drifts from the desired state of Resources and RBAC.
 * x-ms-original-file: 2026-04-01-preview/Drills_ResyncReadinessCheck_MaximumSet_Gen.json
 */
async function drillsResyncReadinessCheckMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.resyncReadinessCheck("sampleServiceGroupName", "qmn", "drill1");
}

async function main() {
  await drillsResyncReadinessCheckMaximumSet();
}

main().catch(console.error);
