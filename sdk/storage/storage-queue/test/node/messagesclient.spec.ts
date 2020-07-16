import * as assert from "assert";
import { getQSU, getConnectionStringFromEnvironment } from "../utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import { QueueClient } from "../../src/QueueClient";
import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { newPipeline } from "../../src";
import { recorderEnvSetup } from "../utils/index.browser";

describe("QueueClient message methods, Node.js only", () => {
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

  it("enqueue, peek, dequeue with 64KB characters including special char which is computed after encoding", async () => {
    let specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    let buffer = Buffer.alloc(64 * 1024); //64KB
    buffer.fill("a");
    buffer.write(specialChars, 0);
    let messageContent = buffer.toString();

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
    assert.ok(eResult.clientRequestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(eResult.clientRequestId);
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
    assert.ok(eResult.clientRequestId);
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

  it("enqueue negative with 65537B(64KB+1B) characters including special char which is computed after encoding", async () => {
    let specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    let buffer = Buffer.alloc(64 * 1024 + 1);
    buffer.fill("a");
    buffer.write(specialChars, 0);
    let messageContent = buffer.toString();

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

  it("can be created with a url and a credential", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new QueueClient(queueClient.url, credential);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new QueueClient(queueClient.url, credential, {
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
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new QueueClient(queueClient.url, pipeline);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);
  });

  it("can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("can be created with a connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName, {
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

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new QueueClient(
      `https://myaccount.queue.core.windows.net/` + queueName,
      tokenCredential
    );
    assertClientUsesTokenCredential(newClient);
  });
});
