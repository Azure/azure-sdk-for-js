// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all ASR network mappings in the vault.
 *
 * @summary lists all ASR network mappings in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationNetworkMappings_List.json
 */
async function getsAllTheNetworkMappingsUnderAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationNetworkMappings.list(
    "srcBvte2a14C27",
    "srce2avaultbvtaC27",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAllTheNetworkMappingsUnderAVault();
}

main().catch(console.error);
