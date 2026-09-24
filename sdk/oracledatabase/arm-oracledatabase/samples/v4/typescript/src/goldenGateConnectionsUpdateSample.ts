// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a GoldenGateConnection
 *
 * @summary update a GoldenGateConnection
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_Update_MaximumSet_Gen.json
 */
async function goldenGateConnectionsUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateConnections.update("rgopenapi", "resource1", {
    zones: ["example"],
    tags: { key3963: "example" },
    properties: {
      connectionType: "GOLDENGATE",
      displayName: "resource1",
      routingMethod: "SHARED_SERVICE_ENDPOINT",
      vaultId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      keyId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      doesUseSecretIds: true,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateConnectionsUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
