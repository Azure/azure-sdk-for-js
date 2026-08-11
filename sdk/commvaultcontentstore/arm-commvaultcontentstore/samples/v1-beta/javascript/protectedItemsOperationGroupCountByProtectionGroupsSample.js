// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the count of protected items for provided CCA resource IDs across subscriptions.
 *
 * @summary gets the count of protected items for provided CCA resource IDs across subscriptions.
 * x-ms-original-file: 2026-07-03-preview/ProtectedItemsOperationGroup_CountByProtectionGroups_MaximumSet_Gen.json
 */
async function protectedItemsOperationGroupCountByProtectionGroupsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ContentStoreClient(credential);
  const result = await client.protectedItemsOperationGroup.countByProtectionGroups({
    resourceIds: [
      "/subscriptions/65D4E6D7-7063-4C4B-BAC5-13C45474009E/resourceGroups/rgcommvault/providers/Commvault.ContentStore/cloudAccounts/sample-cloudAccountName",
      "/subscriptions/A7E4E6D7-7063-4C4B-BAC5-13C45474009E/resourceGroups/rgcommvault2/providers/Commvault.ContentStore/cloudAccounts/sample-cloudAccountName2",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets the count of protected items for provided CCA resource IDs across subscriptions.
 *
 * @summary gets the count of protected items for provided CCA resource IDs across subscriptions.
 * x-ms-original-file: 2026-07-03-preview/ProtectedItemsOperationGroup_CountByProtectionGroups_MinimumSet_Gen.json
 */
async function protectedItemsOperationGroupCountByProtectionGroupsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const client = new ContentStoreClient(credential);
  const result = await client.protectedItemsOperationGroup.countByProtectionGroups({
    resourceIds: [
      "/subscriptions/65D4E6D7-7063-4C4B-BAC5-13C45474009E/resourceGroups/rgcommvault/providers/Commvault.ContentStore/cloudAccounts/sample-cloudAccountName",
      "/subscriptions/A7E4E6D7-7063-4C4B-BAC5-13C45474009E/resourceGroups/rgcommvault2/providers/Commvault.ContentStore/cloudAccounts/sample-cloudAccountName2",
    ],
  });
  console.log(result);
}

async function main() {
  await protectedItemsOperationGroupCountByProtectionGroupsMaximumSet();
  await protectedItemsOperationGroupCountByProtectionGroupsMinimumSet();
}

main().catch(console.error);
