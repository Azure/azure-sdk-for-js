// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to Setup Machine Extensions.
 *
 * @summary the operation to Setup Machine Extensions.
 * x-ms-original-file: 2026-06-16-preview/extension/Extension_Add.json
 */
async function setupMachineExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.setupExtensions("myResourceGroup", "myMachine", {
    extensions: [
      { type: "AzureMonitorAgentLinux", publisher: "Microsoft.Azure.Monitoring" },
      { type: "<extension_type>", publisher: "<extension_publisher>" },
    ],
  });
  console.log(result);
}

async function main() {
  await setupMachineExtensions();
}

main().catch(console.error);
