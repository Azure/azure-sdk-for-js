import * as assert from "assert";
import { getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import { QueueClient } from "../src/QueueClient";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as dotenv from "dotenv";
import { extractConnectionStringParts } from "../src/utils/utils.common";
import { recorderEnvSetup } from "./utils/testutils.common";
dotenv.config();

describe("QueueClient message methods", () => {
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const queueServiceClient = getQSU();
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function() {
    await queueClient.delete();
    await recorder.stop();
  });

  it("enqueue, peek, dequeue and clear message with default parameters", async () => {
    let eResult = await queueClient.sendMessage(messageContent);
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

    let pResult = await queueClient.peekMessages();
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);

    let dqResult = await queueClient.receiveMessages();
    assert.ok(dqResult.date);
    assert.ok(dqResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(dqResult.version);
    assert.deepStrictEqual(dqResult.receivedMessageItems.length, 1);
    assert.ok(dqResult.receivedMessageItems[0].popReceipt);
    assert.deepStrictEqual(dqResult.receivedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(dqResult.receivedMessageItems[0].messageId, eResult.messageId);

    let cResult = await queueClient.clearMessages();
    assert.ok(cResult.date);
    assert.ok(cResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(cResult.version);

    // check all messages are cleared
    let pResult2 = await queueClient.peekMessages();
    assert.ok(pResult2.date);
    assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
  });

  it("enqueue, peek, dequeue and clear message with all parameters", async () => {
    let eResult = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let eResult2 = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0
    });
    await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 10,
      visibilityTimeout: 5
    });
    await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 20,
      visibilityTimeout: 19
    });

    let pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
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

    let dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2
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
    let pResult2 = await queueClient.peekMessages();
    assert.ok(pResult2.date);
    assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
  });

  it("enqueue, peek, dequeue empty message, and peek, dequeue with numberOfMessages > count(messages)", async () => {
    let eResult = await queueClient.sendMessage("", {
      messageTimeToLive: 40,
      visibilityTimeout: 0
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, "");
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    let dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2
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
    let specialMessage =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦\u00E9";

    let eResult = await queueClient.sendMessage(specialMessage, {
      messageTimeToLive: 40,
      visibilityTimeout: 0
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, specialMessage);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    let dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2
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
    let messageContent = new Array(64 * 1024 + 1).join("a");

    let eResult = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expiresOn, eResult.expiresOn);

    let dResult = await queueClient.receiveMessages({
      visibilityTimeout: 10,
      numberOfMessages: 2
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.receivedMessageItems.length, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].expiresOn, eResult.expiresOn);
    assert.ok(dResult.receivedMessageItems[0].popReceipt);
    assert.ok(dResult.receivedMessageItems[0].nextVisibleOn);
  });

  it("enqueue, peek and dequeue negative", async () => {
    let eResult = await queueClient.sendMessage(messageContent, {
      messageTimeToLive: 40
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
        visibilityTimeout: 30
      });
    } catch (err) {
      error = err;
    }
    assert.ok(error);

    let errorPeek;
    try {
      await queueClient.peekMessages({ numberOfMessages: 100 });
    } catch (err) {
      errorPeek = err;
    }
    assert.ok(errorPeek);

    let pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
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
      numberOfMessages: 2
    });
  });

  it("enqueue negative with 65537B(64KB+1B) characters size which is computed after encoding", async () => {
    let messageContent = new Array(64 * 1024 + 2).join("a");

    let error;
    try {
      await queueClient.sendMessage(messageContent, {});
    } catch (err) {
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
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("can be created with a sas connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(), queueName, {
      retryOptions: {
        maxTries: 5
      }
    });

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new QueueClient(getSASConnectionStringFromEnvironment(), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("verify queueName passed to the client", async () => {
    const newClient = new QueueClient(
      extractConnectionStringParts(getSASConnectionStringFromEnvironment()).url +
        "/" +
        queueName +
        "/messages/"
    );
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });
});
