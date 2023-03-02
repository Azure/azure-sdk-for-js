// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default,
  { getLongRunningPoller, isUnexpected, paginate } = require("@azure-rest/purview-sharing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to get a sent share
 *
 * @summary Get a sent share
 */
async function getSentShare(client, sentShareId) {
  const result = await client.path("/sentShares/{sentShareId}", sentShareId).get();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const sentShareDetails = result.body;
  console.log(sentShareDetails);
}

/**
 * This sample demonstrates how to get recipient for a given sent share
 *
 * @summary Get recipient for a given sent share
 */
async function getSentShareInvitation(client, sentShareId, sentShareInvitationId) {
  const result = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
      sentShareId,
      sentShareInvitationId
    )
    .get();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const sentShareInvitationDetails = result.body;
  console.log(sentShareInvitationDetails);
}

/**
 * This sample demonstrates how to notify the user recipient of the sent share, does not apply to service invitations
 *
 * @summary Notifies the user recipient of the sent share invitation, does not apply to service invitations
 */
async function notifyUserSentShareInvitation(client, sentShareId, sentShareInvitationId) {
  const result = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}:notify",
      sentShareId,
      sentShareInvitationId
    )
    .post();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const sentShareInvitationDetails = result.body;
  console.log(sentShareInvitationDetails);
}

/**
 * This sample demonstrates how to list sent share invitations
 *
 * @summary List sent share invitations
 */
async function getAllSentShareInvitations(client, sentShareId) {
  const initialResponse = await client
    .path("/sentShares/{sentShareId}/sentShareInvitations", sentShareId)
    .get();

  const pageData = paginate(client, initialResponse);
  const result = [];

  for await (const item of pageData) {
    const invitation = item;
    invitation && result.push(invitation);
  }

  console.log(result);
  return result;
}

/**
 * This sample demonstrates how to list sent shares
 *
 * @summary List sent shares
 */
async function getAllSentShares(client, storageAccountResourceId) {
  const options = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/sentShares").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];

  for await (const item of pageData) {
    const sentShare = item;
    sentShare && result.push(sentShare);
  }

  console.log(result);
  return result;
}

/**
 * This sample demonstrates how to get a received share
 *
 * @summary Get a received share
 */
async function getReceivedShare(client, receivedShareId) {
  const result = await client.path("/receivedShares/{receivedShareId}", receivedShareId).get();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const receivedShareDetails = result.body;
  console.log(receivedShareDetails);
}

/**
 * This sample demonstrates how to list attached received shares
 *
 * @summary List attached received shares
 */
async function getAllAttachedReceivedShares(client, storageAccountResourceId) {
  const options = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/receivedShares/attached").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    const receivedShare = item;
    receivedShare && result.push(receivedShare);
  }

  console.log(result);
  return result;
}

/**
 * This sample demonstrates how to delete a received share
 *
 * @summary Delete a received share
 */
async function deleteReceivedShare(client, receivedShareId) {
  const initialResponse = await client
    .path("/receivedShares/{receivedShareId}", receivedShareId)
    .delete();

  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const operationDetails = result.body;
  console.log(operationDetails);
}

/**
 * This sample demonstrates how to delete a sent share invitation
 *
 * @summary Delete a sent share invitation
 */
async function deleteSentShareInvitation(client, sentShareId, sentShareInvitationId) {
  const initialResponse = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
      sentShareId,
      sentShareInvitationId
    )
    .delete();

  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const operationDetails = result.body;
  console.log(operationDetails);
}

/**
 * This sample demonstrates how to delete a sent share
 *
 * @summary Delete a sent share
 */
async function deleteSentShare(client, sentShareId) {
  const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).delete();

  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const operationDetails = result.body;
  console.log(operationDetails);
}

async function main() {
  const endpoint = process.env["ENDPOINT"] || "";
  const senderStorageAccountResourceId = process.env["SENDER_STORAGE_ACCOUNT_RESOURCE_ID"] || "";
  const receiverStorageAccountResourceId =
    process.env["RECEIVER_STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const allSentShares = await getAllSentShares(client, senderStorageAccountResourceId);
  const sentShareId = allSentShares[0]?.id;
  if (!sentShareId) {
    console.log("No sent shares available");
    return;
  }

  getSentShare(client, sentShareId);

  const allInvitations = await getAllSentShareInvitations(client, sentShareId);
  const sentShareInvitationId = allInvitations[0]?.id;
  if (!sentShareInvitationId) {
    console.log("No sent shares invitations available");
    return;
  }

  getSentShareInvitation(client, sentShareId, sentShareInvitationId);
  notifyUserSentShareInvitation(client, sentShareId, sentShareInvitationId);

  const allReceivedShares = await getAllAttachedReceivedShares(
    client,
    receiverStorageAccountResourceId
  );
  const receivedShareId = allReceivedShares[0]?.id;
  if (!receivedShareId) {
    console.log("No sent shares invitations available");
    return;
  }

  getReceivedShare(client, receivedShareId);

  deleteReceivedShare(client, receivedShareId);
  deleteSentShareInvitation(client, sentShareId, sentShareInvitationId);
  deleteSentShare(client, sentShareId);
}

main().catch(console.error);
