// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import { QueueClient } from "../src/QueueClient";
import { Recorder } from "@azure-tools/test-recorder";
import { extractConnectionStringParts } from "../src/utils/utils.common";
import {
  configureStorageClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/testutils.common";
import { Context } from "mocha";

describe("QueueClient message methods", () => {
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const queueServiceClient = getQSU(recorder);
    queueName = recorder.variable("queue", getUniqueName("queue"));
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function () {
    await queueClient.delete();
    await recorder.stop();
  });

  it("enqueue, peek, dequeue and clear message with default parameters", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    await queueClient.sendMessage(messageContent);

    const pResult = await queueClient.peekMessages();
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);

    const dqResult = await queueClient.receiveMessages();
    assert.ok(dqResult.date);
    assert.ok(dqResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(dqResult.version);
    assert.deepStrictEqual(dqResult.receivedMessageItems.length, 1);
    assert.ok(dqResult.receivedMessageItems[0].popReceipt);
    assert.deepStrictEqual(dqResult.receivedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(dqResult.receivedMessageItems[0].messageId, eResult.messageId);

    const cResult = await queueClient.clearMessages();
    assert.ok(cResult.date);
    assert.ok(cResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(cResult.version);

    // check all messages are cleared
    const pResult2 = await queueClient.peekMessages();
    assert.ok(pResult2.date);
    assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
  });

  it("enqueue, peek, dequeue and clear message with all parameters", async () => {
    const eResult = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0,
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const eResult2 = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0,
    });
    await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 10,
      visibilityTimeout: 5,
    });
    await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 20,
      visibilityTimeout: 19,
    });

    const pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 2);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    assert.deepStrictEqual(pResult.peekedMessageItems[1].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[1].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[1].messageId, eResult2.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[1].insertedOn, eResult2.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[1].expiresOn, eResult2.expiresOn);

    const dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2,
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.receivedMessageItems.length, 2);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].expiresOn, eResult.expiresOn);
    assert.ok(dResult.receivedMessageItems[0].popReceipt);
    assert.ok(dResult.receivedMessageItems[0].nextVisibleOn);

    assert.deepStrictEqual(pResult.peekedMessageItems[1].messageText, messageContent);

    // check no message is visible
    const pResult2 = await queueClient.peekMessages();
    assert.ok(pResult2.date);
    assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
  });

  it("enqueue, peek, dequeue empty message, and peek, dequeue with numberOfMessages > count(messages)", async () => {
    const eResult = await queueClient.sendMessage("", {
      messageTimeToLive: 40,
      visibilityTimeout: 0,
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, "");
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    const dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2,
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.receivedMessageItems.length, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, "");
    assert.deepStrictEqual(dResult.receivedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].expiresOn, eResult.expiresOn);
    assert.ok(dResult.receivedMessageItems[0].popReceipt);
    assert.ok(dResult.receivedMessageItems[0].nextVisibleOn);
  });

  it("enqueue, peek, dequeue special characters", async () => {
    const specialMessage =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦\u00E9";

    const eResult = await queueClient.sendMessage(specialMessage, {
      messageTimeToLive: 40,
      visibilityTimeout: 0,
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, specialMessage);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    const dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2,
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.receivedMessageItems.length, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, specialMessage);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].expiresOn, eResult.expiresOn);
    assert.ok(dResult.receivedMessageItems[0].popReceipt);
    assert.ok(dResult.receivedMessageItems[0].nextVisibleOn);
  });

  it("enqueue, peek, dequeue with 64KB characters size which is computed after encoding", async () => {
    const newMessageContent = new Array(64 * 1024 + 1).join("a");

    const eResult = await queueClient.sendMessage(newMessageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0,
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    const dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2,
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.receivedMessageItems.length, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, newMessageContent);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].expiresOn, eResult.expiresOn);
    assert.ok(dResult.receivedMessageItems[0].popReceipt);
    assert.ok(dResult.receivedMessageItems[0].nextVisibleOn);
  });

  it("enqueue, peek and dequeue negative", async () => {
    const eResult = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40,
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let error;
    try {
      await queueClient.sendMessage(messageContent, {
        messageTimeToLive: 30,
        visibilityTimeout: 30,
      });
    } catch (err: any) {
      error = err;
    }
    assert.ok(error);

    let errorPeek;
    try {
      await queueClient.peekMessages({ numberOfMessages: 100 });
    } catch (err: any) {
      errorPeek = err;
    }
    assert.ok(errorPeek);

    const pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    // Note visibility time could be larger then message time to live for dequeue.
    await queueClient.receiveMessages({
      visibilityTimeout: 40,
      numberOfMessages: 2,
    });
  });

  it("enqueue negative with 65537B(64KB+1B) characters size which is computed after encoding", async () => {
    const newMessageContent = new Array(64 * 1024 + 2).join("a");

    let error;
    try {
      await queueClient.sendMessage(newMessageContent, {});
    } catch (err: any) {
      error = err;
    }
    assert.ok(error);
    assert.ok(
      error.message.includes(
        "The request body is too large and exceeds the maximum permissible limit."
      )
    );
  });

  it("can be created with a sas connection string and a queue name", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(recorder), queueName);
    configureStorageClient(recorder, newClient);
    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("can be created with a sas connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(recorder), queueName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      new QueueClient(getSASConnectionStringFromEnvironment(recorder), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("verify queueName passed to the client", async () => {
    const newClient = new QueueClient(
      extractConnectionStringParts(getSASConnectionStringFromEnvironment(recorder)).url +
        "/" +
        queueName +
        "/messages/"
    );
    configureStorageClient(recorder, newClient);
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });
});
