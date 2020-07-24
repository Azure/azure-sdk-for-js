import * as assert from "assert";
import { newPipeline } from "../../src";
import { getQSU, getConnectionStringFromEnvironment } from "../utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import { QueueClient } from "../../src/QueueClient";
import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential";
import { recorderEnvSetup } from "../utils/index.browser";

describe("QueueClient messageId methods, Node.js only", () => {
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

  it("update message with 64KB characters including special char which is computed after encoding", async () => {
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

    let specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    let buffer = Buffer.alloc(64 * 1024); //64KB
    buffer.fill("a");
    buffer.write(specialChars, 0);
    let newMessage = buffer.toString();
    let uResult = await queueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage
    );
    assert.ok(uResult.version);
    assert.ok(uResult.nextVisibleOn);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(uResult.popReceipt);

    let pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message negative with 65537B (64KB+1B) characters including special char which is computed after encoding", async () => {
    let eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    let specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    let buffer = Buffer.alloc(64 * 1024 + 1);
    buffer.fill("a");
    buffer.write(specialChars, 0);
    let newMessage = buffer.toString();

    let error;
    try {
      await queueClient.updateMessage(eResult.messageId, eResult.popReceipt, newMessage);
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

    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

    const newClient = new QueueClient(queueClient.url, credential);
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent
    );
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

    const newClient = new QueueClient(queueClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent
    );
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

    const pipeline = newPipeline(credential);
    const newClient = new QueueClient(queueClient.url, pipeline);
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent
    );
  });

  it("can be created with a connection string and a queue name and a message id", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueClient.name);
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent
    );
  });

  it("can be created with a connection string and a queue name and a message id and an option bag", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueClient.name, {
      retryOptions: {
        maxTries: 5
      }
    });
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent
    );
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new QueueClient(getConnectionStringFromEnvironment(), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected."
      );
    }
  });
});
