// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created
 *
 * @summary starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created
 * x-ms-original-file: 2025-07-01-preview/Volumes_AuthorizeExternalReplication.json
 */
async function volumesAuthorizeExternalReplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.authorizeExternalReplication(
    "myRG",
    "account1",
    "pool1",
    "volume1",
  );
  console.log(result);
}

async function main() {
  await volumesAuthorizeExternalReplication();
}

main().catch(console.error);
