// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EmailClient, EmailMessage } from "@azure/communication-email";
import { KnownEmailSendStatus } from "@azure/communication-email";
import type { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getRecipientAddress, getSenderAddress, isPlaybackMode } from "../utils/injectables.js";

const options = { updateIntervalInMs: isPlaybackMode() ? 0 : 3000 };

describe(`EmailClient [Playback/Live]`, () => {
  let recorder: Recorder;
  let client: EmailClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("successfully sends an email to a single recipient", async () => {
    const emailMessage: EmailMessage = {
      senderAddress: getSenderAddress(),
      recipients: {
        to: [
          {
            address: getRecipientAddress(),
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

    const poller = await client.beginSend(emailMessage, options);
    const response = await poller.pollUntilDone();

    assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
  });

  it(
    "successfully sends an email to multiple types of recipients",
    { timeout: 120000 },
    async () => {
      const emailMessage: EmailMessage = {
        senderAddress: getSenderAddress(),
        recipients: {
          to: [
            {
              address: getRecipientAddress(),
              displayName: "someRecipient",
            },
            {
              address: getRecipientAddress(),
              displayName: "someRecipient",
            },
          ],
          cc: [
            {
              address: getRecipientAddress(),
              displayName: "someRecipient",
            },
          ],
          bcc: [
            {
              address: getRecipientAddress(),
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

      const poller = await client.beginSend(emailMessage, options);
      const response = await poller.pollUntilDone();

      assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
    },
  );

  it("successfully sends an email with an attachment", async () => {
    const emailMessage: EmailMessage = {
      senderAddress: getSenderAddress(),
      recipients: {
        to: [
          {
            address: getRecipientAddress(),
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

    const poller = await client.beginSend(emailMessage, options);
    const response = await poller.pollUntilDone();

    assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
  });

  it("successfully sends an email with an inline attachment", async () => {
    const emailMessage: EmailMessage = {
      senderAddress: getSenderAddress(),
      recipients: {
        to: [
          {
            address: getRecipientAddress(),
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

    const poller = await client.beginSend(emailMessage, options);
    const response = await poller.pollUntilDone();

    assert.isTrue(response.status === KnownEmailSendStatus.Succeeded);
  });
});
