// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanClient } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2024-07-01-preview/VolumeGroups_Create_MaximumSet_Gen.json
 */
async function volumeGroupsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      identity: { type: "None", userAssignedIdentities: { key2350: {} } },
      properties: {
        deleteRetentionPolicy: {
          policyState: "Enabled",
          retentionPeriodDays: 14,
        },
        encryption: "EncryptionAtRestWithPlatformKey",
        encryptionProperties: {
          encryptionIdentity: {
            encryptionUserAssignedIdentity: "vgbeephfgecgg",
          },
          keyVaultProperties: {
            keyName: "rommjwp",
            keyVaultUri: "https://microsoft.com/at",
            keyVersion: "ulmxxgzgsuhalwesmhfslq",
          },
        },
        enforceDataIntegrityCheckForIscsi: true,
        networkAcls: {
          virtualNetworkRules: [{ action: "Allow", virtualNetworkResourceId: "fhhawhc" }],
        },
        protocolType: "Iscsi",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2024-07-01-preview/VolumeGroups_Create_MinimumSet_Gen.json
 */
async function volumeGroupsCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsCreateMaximumSetGen();
  await volumeGroupsCreateMinimumSetGen();
}

main().catch(console.error);
