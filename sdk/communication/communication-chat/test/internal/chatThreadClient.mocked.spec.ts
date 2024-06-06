// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import {
  AddParticipantsRequest,
  ChatRetentionPolicy,
  ChatThreadClient,
  SendMessageOptions,
  SendMessageRequest,
  UpdateMessageOptions,
} from "../../src";
import * as RestModel from "../../src/generated/src/models";
import { apiVersion } from "../../src/generated/src/models/parameters";
import { baseUri, generateToken } from "../public/utils/connectionUtils";
import {
  createChatThreadClient,
  generateHttpClient,
  mockChatMessageReadReceipt,
  mockMessage,
  mockMessageWithAttachment,
  mockMessageWithDLPContentBlocked,
  mockImageAttachment,
  mockParticipant,
  mockParticipantWithMetadata,
  mockSdkModelParticipant,
  mockThread,
  mockThreadWithTextOnlyChat,
  mockMessageWithDLPWarning,
} from "./utils/mockClient";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[Mocked] ChatThreadClient", async function () {
  const threadId: string = "threadId";
  let chatThreadClient: ChatThreadClient;

  afterEach(function () {
    sinon.restore();
  });

  it("can instantiate", async function () {
    new ChatThreadClient(threadId, baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });

  it("makes successful get properties request", async function () {
    const mockHttpClient = generateHttpClient(200, mockThread);
    chatThreadClient = createChatThreadClient(mockThread.id, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const { createdBy: responseUser, ...response } = await chatThreadClient.getProperties();
    const { createdByCommunicationIdentifier: expectedIdentifier, ...expected } = mockThread;

    sinon.assert.calledOnce(spy);

    assert.deepEqual(response, expected);
    assert.equal(responseUser?.kind, "communicationUser");
    assert.equal(
      (responseUser as CommunicationUserIdentifier)?.communicationUserId,
      expectedIdentifier.communicationUser?.id
    );

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful get properties request with text only chat", async function () {
    const mockHttpClient = generateHttpClient(200, mockThreadWithTextOnlyChat);
    chatThreadClient = createChatThreadClient(mockThread.id, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      createdBy: responseUser,
      messagingPolicy: responseMessagingPolicy,
      ...response
    } = await chatThreadClient.getProperties();
    const {
      createdByCommunicationIdentifier: expectedIdentifier,
      messagingPolicy: expectedMessagingPolicy,
      ...expected
    } = mockThreadWithTextOnlyChat;

    sinon.assert.calledOnce(spy);

    assert.deepEqual(response, expected);
    assert.equal(responseUser?.kind, "communicationUser");
    assert.equal(
      (responseUser as CommunicationUserIdentifier)?.communicationUserId,
      expectedIdentifier.communicationUser?.id
    );
    assert.deepEqual(responseMessagingPolicy, expectedMessagingPolicy);
    assert.isTrue(responseMessagingPolicy?.textOnlyChat);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful update thread topic", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const topic = "mockTopic";

    await chatThreadClient.updateTopic(topic);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body as string), { topic: topic });
  });

  it("makes successful update thread metadata", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const metadata = { threadType: "primary", secondaryThread: "test-id" };

    await chatThreadClient.updateProperties({ metadata: metadata });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body as string), { metadata: metadata });
  });

  it("makes successful update thread retention policy request", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const retentionPolicy: ChatRetentionPolicy = {
      kind: "threadCreationDate",
      deleteThreadAfterDays: 90,
    };
    await chatThreadClient.updateProperties({ retentionPolicy: retentionPolicy });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body as string), { retentionPolicy: retentionPolicy });
  });

  it("makes successful update thread retention policy to null", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.updateProperties({ retentionPolicy: null as any });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body as string), { retentionPolicy: null });
  });

  it("makes successful update thread retention policy to none retention policy", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.updateProperties({ retentionPolicy: { kind: "none" } });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body as string), { retentionPolicy: { kind: "none" } });
  });

  it("makes successful send message request", async function () {
    const mockHttpClient = generateHttpClient(201, {
      id: mockMessage.id,
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: SendMessageRequest = {
      content: mockMessage.content?.message as string,
    };

    const sendOptions: SendMessageOptions = {
      senderDisplayName: mockMessage.senderDisplayName,
      metadata: mockMessage.metadata,
      attachments: [mockImageAttachment],
    };

    const response = await chatThreadClient.sendMessage(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.equal(response.id, mockMessage.id);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body as string), {
      ...sendRequest,
      ...sendOptions,
    });
  });

  it("makes successful get message request", async function () {
    const mockHttpClient = generateHttpClient(200, mockMessage);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      sender: responseUser,
      content: responseContent,
      policyViolation: responsePolicyViolation,
      ...responseMessage
    } = await chatThreadClient.getMessage(mockMessage.id!);
    const {
      senderCommunicationIdentifier: expectedIdentifier,
      content: expectedContent,
      ...expectedMessage
    } = mockMessage;
    const { participants: expectedParticipants, ...expectedContents } = expectedContent!;
    const { participants: responseParticipants, ...repsonseContents } = responseContent!;

    sinon.assert.calledOnce(spy);
    assert.deepEqual(responseMessage, expectedMessage);
    assert.equal(responseUser?.kind, "communicationUser");
    assert.equal(
      (responseUser as CommunicationUserIdentifier)?.communicationUserId,
      expectedIdentifier?.communicationUser?.id
    );
    assert.deepEqual(repsonseContents, expectedContents);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful get message with attachments request", async function () {
    const mockHttpClient = generateHttpClient(200, mockMessageWithAttachment);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      sender: responseUser,
      content: responseContent,
      policyViolation: responsePolicyViolation,
      ...responseMessage
    } = await chatThreadClient.getMessage(mockMessageWithAttachment.id!);
    const {
      senderCommunicationIdentifier: expectedIdentifier,
      content: expectedContent,
      ...expectedMessage
    } = mockMessageWithAttachment;
    const {
      participants: expectedParticipants,
      attachments: expectedAttachments,
      ...expectedContents
    } = expectedContent!;
    const {
      participants: responseParticipants,
      attachments: responseAttachments,
      ...repsonseContents
    } = responseContent!;
    sinon.assert.calledOnce(spy);
    assert.deepEqual(responseMessage, expectedMessage);
    assert.deepEqual(responseAttachments, expectedAttachments);
    assert.deepEqual(repsonseContents, expectedContents);
    const request = spy.getCall(0).args[0];

    assert.equal(request.method, "GET");
  });

  it("makes successful get message with data loss prevention content blocked", async function () {
    const mockHttpClient = generateHttpClient(200, mockMessageWithDLPContentBlocked);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      sender: responseUser,
      content: responseContent,
      policyViolation: responsePolicyViolation,
      ...responseMessage
    } = await chatThreadClient.getMessage(mockMessageWithAttachment.id!);
    const {
      senderCommunicationIdentifier: expectedIdentifier,
      content: expectedContent,
      policyViolation: expectedPolicyViolation,
      ...expectedMessage
    } = mockMessageWithDLPContentBlocked;
    const {
      participants: expectedParticipants,
      attachments: expectedAttachments,
      ...expectedContents
    } = expectedContent!;
    const {
      participants: responseParticipants,
      attachments: responseAttachments,
      ...repsonseContents
    } = responseContent!;
    sinon.assert.calledOnce(spy);
    assert.deepEqual(responseMessage, expectedMessage);
    assert.deepEqual(responseAttachments, expectedAttachments);
    assert.deepEqual(repsonseContents, expectedContents);
    assert.deepEqual(responsePolicyViolation?.result, expectedPolicyViolation?.state);
    const request = spy.getCall(0).args[0];

    assert.equal(request.method, "GET");
  });

  it("makes successful get message with data loss prevention warning", async function () {
    const mockHttpClient = generateHttpClient(200, mockMessageWithDLPWarning);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      sender: responseUser,
      content: responseContent,
      policyViolation: responsePolicyViolation,
      ...responseMessage
    } = await chatThreadClient.getMessage(mockMessageWithAttachment.id!);
    const {
      senderCommunicationIdentifier: expectedIdentifier,
      content: expectedContent,
      policyViolation: expectedPolicyViolation,
      ...expectedMessage
    } = mockMessageWithDLPWarning;
    const {
      participants: expectedParticipants,
      attachments: expectedAttachments,
      ...expectedContents
    } = expectedContent!;
    const {
      participants: responseParticipants,
      attachments: responseAttachments,
      ...repsonseContents
    } = responseContent!;
    sinon.assert.calledOnce(spy);
    assert.deepEqual(responseMessage, expectedMessage);
    assert.deepEqual(responseAttachments, expectedAttachments);
    assert.deepEqual(repsonseContents, expectedContents);
    assert.deepEqual(responsePolicyViolation?.result, expectedPolicyViolation?.state);
    const request = spy.getCall(0).args[0];

    assert.equal(request.method, "GET");
  });

  it("makes successful list messages request", async function () {
    const { senderCommunicationIdentifier, ...rest } = mockMessage;

    const mockResponse: RestModel.ChatMessagesCollection = {
      value: [mockMessage, mockMessage, { ...rest }],
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const message of chatThreadClient.listMessages()) {
      const { sender: responseUser, content: repsonseContent, ...responseMessage } = message;
      const {
        senderCommunicationIdentifier: expectedIdentifier,
        content: expectedContent,
        policyViolation: expectedPolicyViolation,
        ...expectedMessage
      } = mockResponse.value[count];
      const { participants: expectedParticipants, ...expectedContents } = expectedContent!;
      const { participants: responseParticipants, ...repsonseContents } = repsonseContent!;

      if (!expectedIdentifier) {
        assert.isUndefined(responseUser);
      } else {
        assert.equal(responseUser?.kind, "communicationUser");
        assert.equal(
          (responseUser as CommunicationUserIdentifier)?.communicationUserId,
          expectedIdentifier?.communicationUser?.id
        );
      }
      assert.deepEqual(responseMessage, expectedMessage);
      assert.deepEqual(repsonseContents, expectedContents);

      ++count;
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, mockResponse.value?.length);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful list messages request by page", async function () {
    const { senderCommunicationIdentifier, ...rest } = mockMessage;

    const mockResponse: RestModel.ChatMessagesCollection = {
      value: [mockMessage, mockMessage, mockMessage, mockMessage, mockMessage, { ...rest }],
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const iterator = chatThreadClient.listMessages({ maxPageSize: 2 });

    let count = 0;
    for await (const page of iterator.byPage()) {
      // loop over each item in the page
      for (const info of page) {
        ++count;
        assert.isNotNull(info);
      }
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, mockResponse.value?.length);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages?maxPageSize=2&api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful update message request", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendOptions: UpdateMessageOptions = {
      content: mockMessage.content?.message,
      metadata: mockMessage.metadata,
      attachments: [mockImageAttachment],
    };

    await chatThreadClient.updateMessage(mockMessage.id!, sendOptions);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body as string), {
      content: mockMessage.content?.message,
      metadata: mockMessage.metadata,
      attachments: [mockImageAttachment],
    });
  });

  it("makes successful delete message request", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.deleteMessage(mockMessage.id!);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "DELETE");
  });

  it("makes successful add chat participants request", async function () {
    const mockHttpClient = generateHttpClient(201);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: AddParticipantsRequest = {
      participants: [mockSdkModelParticipant],
    };

    await chatThreadClient.addParticipants(sendRequest);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants/:add?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    const requestJson = JSON.parse(request.body as string);
    assert.equal(
      (sendRequest.participants[0].id as CommunicationUserIdentifier).communicationUserId,
      requestJson.participants[0].communicationIdentifier.communicationUser.id
    );
    assert.equal(sendRequest.participants[0].displayName, requestJson.participants[0].displayName);
    assert.equal(
      sendRequest.participants[0].shareHistoryTime?.toDateString(),
      new Date(requestJson.participants[0].shareHistoryTime).toDateString()
    );
  });

  it("makes successful add chat participants request with metadata", async function () {
    const mockHttpClient = generateHttpClient(201);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: AddParticipantsRequest = {
      participants: [
        {
          ...mockSdkModelParticipant,
          metadata: {
            userType: "C2",
          },
        },
      ],
    };

    await chatThreadClient.addParticipants(sendRequest);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants/:add?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    const requestJson = JSON.parse(request.body as string);
    assert.equal(
      (sendRequest.participants[0].id as CommunicationUserIdentifier).communicationUserId,
      requestJson.participants[0].communicationIdentifier.communicationUser.id
    );
    assert.equal(sendRequest.participants[0].displayName, requestJson.participants[0].displayName);
    assert.deepEqual(sendRequest.participants[0].metadata, requestJson.participants[0].metadata);
  });

  it("makes successful list chat participants request", async function () {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockParticipantWithMetadata],
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const participant of chatThreadClient.listParticipants()) {
      ++count;
      const { id, ...requestParticipant } = participant;
      const { communicationIdentifier, ...expectedParticipant } = mockParticipantWithMetadata;

      assert.equal(
        (id as CommunicationUserIdentifier).communicationUserId,
        communicationIdentifier?.communicationUser?.id
      );
      assert.deepEqual(requestParticipant, expectedParticipant);
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, 1);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful list chat participants request by page", async function () {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockParticipant, mockParticipant, mockParticipant],
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const iterator = chatThreadClient.listParticipants({ maxPageSize: 2 });
    let count = 0;
    for await (const page of iterator.byPage()) {
      // loop over each item in the page
      for (const participant of page) {
        ++count;
        const { id, ...requestParticipant } = participant;
        const { communicationIdentifier, ...expectedParticipant } = mockParticipant;

        assert.equal(
          (id as CommunicationUserIdentifier).communicationUserId,
          communicationIdentifier?.communicationUser?.id
        );
        assert.deepEqual(requestParticipant, expectedParticipant);
      }
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, 3);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants?maxPageSize=2&api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful remove chat participant request", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.removeParticipant(mockSdkModelParticipant.id);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants/:remove?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    const requestJson = JSON.parse(request.body as string);
    assert.deepEqual(mockParticipant.communicationIdentifier, requestJson);
  });

  it("makes successful sent typing notification request", async function () {
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const result = await chatThreadClient.sendTypingNotification();
    assert.isTrue(result);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/typing?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
  });

  it("makes only one sent typing notification request within 8 secs", async function () {
    const mockHttpClient = generateHttpClient(400);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    try {
      await chatThreadClient.sendTypingNotification();
      assert.fail("Should have thrown an error");
    } catch (e: any) {
      assert.equal(e.statusCode, 400);
    } finally {
      const result = await chatThreadClient.sendTypingNotification();
      assert.isFalse(result);

      sinon.assert.calledOnce(spy);
      const request = spy.getCall(0).args[0];
      assert.equal(
        request.url,
        `${baseUri}/chat/threads/${threadId}/typing?api-version=${API_VERSION}`
      );
      assert.equal(request.method, "POST");
    }
  });

  it("makes successful sent typing notification request with sender display name", async function () {
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const options = { senderDisplayName: "Bob Admin" };
    const result = await chatThreadClient.sendTypingNotification(options);
    assert.isTrue(result);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/typing?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body as string), options);
  });

  it("makes successful sent read receipt request", async function () {
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.sendReadReceipt({ chatMessageId: mockMessage.id! });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/readReceipts?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
  });

  it("makes successful list read receipts request", async function () {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockChatMessageReadReceipt, mockChatMessageReadReceipt],
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const readReceipt of chatThreadClient.listReadReceipts()) {
      ++count;
      const { sender, ...requestReceipt } = readReceipt;
      const { senderCommunicationIdentifier, ...expectedReceipt } = mockChatMessageReadReceipt;

      assert.equal(sender?.kind, "communicationUser");
      assert.equal(
        (sender as CommunicationUserIdentifier)?.communicationUserId,
        senderCommunicationIdentifier.communicationUser?.id
      );
      assert.deepEqual(requestReceipt, expectedReceipt);
    }

    assert.equal(count, 2);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/readReceipts?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful upload image request", async function () {
    const mockHttpClient = generateHttpClient(201, {
      id: mockImageAttachment.id,
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const imageArrayBuff = new TextEncoder().encode("someImageBase64EncodedBytes");
    const imageBlob = new Blob([new Uint8Array(imageArrayBuff, 0, imageArrayBuff.length)]);

    const imageFilename = mockImageAttachment.name ?? "image.png";

    const response = await chatThreadClient.uploadImage(
      imageBlob.stream(),
      imageFilename,
      imageArrayBuff.length
    );

    sinon.assert.calledOnce(spy);
    assert.equal(response.id, mockImageAttachment.id);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/images?api-version=${API_VERSION}`
    );

    assert.equal(request.method, "POST");
    assert.deepEqual(request.body, imageArrayBuff);
  });

  it("makes successful delete image request", async function () {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.deleteImage(mockImageAttachment.id!);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/images/${mockImageAttachment.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "DELETE");
  });
});
