// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createRecorderWithConnectionString } from "./utils/recordedClient.js";
import type {
  MessagesServiceClient,
  Send202Response,
  PagedMessageTemplateItemOutput,
  ImageNotificationContent,
  AudioNotificationContent,
  VideoNotificationContent,
  DocumentNotificationContent,
  StickerNotificationContent,
  ReactionNotificationContent,
} from "$internal/generated/src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Notification Messages Test", () => {
  let recorder: Recorder;
  let client: MessagesServiceClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecorderWithConnectionString(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("send simple text message test", async () => {
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "text",
        content: "Arif The Great!!!",
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send document message test", async () => {
    const documentMessage: DocumentNotificationContent = {
      kind: "document",
      mediaUri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      channelRegistrationId: env.CHANNEL_ID || "",
      to: [env.RECIPIENT_PHONE_NUMBER || ""],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: documentMessage,
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send video message test", async () => {
    const videoMessage: VideoNotificationContent = {
      kind: "video",
      mediaUri: "https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_1mb.mp4",
      channelRegistrationId: env.CHANNEL_ID || "",
      to: [env.RECIPIENT_PHONE_NUMBER || ""],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: videoMessage,
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send audio message test", async () => {
    const audioMessage: AudioNotificationContent = {
      kind: "audio",
      mediaUri: "https://sample-videos.com/audio/mp3/wave.mp3",
      channelRegistrationId: env.CHANNEL_ID || "",
      to: [env.RECIPIENT_PHONE_NUMBER || ""],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: audioMessage,
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send image message test", async () => {
    const imageMessage: ImageNotificationContent = {
      kind: "image",
      mediaUri: "https://www.w3schools.com/w3css/img_lights.jpg",
      channelRegistrationId: env.CHANNEL_ID || "",
      to: [env.RECIPIENT_PHONE_NUMBER || ""],
      caption: "awesome",
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: imageMessage,
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send sticker message test", async () => {
    const stickerMessage: StickerNotificationContent = {
      kind: "sticker",
      mediaUri: "https://www.gstatic.com/webp/gallery/1.sm.webp",
      channelRegistrationId: env.CHANNEL_ID || "",
      to: [env.RECIPIENT_PHONE_NUMBER || ""],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: stickerMessage,
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send reaction message test", async () => {
    const stickerMessage: ReactionNotificationContent = {
      kind: "reaction",
      channelRegistrationId: env.CHANNEL_ID || "",
      to: [env.RECIPIENT_PHONE_NUMBER || ""],
      emoji: "😍",
      messageId: "e9522767-765c-4244-b448-27a67df5ee0e",
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: stickerMessage,
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });
});

describe("Message Template Read Test", () => {
  let recorder: Recorder;
  let client: MessagesServiceClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecorderWithConnectionString(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("get template test", async () => {
    const result = await client
      .path("/messages/channels/{channelId}/templates", env.CHANNEL_ID || "")
      .get();
    assert.equal(result.status, "200");
    const response: PagedMessageTemplateItemOutput = result.body as PagedMessageTemplateItemOutput;
    assert.isAtLeast(response.value.length, 1);
  });
});
