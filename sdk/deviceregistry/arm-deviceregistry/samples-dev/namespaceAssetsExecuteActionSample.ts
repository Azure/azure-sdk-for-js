// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-11-01-preview/ExecuteAction_Assets_Namespace.json
 */
async function namespaceAssetExecuteAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceAssets.executeAction("myResourceGroup", "my-namespace-1", "my-asset-1", {
    managementActionName: "my-asset-action-1",
    managementGroupName: "my-asset-group-1",
    payload: { prop1: "value1", prop2: "123", prop3: true, prop4: { subProp1: "subValue1" } },
  });
}

async function main(): Promise<void> {
  await namespaceAssetExecuteAction();
}

main().catch(console.error);
