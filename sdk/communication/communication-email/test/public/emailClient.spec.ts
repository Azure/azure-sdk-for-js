// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EmailMessage } from "../../src/index.js";
import { EmailClient, KnownEmailSendStatus } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach, expect, vi } from "vitest";
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

describe("EmailClient retries", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("re-signs each retry attempt with a fresh x-ms-date", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const attempts: { date: string; authorization: string }[] = [];
    const httpClient: HttpClient = {
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        attempts.push({
          date: request.headers.get("x-ms-date")!,
          authorization: request.headers.get("Authorization")!,
        });
        vi.setSystemTime(Date.now() + 10 * 60 * 1000);
        return attempts.length === 1
          ? { status: 429, headers: createHttpHeaders({ "retry-after-ms": "0" }), request }
          : {
              status: 400,
              headers: createHttpHeaders({ "content-type": "application/json" }),
              request,
              bodyAsText: JSON.stringify({ error: { code: "BadRequest", message: "stop" } }),
            };
      },
    };
    const client = new EmailClient(
      "endpoint=https://contoso.communication.azure.com/;accesskey=c2VjcmV0",
      { httpClient },
    );

    await expect(
      client.beginSend({
        senderAddress: "sender@contoso.com",
        recipients: { to: [{ address: "recipient@contoso.com" }] },
        content: { subject: "subject", plainText: "body" },
      }),
    ).rejects.toThrow();

    assert.lengthOf(attempts, 2);
    assert.notEqual(attempts[1].date, attempts[0].date);
    assert.notEqual(attempts[1].authorization, attempts[0].authorization);
  });
});
