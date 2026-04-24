// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets Verifier Workspace.
 *
 * @summary Gets Verifier Workspace.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VerifierWorkspaceGet.json
 */
async function verifierWorkspaceGet() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const workspaceName = "testWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.verifierWorkspaces.get(
    resourceGroupName,
    networkManagerName,
    workspaceName,
  );
  console.log(result);
}

async function main() {
  await verifierWorkspaceGet();
}

main().catch(console.error);
