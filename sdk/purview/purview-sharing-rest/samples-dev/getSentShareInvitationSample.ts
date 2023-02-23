// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

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
