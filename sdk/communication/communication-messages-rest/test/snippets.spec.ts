// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import MessageClient, { isUnexpected } from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { DefaultAzureCredential } from "@azure/identity";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = `endpoint=https://<resource-name>.communication.azure.com/;accessKey=<Base64-Encoded-Key>`;
    const client = MessageClient(connectionString);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new AzureKeyCredential("<Base64-Encoded-Key>");
    const client = MessageClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
  });

  it("ReadmeSampleSendTemplateMessage", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
    // @ts-preserve-whitespace
    const nameValue = {
      kind: "text",
      name: "name",
      text: "Arif",
    };
    // @ts-preserve-whitespace
    const yesAction = {
      kind: "quickAction",
      name: "Yes",
      payload: "Yes",
    };
    // @ts-preserve-whitespace
    const noAction = {
      kind: "quickAction",
      name: "No",
      payload: "No",
    };
    // @ts-preserve-whitespace
    const templateBindings = {
      kind: "whatsApp",
      body: [
        {
          refValue: "name",
        },
      ],
      buttons: [
        {
          subType: "quickReply",
          refValue: "Yes",
        },
        {
          subType: "quickReply",
          refValue: "No",
        },
      ],
    };
    // @ts-preserve-whitespace
    const template = {
      name: "sample_issue_resolution",
      language: "en_US",
      bindings: templateBindings,
      values: [nameValue, yesAction, noAction],
    };
    // @ts-preserve-whitespace
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: "<Channel_Registration_Id>",
        to: ["<to-phone-number-1>"],
        kind: "template",
        template: template,
      },
    });
    // @ts-preserve-whitespace
    if (!isUnexpected(result)) {
      result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
    }
  });

  it("ReadmeSampleSendTextMessage", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: "<Channel_Registration_Id>",
        to: ["<to-phone-number-1>"],
        kind: "text",
        content: "Hello World!!",
      },
    });
    // @ts-preserve-whitespace
    if (!isUnexpected(result)) {
      result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
    }
  });

  it("ReadmeSampleSendMediaMessage", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: "<Channel_Registration_Id>",
        to: ["<to-phone-number-1>"],
        kind: "image",
        mediaUri: "https://<your-media-image-file>",
      },
    });
    // @ts-preserve-whitespace
    if (!isUnexpected(result)) {
      result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
