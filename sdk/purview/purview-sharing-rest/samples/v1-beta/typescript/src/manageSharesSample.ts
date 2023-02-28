// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, {
  getLongRunningPoller,
  paginate,
  PurviewSharingClient,
  ReceivedSharesGetAllAttachedReceivedSharesParameters,
  SentSharesGetAllSentSharesParameters,
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
  console.log(result);
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
  console.log(result);
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
  console.log(result);
}

/**
 * This sample demonstrates how to list sent share invitations
 *
 * @summary List sent share invitations
 */
async function getAllSentShareInvitations(client: PurviewSharingClient, sentShareId: string) {
  const initialResponse = await client
    .path("/sentShares/{sentShareId}/sentShareInvitations", sentShareId)
    .get();

  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

/**
 * This sample demonstrates how to list sent shares
 *
 * @summary List sent shares
 */
async function getAllSentShares(client: PurviewSharingClient, storageAccountResourceId: string) {
  const options: SentSharesGetAllSentSharesParameters = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/sentShares").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

/**
 * This sample demonstrates how to get a received share
 *
 * @summary Get a received share
 */
async function getReceivedShare(client: PurviewSharingClient, receivedShareId: string) {
  const result = await client.path("/receivedShares/{receivedShareId}", receivedShareId).get();
  console.log(result);
}

/**
 * This sample demonstrates how to list attached received shares
 *
 * @summary List attached received shares
 */
async function getAllAttachedReceivedShares(
  client: PurviewSharingClient,
  storageAccountResourceId: string
) {
  const options: ReceivedSharesGetAllAttachedReceivedSharesParameters = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/receivedShares/attached").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
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
  console.log(result);
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
  console.log(result);
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
  console.log(result);
}

async function main() {
  const endpoint = process.env["ENDPOINT"] || "";
  const senderStorageAccountResourceId = process.env["SENDER_STORAGE_ACCOUNT_RESOURCE_ID"] || "";
  const receiverStorageAccountResourceId =
    process.env["RECEIVER_STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const sentShareInvitationId = "9F154FA4-93D1-426B-A908-A9CAC7192B21";
  const receivedShareId = "0D67B9C8-A6C6-4990-9EDE-12EA059D3002";

  getSentShare(client, sentShareId);
  getSentShareInvitation(client, sentShareId, sentShareInvitationId);
  notifyUserSentShareInvitation(client, sentShareId, sentShareInvitationId);
  getAllSentShareInvitations(client, sentShareId);
  getAllSentShares(client, senderStorageAccountResourceId);

  getReceivedShare(client, receivedShareId);
  getAllAttachedReceivedShares(client, receiverStorageAccountResourceId);

  deleteReceivedShare(client, receivedShareId);
  deleteSentShareInvitation(client, sentShareId, sentShareInvitationId);
  deleteSentShare(client, sentShareId);
}

main().catch(console.error);
