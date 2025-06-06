// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a PureStoragePolicy
 *
 * @summary create a PureStoragePolicy
 * x-ms-original-file: 2024-09-01/PureStoragePolicies_CreateOrUpdate.json
 */
async function pureStoragePoliciesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.pureStoragePolicies.createOrUpdate(
    "group1",
    "cloud1",
    "storagePolicy1",
    {
      properties: {
        storagePolicyDefinition: "storagePolicyDefinition1",
        storagePoolId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/PureStorage.Block/storagePools/storagePool1",
      },
    },
  );
  console.log(result);
}

async function main() {
  await pureStoragePoliciesCreateOrUpdate();
}

main().catch(console.error);
