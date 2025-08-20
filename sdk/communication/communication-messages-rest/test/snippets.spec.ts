// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import MessageClient, { InteractiveMessage, isUnexpected } from "@azure-rest/communication-messages";
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

  it("ReadmeSampleSendButtonActionInteractiveMessage", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: "<Channel_Registration_Id>",
        to: ["<to-phone-number-1>"],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    // @ts-preserve-whitespace
    if (!isUnexpected(result)) {
      result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
    }
  });

  it("ReadmeSampleSendListActionInteractiveMessage", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
    // @ts-preserve-whitespace
    const interactiveMessage: InteractiveMessage = {
      body: {
        kind: "text",
        text: "Which shipping option do you want?",
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
    // @ts-preserve-whitespace
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: "<Channel_Registration_Id>",
        to: ["<to-phone-number-1>"],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
      },
    });
    // @ts-preserve-whitespace
    if (!isUnexpected(result)) {
      result.body.receipts.forEach((receipt) => {
        console.log("Message sent to:" + receipt.to + " with message id:" + receipt.messageId);
      });
    }
  });

  it("ReadmeSampleSendUrlActionInteractiveMessage", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = MessageClient(endpoint, credential);
    // @ts-preserve-whitespace
    const interactiveMessage: InteractiveMessage = {
      body: {
        kind: "text",
        text: "Find more detail in the link.",
      },
      action: {
        kind: "whatsAppUrlAction",
        content: {
          kind: "url",
          title: "link",
          url: "https://<your-url-link>",
        },
      },
      footer: {
        kind: "text",
        text: "This is a footer message",
      },
    };
    // @ts-preserve-whitespace
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: "<Channel_Registration_Id>",
        to: ["<to-phone-number-1>"],
        kind: "interactive",
        interactiveMessage: interactiveMessage,
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
