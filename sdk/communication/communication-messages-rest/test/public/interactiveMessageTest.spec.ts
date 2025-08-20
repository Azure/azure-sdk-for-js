// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createRecorderWithConnectionString } from "./utils/recordedClient.js";
import type {
  MessagesServiceClient,
  Send202Response,
  InteractiveMessage,
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

  it("send button action interactive message test", async () => {
    const interactiveMessage: InteractiveMessage = {
      body: {
        kind: "text",
        text: "Do you want to proceed?",
      },
      action: {
        kind: "whatsAppButtonAction",
        content: {
          kind: "buttonSet",
          buttons: [
            {
              id: "yes",
              title: "Yes",
            },
            {
              id: "no",
              title: "No",
            },
          ],
        },
      },
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send button action with image header interactive message test", async () => {
    const interactiveMessage: InteractiveMessage = {
      header: {
        kind: "image",
        mediaUri: "https://wallpapercave.com/wp/wp2163723.jpg",
      },
      body: {
        kind: "text",
        text: "Do you want to proceed?",
      },
      action: {
        kind: "whatsAppButtonAction",
        content: {
          kind: "buttonSet",
          buttons: [
            {
              id: "yes",
              title: "Yes",
            },
            {
              id: "no",
              title: "No",
            },
          ],
        },
      },
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send button action with document header interactive message test", async () => {
    const interactiveMessage: InteractiveMessage = {
      header: {
        kind: "document",
        mediaUri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      body: {
        kind: "text",
        text: "Do you want to proceed?",
      },
      action: {
        kind: "whatsAppButtonAction",
        content: {
          kind: "buttonSet",
          buttons: [
            {
              id: "yes",
              title: "Yes",
            },
            {
              id: "no",
              title: "No",
            },
          ],
        },
      },
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send button action with video header interactive message test", async () => {
    const interactiveMessage: InteractiveMessage = {
      header: {
        kind: "video",
        mediaUri: "https://sample-videos.com/audio/mp3/wave.mp3",
      },
      body: {
        kind: "text",
        text: "Do you want to proceed?",
      },
      action: {
        kind: "whatsAppButtonAction",
        content: {
          kind: "buttonSet",
          buttons: [
            {
              id: "yes",
              title: "Yes",
            },
            {
              id: "no",
              title: "No",
            },
          ],
        },
      },
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send list action interactive message test", async () => {
    const interactiveMessage: InteractiveMessage = {
      body: {
        kind: "text",
        text: "Do you want to proceed?",
      },
      action: {
        kind: "whatsAppListAction",
        content: {
          kind: "group",
          title: "Shipping Options",
          groups: [
            {
              title: "Express Delivery",
              items: [
                {
                  id: "priority_mail_express",
                  title: "Priority Mail Express",
                  description: "Delivered on same day!",
                },
                {
                  id: "priority_mail",
                  title: "Priority Mail",
                  description: "Delivered in 1-2 days",
                },
              ],
            },
            {
              title: "Normal Delivery",
              items: [
                {
                  id: "usps_ground_advantage",
                  title: "USPS Ground Advantage",
                  description: "Delivered in 2-5 days",
                },
                {
                  id: "usps_mail",
                  title: "Normal Mail",
                  description: "Delivered in 5-8 days",
                },
              ],
            },
          ],
        },
      },
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send url action interactive message test", async () => {
    const interactiveMessage: InteractiveMessage = {
      body: {
        kind: "text",
        text: "The best Guardian of Galaxy",
      },
      action: {
        kind: "whatsAppUrlAction",
        content: {
          kind: "url",
          title: "Rocket is the best!",
          url: "https://wallpapercave.com/wp/wp2163723.jpg",
        },
      },
      footer: {
        kind: "text",
        text: "Intergalactic News Ltd",
      },
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });
});
