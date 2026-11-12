// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a diagnostic detector.
 *
 * @summary gets a diagnostic detector.
 * x-ms-original-file: 2026-07-01-preview/Detectors_Get.json
 */
async function detectorsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.detectors.get("rgopenapi", "testscheduler", "cpuhealth");
  console.log(result);
}

async function main() {
  await detectorsGet();
}

main().catch(console.error);
