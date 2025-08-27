// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create Or Update GuestAgent.
 *
 * @summary Create Or Update GuestAgent.
 * x-ms-original-file: specification/connectedvmware/resource-manager/Microsoft.ConnectedVMwarevSphere/stable/2023-10-01/examples/CreateVMInstanceGuestAgent.json
 */

import type {
  GuestAgent,
  VMInstanceGuestAgentsCreateOptionalParams,
} from "@azure/arm-connectedvmware";
import { AzureArcVMwareManagementServiceAPI } from "@azure/arm-connectedvmware";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createGuestAgent(): Promise<void> {
  const resourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM";
  const body: GuestAgent = {
    credentials: { password: "<password>", username: "tempuser" },
    httpProxyConfig: { httpsProxy: "http://192.1.2.3:8080" },
    privateLinkScopeResourceId:
      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.HybridCompute/privateLinkScopes/privateLinkScopeName",
    provisioningAction: "install",
  };
  const options: VMInstanceGuestAgentsCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new AzureArcVMwareManagementServiceAPI(credential);
  const result = await client.vMInstanceGuestAgents.beginCreateAndWait(resourceUri, options);
  console.log(result);
}

async function main(): Promise<void> {
  await createGuestAgent();
}

main().catch(console.error);
