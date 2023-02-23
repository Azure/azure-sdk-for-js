// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create a recipient for a given sent share
 *
 * @summary Create a recipient for a given sent share
 */
async function createSentShareServiceInvitation() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const sentShareInvitationId = "9F154FA4-93D1-426B-A908-A9CAC7192B21";
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
  console.log(result);
}

/**
 * This sample demonstrates how to Create a recipient for a given sent share
 *
 * @summary Create a recipient for a given sent share
 */
async function createSentShareUserInvitation() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const sentShareInvitationId = "9F154FA4-93D1-426B-A908-A9CAC7192B21";
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
  console.log(result);
}

async function main() {
  createSentShareServiceInvitation();
  createSentShareUserInvitation();
}

main().catch(console.error);
