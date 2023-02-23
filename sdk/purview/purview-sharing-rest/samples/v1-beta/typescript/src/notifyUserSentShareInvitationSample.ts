// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Notifies the user recipient of the sent share invitation, does not apply to service invitations.
 *
 * @summary Notifies the user recipient of the sent share invitation, does not apply to service invitations.
 */
async function notifyUserSentShareInvitation() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const sentShareInvitationId = "9F154FA4-93D1-426B-A908-A9CAC7192B21";
  const result = await client
    .path(
      "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}:notify",
      sentShareId,
      sentShareInvitationId
    )
    .post();
  console.log(result);
}

async function main() {
  notifyUserSentShareInvitation();
}

main().catch(console.error);
