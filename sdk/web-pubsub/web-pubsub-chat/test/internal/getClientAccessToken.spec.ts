// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { describe, it, assert, vi } from "vitest";
import { WebPubSubChatServiceClient } from "../../src/index.js";

describe("WebPubSubChatServiceClient.getClientAccessToken", () => {
  it("delegates with the required chat roles", async () => {
    const getClientAccessToken = vi
      .spyOn(WebPubSubServiceClient.prototype, "getClientAccessToken")
      .mockResolvedValue({
        token: "token",
        baseUrl: "wss://example.webpubsub.azure.com/client/hubs/chat-hub",
        url: "wss://example.webpubsub.azure.com/client/hubs/chat-hub?access_token=token",
      });

    try {
      const client = new WebPubSubChatServiceClient(
        "https://example.webpubsub.azure.com",
        new AzureKeyCredential("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg="),
        "chat-hub",
      );

      await client.getClientAccessToken({
        userId: "user-1",
        expirationTimeInMinutes: 30,
      });

      assert.deepEqual(getClientAccessToken.mock.calls[0][0], {
        userId: "user-1",
        expirationTimeInMinutes: 30,
        roles: ["webpubsub.getGroupState", "webpubsub.setGroupState"],
      });
    } finally {
      getClientAccessToken.mockRestore();
    }
  });
});
