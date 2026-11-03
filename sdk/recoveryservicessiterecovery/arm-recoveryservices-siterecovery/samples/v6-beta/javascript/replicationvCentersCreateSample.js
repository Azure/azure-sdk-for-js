// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create a vCenter object..
 *
 * @summary the operation to create a vCenter object..
 * x-ms-original-file: 2025-08-01/ReplicationvCenters_Create.json
 */
async function addVCenter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationvCenters.create(
    "MadhaviVRG",
    "MadhaviVault",
    "MadhaviFabric",
    "esx-78",
    {
      properties: {
        friendlyName: "esx-78",
        ipAddress: "inmtest78",
        port: "443",
        processServerId: "5A720CAB-39CB-F445-BD1662B0B33164B5",
        runAsAccountId: "2",
      },
    },
  );
  console.log(result);
}

async function main() {
  await addVCenter();
}

main().catch(console.error);
