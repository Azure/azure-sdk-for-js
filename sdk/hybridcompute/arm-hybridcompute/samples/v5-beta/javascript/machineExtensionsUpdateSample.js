// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update the extension.
 *
 * @summary the operation to create or update the extension.
 * x-ms-original-file: 2026-06-16-preview/extension/Extension_Update.json
 */
async function createOrUpdateAMachineExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machineExtensions.update(
    "myResourceGroup",
    "myMachine",
    "CustomScriptExtension",
    {
      type: "CustomScriptExtension",
      enableAutomaticUpgrade: true,
      publisher: "Microsoft.Compute",
      settings: {
        commandToExecute: 'powershell.exe -c "Get-Process | Where-Object { $_.CPU -lt 100 }"',
      },
      typeHandlerVersion: "1.10",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAMachineExtension();
}

main().catch(console.error);
