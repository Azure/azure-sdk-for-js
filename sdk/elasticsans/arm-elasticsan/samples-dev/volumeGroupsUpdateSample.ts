// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VolumeGroupUpdate} from "@azure/arm-elasticsan";
import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update an VolumeGroup.
 *
 * @summary Update an VolumeGroup.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/VolumeGroups_Update_MaximumSet_Gen.json
 */
async function volumeGroupsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const parameters: VolumeGroupUpdate = {
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
        virtualNetworkRules: [
          { action: "Allow", virtualNetworkResourceId: "fhhawhc" },
        ],
      },
      protocolType: "Iscsi",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.beginUpdateAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update an VolumeGroup.
 *
 * @summary Update an VolumeGroup.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/VolumeGroups_Update_MinimumSet_Gen.json
 */
async function volumeGroupsUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const parameters: VolumeGroupUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.beginUpdateAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsUpdateMaximumSetGen();
  await volumeGroupsUpdateMinimumSetGen();
}

main().catch(console.error);
