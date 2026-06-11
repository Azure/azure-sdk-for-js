// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restore resource for a protected items in given protection group.
 *
 * @summary restore resource for a protected items in given protection group.
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Restore_MaximumSet_Gen.json
 */
async function protectionGroupsRestoreMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectionGroups.restore(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    {
      inPlaceRestore: true,
      restoreType: "NONE",
      toTime: "kgueys",
      vmDestinationInfo: {
        vmInfoList: [
          {
            sourceVmGuid: "40000000-aaaa-4bbb-8ccc-000000000000",
            storageAccountId: "pldvo",
            powerOnVmAfterRestore: true,
            name: "ctmwbnzhxqdhshl",
            resourceGroup: "pdfpesq",
            region: "ywwecvwsosvatgmulaxfnja",
            networkId: "amtetghiqnbjuiurekikacvymxjcv",
            subnetId: "klskhhutusnzycgxaq",
            attachAndSwapOsDisk: true,
            targetVmGuid: "40000000-aaaa-4bbb-8ccc-000000000001",
            vmtags: [{ name: "dzabcqlzgqphznrpzhrqbsszgdzjrh", value: "zjtpbngipinqlwajjrf" }],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await protectionGroupsRestoreMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
