// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EmailClient } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = `endpoint=https://<resource-name>.communication.azure.com/;accessKey=<Base64-Encoded-Key>`;
    const client = new EmailClient(connectionString);
  });

  it("ReadmeSampleCreateClient_AAD", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new EmailClient(endpoint, credential);
  });

  it("ReadmeSample_SendEmail", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new EmailClient(endpoint, credential);
    // @ts-preserve-whitespace
    const message = {
      senderAddress: "sender@contoso.com",
      content: {
        subject: "This is the subject",
        plainText: "This is the body",
      },
      recipients: {
        to: [
          {
            address: "customer@domain.com",
            displayName: "Customer Name",
          },
        ],
      },
    };
    // @ts-preserve-whitespace
    const poller = await client.beginSend(message);
    const response = await poller.pollUntilDone();
  });

  it("ReadmeSample_SendEmailToMultipleRecipients", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new EmailClient(endpoint, credential);
    // @ts-preserve-whitespace
    const message = {
      senderAddress: "sender@contoso.com",
      content: {
        subject: "This is the subject",
        plainText: "This is the body",
      },
      recipients: {
        to: [
          {
            address: "customer1@domain.com",
            displayName: "Customer Name 1",
          },
          {
            address: "customer2@domain.com",
            displayName: "Customer Name 2",
          },
        ],
        cc: [
          {
            address: "ccCustomer1@domain.com",
            displayName: " CC Customer 1",
          },
          {
            address: "ccCustomer2@domain.com",
            displayName: "CC Customer 2",
          },
        ],
        bcc: [
          {
            address: "bccCustomer1@domain.com",
            displayName: " BCC Customer 1",
          },
          {
            address: "bccCustomer2@domain.com",
            displayName: "BCC Customer 2",
          },
        ],
      },
    };
    // @ts-preserve-whitespace
    const poller = await client.beginSend(message);
    const response = await poller.pollUntilDone();
  });

  it("ReadmeSample_SendEmailWithAttachments", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new EmailClient(endpoint, credential);
    // @ts-preserve-whitespace
    const filePath = "path/to/readme.txt";
    // @ts-preserve-whitespace
    const message = {
      senderAddress: "sender@contoso.com",
      content: {
        subject: "This is the subject",
        plainText: "This is the body",
      },
      recipients: {
        to: [
          {
            address: "customer@domain.com",
            displayName: "Customer Name",
          },
        ],
      },
      attachments: [
        {
          name: basename(filePath),
          contentType: "text/plain",
          contentInBase64: readFileSync(filePath, "base64"),
        },
      ],
    };
    // @ts-preserve-whitespace
    const poller = await client.beginSend(message);
    const response = await poller.pollUntilDone();
  });

  it("ReadmeSample_SendEmailWithInlineAttachments", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new EmailClient(endpoint, credential);
    // @ts-preserve-whitespace
    const imageBuffer = readFileSync("path/to/my_inline_image.jpg");
    const contentInBase64 = imageBuffer.toString("base64");
    // @ts-preserve-whitespace
    const message = {
      senderAddress: "sender@contoso.com",
      content: {
        subject: "This is the subject",
        plainText: "This is the body",
        html: '<html>This is the body<br /><img src="cid:inline_image" /></html>',
      },
      recipients: {
        to: [
          {
            address: "customer@domain.com",
            displayName: "Customer Name",
          },
        ],
      },
      attachments: [
        {
          name: "my_inline_image.jpg",
          contentType: "image/jpeg",
          contentInBase64: contentInBase64,
          contentId: "inline_image",
        },
      ],
    };
    // @ts-preserve-whitespace
    const poller = await client.beginSend(message);
    const response = await poller.pollUntilDone();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
