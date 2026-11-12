// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a GoldenGateConnection
 *
 * @summary create a GoldenGateConnection
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_CreateOrUpdate_MaximumSet_Gen.json
 */
async function goldenGateConnectionsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateConnections.createOrUpdate("rgopenapi", "resource1", {
    properties: {
      connectionType: "ConnectionBaseProperties",
      displayName: "resource1",
      resourceAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resourceAnchors/anchor1",
      networkAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/networkAnchors/networkanchor1",
      routingMethod: "SHARED_SERVICE_ENDPOINT",
      vaultId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      keyId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      doesUseSecretIds: true,
    },
    zones: ["example"],
    tags: { key7255: "example" },
    location: "rtnrfzgdo",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateConnectionsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
