// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create a protection container mapping.
 *
 * @summary the operation to create a protection container mapping.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainerMappings_Create.json
 */
async function createProtectionContainerMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionContainerMappings.create(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "cloud1protectionprofile1",
    {
      properties: {
        policyId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/protectionprofile1",
        providerSpecificInput: { instanceType: "ReplicationProviderSpecificContainerMappingInput" },
        targetProtectionContainerId: "Microsoft Azure",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createProtectionContainerMapping();
}

main().catch(console.error);
