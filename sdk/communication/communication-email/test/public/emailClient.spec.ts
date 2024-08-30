// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EmailClient, EmailMessage, KnownEmailSendStatus } from "../../src";
import { Recorder, env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "chai";
import { createRecordedEmailClientWithConnectionString } from "./utils/recordedClient";

describe(`EmailClient [Playback/Live]`, function () {
  let recorder: Recorder;
  let client: EmailClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedEmailClientWithConnectionString(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully sends an email to a single recipient", async function () {
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
  }).timeout(120000);

  it("successfully sends an email to multiple types of recipients", async function () {
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
  }).timeout(120000);

  it("successfully sends an email with an attachment", async function () {
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
  }).timeout(120000);

  it("successfully sends an email with an inline attachment", async function () {
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
  }).timeout(120000);
});
