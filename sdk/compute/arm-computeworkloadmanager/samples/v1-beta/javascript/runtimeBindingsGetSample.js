// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a runtime binding.
 *
 * @summary gets a runtime binding.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Get.json
 */
async function getARuntimeBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeBindings.get(
    "rg-workload",
    "managed-agents-prod",
    "kubernetes-default",
  );
  console.log(result);
}

async function main() {
  await getARuntimeBinding();
}

main().catch(console.error);
