// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NetworkAnchor
 *
 * @summary create a NetworkAnchor
 * x-ms-original-file: 2025-09-01/NetworkAnchors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function networkAnchorsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.networkAnchors.createOrUpdate("rgopenapi", "networkAnchor1", {
    properties: {
      resourceAnchorId: "ivxnsdkelptazxrbzzrs",
      vnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
      ociVcnId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      ociVcnDnsLabel: "taqimtjhlsshwakiaocbsrewvkq",
      ociSubnetId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      ociBackupCidrBlock: "i",
      isOracleToAzureDnsZoneSyncEnabled: true,
      isOracleDnsListeningEndpointEnabled: true,
      isOracleDnsForwardingEndpointEnabled: true,
      dnsForwardingRules: [{ domainNames: "domain1, domain2", forwardingIpAddress: "qe" }],
    },
    zones: ["qwrgwcmycokwbhdafhoheaxzoxx"],
    tags: { key4863: "dqpczcjijybwwtgo" },
    location: "igamtwfkkmjnkcceh",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkAnchorsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
