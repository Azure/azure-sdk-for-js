import * as assert from "assert";
import { getQSU, getConnectionStringFromEnvironment } from "../utils";
import { record } from "../utils/recorder";
import { QueueClient } from "../../src/QueueClient";
import { MessagesClient } from "../../src/MessagesClient";
import { SharedKeyCredential } from "../../src/credentials/SharedKeyCredential";
import { TokenCredential } from '@azure/core-http';
import { assertClientUsesTokenCredential } from '../utils/assert';

describe("MessagesClient Node.js only", () => {
  const queueServiceClient = getQSU();
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";

  let recorder: any;

  beforeEach(async function () {
    recorder = record(this);
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
    recorder.stop();
  });

  it("enqueue, peek, dequeue with 64KB characters including special char which is computed after encoding", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    let buffer = Buffer.alloc(64 * 1024); //64KB
    buffer.fill("a");
    buffer.write(specialChars, 0);
    let messageContent = buffer.toString();

    let eResult = await messagesClient.enqueue(messageContent, {
      messageTimeToLive: 40,
      visibilitytimeout: 0
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let pResult = await messagesClient.peek({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].insertionTime, eResult.insertionTime);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].expirationTime, eResult.expirationTime);

    let dResult = await messagesClient.dequeue({
      visibilitytimeout: 10,
      numberOfMessages: 2
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.dequeuedMessageItems.length, 1);
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].messageText, messageContent);
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].insertionTime, eResult.insertionTime);
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].expirationTime, eResult.expirationTime);
    assert.ok(dResult.dequeuedMessageItems[0].popReceipt);
    assert.ok(dResult.dequeuedMessageItems[0].timeNextVisible);
  });

  it("enqueue negative with 65537B(64KB+1B) characters including special char which is computed after encoding", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    let buffer = Buffer.alloc(64 * 1024 + 1);
    buffer.fill("a");
    buffer.write(specialChars, 0);
    let messageContent = buffer.toString();

    let error;
    try {
      await messagesClient.enqueue(messageContent, {});
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

  it("can be created with a url and a credential", async () => {
    const messagesClient = queueClient.getMessagesClient();
    const factories = (messagesClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new MessagesClient(messagesClient.url, credential);

    const eResult = await newClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const messagesClient = queueClient.getMessagesClient();
    const factories = (messagesClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new MessagesClient(messagesClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const eResult = await newClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);
  });

  it("can be created with a url and a pipeline", async () => {
    const messagesClient = queueClient.getMessagesClient();
    const factories = (messagesClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new MessagesClient(messagesClient.url, credential);

    const eResult = await newClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);
  });

  it("can be created with a connection string and a queue name", async () => {
    const newClient = new MessagesClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("can be created with a connection string and a queue name and an option bag", async () => {
    const newClient = new MessagesClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new MessagesClient(getConnectionStringFromEnvironment(), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () => Promise.resolve({
        token: 'token',
        expiresOnTimestamp: 12345
      })
    }
    const newClient = new MessagesClient("https://queue", tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });
});
