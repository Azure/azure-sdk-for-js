// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the specified volume within the capacity pool
 *
 * @summary create or update the specified volume within the capacity pool
 * x-ms-original-file: 2025-09-01-preview/ElasticVolumes_CreateOrUpdate.json
 */
async function elasticVolumesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticVolumes.createOrUpdate(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    {
      location: "eastus",
      properties: {
        filePath: "my-unique-file-path",
        size: 107374182400,
        exportPolicy: {
          rules: [
            {
              ruleIndex: 1,
              unixAccessRule: "ReadOnly",
              nfsv3: "Enabled",
              nfsv4: "Disabled",
              allowedClients: ["0.0.0.0/0"],
              rootAccess: "Disabled",
            },
          ],
        },
        protocolTypes: ["NFSv3"],
        dataProtection: {
          snapshot: {
            snapshotPolicyResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticSnapshotPolicies/policy1",
          },
          backup: {
            elasticBackupVaultResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticBackupVaults/elasticBackupVault1",
            elasticBackupPolicyResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticBackupPolicies/elasticBackupPolicy1",
            policyEnforcement: "Enforced",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticVolumesCreateOrUpdate();
}

main().catch(console.error);
