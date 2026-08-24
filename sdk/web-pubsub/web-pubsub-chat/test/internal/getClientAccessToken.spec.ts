// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { describe, it, assert, vi } from "vitest";
import { WebPubSubChatServiceClient } from "../../src/index.js";
import { tracingClient } from "../../src/tracing.js";

describe("WebPubSubChatServiceClient.getClientAccessToken", () => {
  it("delegates with the required chat roles", async () => {
    const withSpan = vi.spyOn(tracingClient, "withSpan");
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

      assert.deepInclude(getClientAccessToken.mock.calls[0][0], {
        userId: "user-1",
        expirationTimeInMinutes: 30,
        roles: ["webpubsub.getGroupState", "webpubsub.setGroupState"],
      });
      const delegatedOptions = getClientAccessToken.mock.calls[0][0] as {
        tracingOptions?: { tracingContext?: unknown };
      };
      assert.exists(delegatedOptions.tracingOptions?.tracingContext);
      assert.equal(withSpan.mock.calls[0][0], "WebPubSubChatServiceClient.getClientAccessToken");
    } finally {
      withSpan.mockRestore();
      getClientAccessToken.mockRestore();
    }
  });
});
