// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the protected item.
 *
 * @summary creates the protected item.
 * x-ms-original-file: 2024-09-01/ProtectedItem_Create.json
 */
async function putsTheProtectedItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.protectedItem.create("rgrecoveryservicesdatareplication", "4", "d", {
    properties: {
      policyName: "tjoeiynplt",
      replicationExtensionName: "jwxdo",
      customProperties: {
        instanceType: "ProtectedItemModelCustomProperties",
      },
    },
  });
  console.log(result);
}

async function main() {
  await putsTheProtectedItem();
}

main().catch(console.error);
