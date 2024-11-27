// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createPurviewSharingClient, {
  getLongRunningPoller,
  InPlaceReceivedShareOutput,
  InPlaceSentShareOutput,
  isUnexpected,
  paginate,
  PurviewSharingClient,
  ReceivedSharesGetAllAttachedReceivedSharesParameters,
  SentShareInvitationOutput,
  SentSharesGetAllSentSharesParameters,
  ShareResourceOutput,
} from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to get a sent share
 *
 * @summary Get a sent share
 */
async function getSentShare(client: PurviewSharingClient, sentShareId: string) {
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
async function getSentShareInvitation(
  client: PurviewSharingClient,
  sentShareId: string,
  sentShareInvitationId: string
) {
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
async function notifyUserSentShareInvitation(
  client: PurviewSharingClient,
  sentShareId: string,
  sentShareInvitationId: string
) {
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
async function getAllSentShareInvitations(
  client: PurviewSharingClient,
  sentShareId: string
): Promise<SentShareInvitationOutput[]> {
  const initialResponse = await client
    .path("/sentShares/{sentShareId}/sentShareInvitations", sentShareId)
    .get();

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const pageData = paginate(client, initialResponse);
  const result: SentShareInvitationOutput[] = [];

  for await (const item of pageData) {
    result.push(item);
  }

  console.log(result);
  return result;
}

/**
 * This sample demonstrates how to list share resources
 *
 * @summary List share resources
 */
async function getAllShareResources(client: PurviewSharingClient): Promise<ShareResourceOutput[]> {
  const initialResponse = await client.path("/shareResources").get();
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }

  const pageData = paginate(client, initialResponse);
  const result: ShareResourceOutput[] = [];

  for await (const item of pageData) {
    result.push(item);
  }

  console.log(result);

  return result;
}

/**
 * This sample demonstrates how to list sent shares
 *
 * @summary List sent shares
 */
async function getAllSentShares(
  client: PurviewSharingClient,
  storageAccountResourceId: string
): Promise<InPlaceSentShareOutput[]> {
  const options: SentSharesGetAllSentSharesParameters = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/sentShares").get(options);
  const pageData = paginate(client, initialResponse);
  const result: InPlaceSentShareOutput[] = [];

  for await (const item of pageData) {
    const sentShare = item as InPlaceSentShareOutput;
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
async function getReceivedShare(client: PurviewSharingClient, receivedShareId: string) {
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
async function getAllAttachedReceivedShares(
  client: PurviewSharingClient,
  storageAccountResourceId: string
): Promise<InPlaceReceivedShareOutput[]> {
  const options: ReceivedSharesGetAllAttachedReceivedSharesParameters = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/receivedShares/attached").get(options);
  const pageData = paginate(client, initialResponse);
  const result: InPlaceReceivedShareOutput[] = [];
  for await (const item of pageData) {
    const receivedShare = item as InPlaceReceivedShareOutput;
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
async function deleteReceivedShare(client: PurviewSharingClient, receivedShareId: string) {
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
async function deleteSentShareInvitation(
  client: PurviewSharingClient,
  sentShareId: string,
  sentShareInvitationId: string
) {
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
async function deleteSentShare(client: PurviewSharingClient, sentShareId: string) {
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

  getAllShareResources(client);
  getReceivedShare(client, receivedShareId);

  deleteReceivedShare(client, receivedShareId);
  deleteSentShareInvitation(client, sentShareId, sentShareInvitationId);
  deleteSentShare(client, sentShareId);
}

main().catch(console.error);
