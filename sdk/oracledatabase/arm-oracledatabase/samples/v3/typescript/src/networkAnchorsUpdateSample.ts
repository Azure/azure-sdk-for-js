// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a NetworkAnchor
 *
 * @summary update a NetworkAnchor
 * x-ms-original-file: 2025-09-01/NetworkAnchors_Update_MaximumSet_Gen.json
 */
async function networkAnchorsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.networkAnchors.update("rgopenapi", "networkanchor1", {
    zones: ["zone1"],
    tags: { key8038: "oqbirdmumdslewkcradmyvojgorraz" },
    properties: {
      ociBackupCidrBlock: "waoztwkdpplgjtkiwkfnnohu",
      isOracleToAzureDnsZoneSyncEnabled: true,
      isOracleDnsListeningEndpointEnabled: true,
      isOracleDnsForwardingEndpointEnabled: true,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkAnchorsUpdateMaximumSet();
}

main().catch(console.error);
