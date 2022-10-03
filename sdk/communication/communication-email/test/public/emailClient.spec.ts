// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EmailClient, EmailMessage } from "../../src";
import { Recorder, env } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "chai";
import { createRecordedEmailClientWithConnectionString } from "./utils/recordedClient";

describe(`EmailClient [Playback/Live]`, () => {
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
      sender: env.SENDER_ADDRESS || "",
      recipients: {
        to: [
          {
            email: env.RECIPIENT_ADDRESS || "",
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

    const response = await client.send(emailMessage);
    assert.isNotNull(response.messageId);
  }).timeout(5000);

  it("successfully sends an email to multiple types of recipients", async function () {
    const emailMessage: EmailMessage = {
      sender: env.SENDER_ADDRESS ?? "",
      recipients: {
        to: [
          {
            email: env.RECIPIENT_ADDRESS ?? "",
            displayName: "someRecipient",
          },
          {
            email: env.RECIPIENT_ADDRESS ?? "",
            displayName: "someRecipient",
          },
        ],
        cc: [
          {
            email: env.RECIPIENT_ADDRESS ?? "",
            displayName: "someRecipient",
          },
        ],
        bcc: [
          {
            email: env.RECIPIENT_ADDRESS ?? "",
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

    const response = await client.send(emailMessage);
    assert.isNotNull(response.messageId);
  }).timeout(5000);

  it("successfully sends an email with an attachment", async function () {
    const emailMessage: EmailMessage = {
      sender: env.SENDER_ADDRESS ?? "",
      recipients: {
        to: [
          {
            email: env.RECIPIENT_ADDRESS ?? "",
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
          attachmentType: "txt",
          contentBytesBase64: "ZW1haWwgdGVzdCBhdHRhY2htZW50",
        },
      ],
    };

    const response = await client.send(emailMessage);
    assert.isNotNull(response.messageId);
  }).timeout(5000);

  it("successfully retrieves the email status with the returned message id", async function () {
    const emailMessage: EmailMessage = {
      sender: env.SENDER_ADDRESS ?? "",
      recipients: {
        to: [
          {
            email: env.RECIPIENT_ADDRESS ?? "",
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

    const response = await client.send(emailMessage);
    const messageId = response.messageId;
    if (messageId) {
      const messageStatusResponse = await client.getSendStatus(messageId);
      assert.isNotNull(messageStatusResponse.status);
    } else {
      assert.fail();
    }
  }).timeout(5000);
});
