// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 *
 * @summary enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 * x-ms-original-file: 2026-02-01-preview/DeleteSuppression.json
 */
async function deleteSuppression() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  await client.suppressions.delete("resourceUri", "recommendationId", "HardcodedSuppressionName");
}

async function main() {
  await deleteSuppression();
}

main().catch(console.error);
