// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 *
 * @summary enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 * x-ms-original-file: 2026-02-01-preview/DeleteSuppression.json
 */
async function deleteSuppression(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  await client.suppressions.delete("resourceUri", "recommendationId", "HardcodedSuppressionName");
}

async function main(): Promise<void> {
  await deleteSuppression();
}

main().catch(console.error);
