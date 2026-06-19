// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Azure services' emerging issues.
 *
 * @summary gets Azure services' emerging issues.
 * x-ms-original-file: 2025-05-01/EmergingIssues_Get.json
 */
async function getEmergingIssues() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.emergingIssues.get("default");
  console.log(result);
}

async function main() {
  await getEmergingIssues();
}

main().catch(console.error);
