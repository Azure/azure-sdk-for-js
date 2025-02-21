// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EmailClient, EmailMessage } from "../../src/index.js";
import { KnownEmailSendStatus } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createRecordedEmailClientWithConnectionString } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`EmailClient [Playback/Live]`, () => {
  let recorder: Recorder;
  let client: EmailClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedEmailClientWithConnectionString(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("successfully sends an email to a single recipient", { timeout: 120000 }, async () => {
    const emailMessage: EmailMessage = {
      senderAddress: env.SENDER_ADDRESS || "",
      recipients: {
        to: [
          {
            address: env.RECIPIENT_ADDRESS || "",
            displayName: "someRecipient",
          },
        ],
      },
      content: {
        subject: "someSubject",
        plainText: "somePlainTextBody",
        html: "<html><h1>someHtmlBody</html>",
      },
    };

    const poller = await client.beginSend(emailMessage);
    const response = await poller.pollUntilDone();

    assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
  });

  it(
    "successfully sends an email to multiple types of recipients",
    { timeout: 120000 },
    async () => {
      const emailMessage: EmailMessage = {
        senderAddress: env.SENDER_ADDRESS ?? "",
        recipients: {
          to: [
            {
              address: env.RECIPIENT_ADDRESS ?? "",
              displayName: "someRecipient",
            },
            {
              address: env.RECIPIENT_ADDRESS ?? "",
              displayName: "someRecipient",
            },
          ],
          cc: [
            {
              address: env.RECIPIENT_ADDRESS ?? "",
              displayName: "someRecipient",
            },
          ],
          bcc: [
            {
              address: env.RECIPIENT_ADDRESS ?? "",
              displayName: "someRecipient",
            },
          ],
        },
        content: {
          subject: "someSubject",
          plainText: "somePlainTextBody",
          html: "<html><h1>someHtmlBody</html>",
        },
      };

      const poller = await client.beginSend(emailMessage);
      const response = await poller.pollUntilDone();

      assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
    },
  );

  it("successfully sends an email with an attachment", { timeout: 120000 }, async () => {
    const emailMessage: EmailMessage = {
      senderAddress: env.SENDER_ADDRESS ?? "",
      recipients: {
        to: [
          {
            address: env.RECIPIENT_ADDRESS ?? "",
            displayName: "someRecipient",
          },
        ],
      },
      content: {
        subject: "someSubject",
        plainText: "somePlainTextBody",
        html: "<html><h1>someHtmlBody</html>",
      },
      attachments: [
        {
          name: "readme.txt",
          contentType: "text/plain",
          contentInBase64: "ZW1haWwgdGVzdCBhdHRhY2htZW50",
        },
      ],
    };

    const poller = await client.beginSend(emailMessage);
    const response = await poller.pollUntilDone();

    assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
  });

  it("successfully sends an email with an inline attachment", { timeout: 120000 }, async () => {
    const emailMessage: EmailMessage = {
      senderAddress: env.SENDER_ADDRESS ?? "",
      recipients: {
        to: [
          {
            address: env.RECIPIENT_ADDRESS ?? "",
            displayName: "someRecipient",
          },
        ],
      },
      content: {
        subject: "someSubject",
        plainText: "somePlainTextBody",
        html: '<html>This is the body<br /><img src="cid:inline_image" /></html>',
      },
      attachments: [
        {
          name: "myinlineimage.jpg",
          contentType: "image/jpeg",
          contentInBase64: "ZW1haWwgdGVzdCBhdHRhY2htZW50",
          contentId: "inline_image",
        },
      ],
    };

    const poller = await client.beginSend(emailMessage);
    const response = await poller.pollUntilDone();

    assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
  });
});
