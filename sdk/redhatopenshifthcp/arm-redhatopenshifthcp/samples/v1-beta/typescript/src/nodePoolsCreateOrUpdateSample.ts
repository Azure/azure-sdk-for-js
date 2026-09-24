// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NodePool
 *
 * @summary create a NodePool
 * x-ms-original-file: 2026-09-01-preview/NodePools_CreateOrUpdate_MaximumSet_Gen.json
 */
async function nodePoolsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.nodePools.createOrUpdate(
    "rgopenapi",
    "hcpCluster-name",
    "nodePool-name",
    {
      properties: {
        version: { channelGroup: "stable", id: "4.12" },
        platform: {
          subnetId:
            "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualNetworks/hcp-network-example/subnets/example-subnet",
          vmSize: "Standard_D2s_v3",
          availabilityZone: "australiaeast-az1",
          enableEncryptionAtHost: true,
          osDisk: {
            sizeGiB: 64,
            diskStorageAccountType: "Premium_LRS",
            encryptionSetId:
              "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/resourceGroupName/providers/Microsoft.Compute/diskEncryptionSets/hcp-disk-encryption-set-example",
            diskType: "Managed",
          },
        },
        replicas: 18,
        autoRepair: true,
        autoScaling: { min: 6, max: 29 },
        labels: [{ key: "release", value: "4.12" }],
        taints: [
          {
            key: "iveofwsptzsxepyfirlfypshvkgzkpfdwrpreacacbcifrzpvmgmovnpmkeqxgvamtbwqfewlrnlcqcmbnqhdgvosyxazqxwtlcviveerkvdrveayeyvasngwjmrsnhyvmayzrndwahvuoocvbqjuscmybctzhrhbotipnrwhnkhejgiuanmidrdjetccddupjtvvztlbwlgdxgdwlhxdlluvcduh",
            value: "x",
            effect: "NoSchedule",
          },
        ],
        nodeDrainTimeoutMinutes: 20,
      },
      tags: { key: "value" },
      location: "mqewzbuvnyxnwbmir",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nodePoolsCreateOrUpdate();
}

main().catch(console.error);
