// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to move replications from a process server to another process server.
 *
 * @summary the operation to move replications from a process server to another process server.
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_ReassociateGateway.json
 */
async function performFailoverOfTheProcessServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationFabrics.reassociateGateway(
    "MadhaviVRG",
    "MadhaviVault",
    "GRACE-V2A-1",
    {
      properties: {
        containerName: "cloud_1f3c15af-2256-4568-9e06-e1ef4f728f75",
        sourceProcessServerId: "AFA0EC54-1894-4E44-9CAB02DB8854B117",
        targetProcessServerId: "5D3ED340-85AE-C646-B338641E015DA405",
        updateType: "ServerLevel",
        vmsToMigrate: ["Vm1", "Vm2"],
      },
    },
  );
  console.log(result);
}

async function main() {
  await performFailoverOfTheProcessServer();
}

main().catch(console.error);
