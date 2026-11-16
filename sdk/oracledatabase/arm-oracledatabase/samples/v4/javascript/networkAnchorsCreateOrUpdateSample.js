// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a NetworkAnchor
 *
 * @summary create a NetworkAnchor
 * x-ms-original-file: 2026-06-01/NetworkAnchors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function networkAnchorsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.networkAnchors.createOrUpdate("rgopenapi", "resource1", {
    properties: {
      resourceAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resourceAnchors/anchor1",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      ociVcnDnsLabel: "example",
      ociBackupCidrBlock: "example",
      isOracleToAzureDnsZoneSyncEnabled: true,
      isOracleDnsListeningEndpointEnabled: true,
      isOracleDnsForwardingEndpointEnabled: true,
      dnsForwardingRules: [{ domainNames: "ghs", forwardingIpAddress: "example" }],
      dnsListeningEndpointAllowedCidrs: "toqgyp",
      proximityPlacementGroup: {
        proximityPlacementGroupId: "example",
        proximityAnchorId: "example",
        entityTypeIntendedToUse: "CloudExadataInfrastructure",
      },
    },
    zones: ["zznbkklaih"],
    tags: { key6589: "mcg" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await networkAnchorsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
