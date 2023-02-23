// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get recipient for a given sent share
 *
 * @summary Get recipient for a given sent share
 */
async function getSentShareInvitation() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const sentShareInvitationId = "9F154FA4-93D1-426B-A908-A9CAC7192B21";
  const result = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
      sentShareId,
      sentShareInvitationId
    )
    .get();
  console.log(result);
}

async function main() {
  getSentShareInvitation();
}

main().catch(console.error);
