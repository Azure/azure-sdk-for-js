// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChatClient, SendMessageOptions } from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
  });

  it("ReadmeSampleCreateThread", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    const createChatThreadRequest = {
      topic: "Hello, World!",
    };
    // @ts-preserve-whitespace
    const createChatThreadOptions = {
      participants: [
        {
          id: { communicationUserId: "<USER_ID>" },
          displayName: "<USER_DISPLAY_NAME>",
        },
      ],
    };
    // @ts-preserve-whitespace
    const createChatThreadResult = await chatClient.createChatThread(
      createChatThreadRequest,
      createChatThreadOptions,
    );
    // @ts-preserve-whitespace
    const threadId = createChatThreadResult?.chatThread?.id;
  });

  it("ReadmeSampleCreateChatThreadClient", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    const chatThreadClient = chatClient.getChatThreadClient("<threadId>");
  });

  it("ReadmeSampleSendMessage", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    const chatThreadClient = chatClient.getChatThreadClient("<threadId>");
    // @ts-preserve-whitespace
    const sendMessageRequest = {
      content: "Hello Geeta! Can you share the deck for the conference?",
    };
    // @ts-preserve-whitespace
    const sendMessageOptions: SendMessageOptions = {
      senderDisplayName: "Jack",
      type: "text",
    };
    // @ts-preserve-whitespace
    const sendChatMessageResult = await chatThreadClient.sendMessage(
      sendMessageRequest,
      sendMessageOptions,
    );
    // @ts-preserve-whitespace
    const messageId = sendChatMessageResult.id;
  });

  it("ReadmeSampleSubscribeToChatMessages", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    // open notifications channel
    await chatClient.startRealtimeNotifications();
    // subscribe to new notification
    chatClient.on("chatMessageReceived", (e) => {
      console.log("Notification chatMessageReceived!");
      // your code here
    });
  });

  it("ReadmeSampleListMessages", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    const chatThreadClient = chatClient.getChatThreadClient("<threadId>");
    // @ts-preserve-whitespace
    for await (const chatMessage of chatThreadClient.listMessages()) {
      // your code here
    }
  });

  it("ReadmeSampleAddParticipants", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    const chatThreadClient = chatClient.getChatThreadClient("<threadId>");
    // @ts-preserve-whitespace
    const addParticipantsRequest = {
      participants: [
        {
          id: { communicationUserId: "<NEW_PARTICIPANT_USER_ID>" },
          displayName: "Jane",
        },
      ],
    };
    // @ts-preserve-whitespace
    await chatThreadClient.addParticipants(addParticipantsRequest);
  });

  it("ReadmeSampleRemoveParticipants", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    const chatThreadClient = chatClient.getChatThreadClient("<threadId>");
    // @ts-preserve-whitespace
    await chatThreadClient.removeParticipant({ communicationUserId: "<MEMBER_ID>" });
  });

  it("ReadmeSampleSubscribeToRealTimeNotifications", async () => {
    // Your unique Azure Communication service endpoint
    const endpointUrl = "<ENDPOINT>";
    const userAccessToken = "<USER_ACCESS_TOKEN>";
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    const chatClient = new ChatClient(endpointUrl, tokenCredential);
    // @ts-preserve-whitespace
    // subscribe to realTimeNotificationConnected event
    chatClient.on("realTimeNotificationConnected", () => {
      console.log("Real time notification is now connected!");
      // your code here
    });
    // @ts-preserve-whitespace
    // subscribe to realTimeNotificationDisconnected event
    chatClient.on("realTimeNotificationDisconnected", () => {
      console.log("Real time notification is now disconnected!");
      // your code here
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
