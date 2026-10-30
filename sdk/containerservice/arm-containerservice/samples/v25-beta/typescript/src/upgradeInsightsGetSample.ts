// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a stored upgrade insight for the managed cluster by its server-generated name.
 * This is a read-only operation: it returns the most recently generated readiness
 * evaluation for that scope from the data store, including the detected
 * upgrade-blocking issues and contextual upgrade information. It does not regenerate
 * the evaluation. If no non-expired evaluation exists for the name, it returns 404.
 *
 * @summary gets a stored upgrade insight for the managed cluster by its server-generated name.
 * This is a read-only operation: it returns the most recently generated readiness
 * evaluation for that scope from the data store, including the detected
 * upgrade-blocking issues and contextual upgrade information. It does not regenerate
 * the evaluation. If no non-expired evaluation exists for the name, it returns 404.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersGetUpgradeInsight.json
 */
async function getAStoredUpgradeInsight(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.upgradeInsights.get("rg1", "clustername1", "controlPlane-1.33.5");
  console.log(result);
}

async function main(): Promise<void> {
  await getAStoredUpgradeInsight();
}

main().catch(console.error);
