// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PurviewSharingClient, { isUnexpected, paginate } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = PurviewSharingClient(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleGetRecipientForAGivenSentShare", async () => {
    const client = PurviewSharingClient(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const storageAccountResourceId = "<storage-account-resource-id>";
    const options = {
      queryParameters: {
        referenceName: storageAccountResourceId,
      },
    };
    const initialResponse = await client.path("/sentShares").get(options);
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    // @ts-preserve-whitespace
    const pageData = paginate(client, initialResponse);
    for await (const sharedInvitationOutput of pageData) {
      // @ts-preserve-whitespace
      const sharedInvitationId = sharedInvitationOutput.id;
      if (sharedInvitationId) {
        const sentShareResponse = await client
          .path("/sentShares/{sentShareId}", sharedInvitationId)
          .get();
        // @ts-preserve-whitespace
        if (isUnexpected(sentShareResponse)) {
          throw sentShareResponse.body.error;
        }
        // @ts-preserve-whitespace
        const sentShareId = sentShareResponse.body.id;
        if (sentShareId) {
          const sentShareRecipientResponse = await client
            .path(
              "/sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}",
              sentShareId,
              sharedInvitationId,
            )
            .get();
          // @ts-preserve-whitespace
          if (isUnexpected(sentShareRecipientResponse)) {
            throw sentShareRecipientResponse.body.error;
          }
          // @ts-preserve-whitespace
          const sentShareRecipientId = sentShareRecipientResponse.body.id;
          console.log(`Sent Share Recipient Id: ${sentShareRecipientId}`);
        }
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
