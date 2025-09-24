// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to Upgrade Machine Extensions.
 *
 * @summary The operation to Upgrade Machine Extensions.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/extension/Extensions_Upgrade.json
 */

import {
  MachineExtensionUpgrade,
  HybridComputeManagementClient,
} from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function upgradeMachineExtensions(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const machineName = "myMachine";
  const extensionUpgradeParameters: MachineExtensionUpgrade = {
    extensionTargets: {
      microsoftAzureMonitoring: { targetVersion: "2.0" },
      microsoftComputeCustomScriptExtension: { targetVersion: "1.10" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.beginUpgradeExtensionsAndWait(
    resourceGroupName,
    machineName,
    extensionUpgradeParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upgradeMachineExtensions();
}

main().catch(console.error);
