// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an VolumeGroup.
 *
 * @summary update an VolumeGroup.
 * x-ms-original-file: 2025-09-01/VolumeGroups_Update_MaximumSet_Gen.json
 */
async function volumeGroupsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.update(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      identity: { type: "None", userAssignedIdentities: { key2350: {} } },
      properties: {
        encryption: "EncryptionAtRestWithPlatformKey",
        encryptionProperties: {
          encryptionIdentity: { encryptionUserAssignedIdentity: "vgbeephfgecgg" },
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
 * This sample demonstrates how to update an VolumeGroup.
 *
 * @summary update an VolumeGroup.
 * x-ms-original-file: 2025-09-01/VolumeGroups_Update_MinimumSet_Gen.json
 */
async function volumeGroupsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.update(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {},
  );
  console.log(result);
}

async function main() {
  await volumeGroupsUpdateMaximumSetGen();
  await volumeGroupsUpdateMinimumSetGen();
}

main().catch(console.error);
