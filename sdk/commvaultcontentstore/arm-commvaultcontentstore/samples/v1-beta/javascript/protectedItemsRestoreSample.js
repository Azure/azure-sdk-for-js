// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restore resource for a protected item.
 *
 * @summary restore resource for a protected item.
 * x-ms-original-file: 2026-07-03-preview/ProtectedItems_Restore_MaximumSet_Gen.json
 */
async function protectedItemsRestoreMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectedItems.restore(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    "sample-protectedItemName",
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

async function main() {
  await protectedItemsRestoreMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
