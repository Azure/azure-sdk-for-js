// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update protection container mapping.
 *
 * @summary the operation to update protection container mapping.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainerMappings_Update.json
 */
async function updateProtectionContainerMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionContainerMappings.update(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "cloud1protectionprofile1",
    {
      properties: {
        providerSpecificInput: {
          agentAutoUpdateStatus: "Enabled",
          automationAccountArmId:
            "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/automationrg1/providers/Microsoft.Automation/automationAccounts/automationaccount1",
          instanceType: "A2A",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateProtectionContainerMapping();
}

main().catch(console.error);
