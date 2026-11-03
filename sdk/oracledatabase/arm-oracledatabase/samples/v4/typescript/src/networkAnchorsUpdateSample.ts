// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a NetworkAnchor
 *
 * @summary update a NetworkAnchor
 * x-ms-original-file: 2026-06-01/NetworkAnchors_Update_MaximumSet_Gen.json
 */
async function networkAnchorsUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.networkAnchors.update("rgopenapi", "resource1", {
    zones: ["example"],
    tags: { key2518: "example" },
    properties: {
      ociBackupCidrBlock: "zll",
      isOracleToAzureDnsZoneSyncEnabled: true,
      isOracleDnsListeningEndpointEnabled: true,
      isOracleDnsForwardingEndpointEnabled: true,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkAnchorsUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
