// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default,
  { getLongRunningPoller, isUnexpected } = require("@azure-rest/purview-sharing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to create or replace a sent share
 *
 * @summary Create or replace a sent share
 */
async function createOrReplaceSentShare(client, sentShareId, storageAccountResourceId, storeKind) {
  const options = {
    body: {
      properties: {
        description: "description",
        artifact: {
          properties: {
            paths: [
              {
                containerName: "container1",
                receiverPath: "SharedFile.txt",
                senderPath: "directory/file.txt",
              },
            ],
          },
          storeKind: storeKind,
          storeReference: {
            type: "ArmResourceReference",
            referenceName: storageAccountResourceId,
          },
        },
        displayName: `Sample-${storeKind}-Sent-Share`,
      },
      shareKind: "InPlace",
    },
  };

  const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const sentShareDetails = result.body;
  console.log(sentShareDetails);
  return sentShareDetails;
}

/**
 * This sample demonstrates how to create a recipient of Service type for a given sent share
 *
 * @summary Create a recipient for a given sent share
 */
async function createSentShareServiceInvitation(client, sentShareId, sentShareInvitationId) {
  const options = {
    body: {
      invitationKind: "Service",
      properties: {
        expirationDate: undefined,
        targetActiveDirectoryId: "5DAE1226-9FAA-4D71-B8D4-87B81DFF672E",
        targetObjectId: "EFA02830-BB7A-4586-B615-A6DFF19FEBBF",
      },
    },
  };

  const result = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
      sentShareId,
      sentShareInvitationId
    )
    .put(options);

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const sentShareInvitationDetails = result.body;
  console.log(sentShareInvitationDetails);
  return sentShareInvitationDetails;
}

/**
 * This sample demonstrates how to create a recipient of User type for a given sent share
 *
 * @summary Create a recipient for a given sent share
 */
async function createSentShareUserInvitation(client, sentShareId, sentShareInvitationId) {
  const options = {
    body: {
      invitationKind: "User",
      properties: {
        expirationDate: new Date("2025-07-21T23:52:00.7691109Z"),
        notify: true,
        targetEmail: "testReceiver@microsoft.com",
      },
    },
  };

  const result = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
      sentShareId,
      sentShareInvitationId
    )
    .put(options);

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const sentShareInvitationDetails = result.body;
  console.log(sentShareInvitationDetails);
  return sentShareInvitationDetails;
}

async function main() {
  const endpoint = process.env["ENDPOINT"] || "";
  const blobStorageAccountResourceId = process.env["BLOB_STORAGE_ACCOUNT_RESOURCE_ID"] || "";
  const adlsgen2StorageAccountResourceId =
    process.env["ADLSGEN2_STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  // Create sent shares.
  const sentShareForBlobAsset = await createOrReplaceSentShare(
    client,
    "42ea5cf2-e5f3-430f-9ca8-f50401399821",
    blobStorageAccountResourceId,
    "BlobAccount"
  );
  console.log(sentShareForBlobAsset);

  const sentShareForAdlsGen2Asset = await createOrReplaceSentShare(
    client,
    "9e41d39d-3223-4941-a636-d83264a0e660",
    adlsgen2StorageAccountResourceId,
    "AdlsGen2Account"
  );
  console.log(sentShareForAdlsGen2Asset);

  // Create sent share invitations.
  const serviceInvitation = await createSentShareServiceInvitation(
    client,
    sentShareForBlobAsset.id ?? "42ea5cf2-e5f3-430f-9ca8-f50401399821",
    "6cdc69a2-40b6-4fcc-9231-5791f645e54d"
  );
  console.log(serviceInvitation);

  const userInvitation = await createSentShareUserInvitation(
    client,
    sentShareForAdlsGen2Asset.id ?? "9e41d39d-3223-4941-a636-d83264a0e660",
    "4199f6d6-81bc-4d96-bab1-af66c5c7b048"
  );

  console.log(userInvitation);
}

main().catch(console.error);
