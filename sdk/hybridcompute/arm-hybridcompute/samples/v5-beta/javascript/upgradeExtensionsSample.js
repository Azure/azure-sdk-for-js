// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to Upgrade Machine Extensions.
 *
 * @summary the operation to Upgrade Machine Extensions.
 * x-ms-original-file: 2026-06-16-preview/extension/Extensions_Upgrade.json
 */
async function upgradeMachineExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.upgradeExtensions("myResourceGroup", "myMachine", {
    extensionTargets: {
      "Microsoft.Azure.Monitoring": { targetVersion: "2.0" },
      "Microsoft.Compute.CustomScriptExtension": { targetVersion: "1.10" },
    },
  });
}

async function main() {
  await upgradeMachineExtensions();
}

main().catch(console.error);
