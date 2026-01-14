// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { newPipeline } from "../../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { QueueClient } from "../../../src/QueueClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createQueueClient, createQueueServiceClient } from "../../public/node/utils/clients.js";
import { getUniqueName } from "../../public/utils/utils.js";
import { getAccountKey, getStorageConnectionString } from "../../utils/injectables.js";

describe("QueueClient messageId methods, Node.js only", () => {
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const queueServiceClient = await createQueueServiceClient("TokenCredential", { recorder });
    queueName = getUniqueName("queue", { recorder });
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
    await recorder.stop();
  });

  it("update message with 64KB characters including special char which is computed after encoding", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
    assert.isDefined(eResult.requestId);
    assert.isDefined(eResult.clientRequestId);
    assert.isDefined(eResult.nextVisibleOn);
    assert.isDefined(eResult.version);

    const specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    const buffer = Buffer.alloc(64 * 1024); // 64KB
    buffer.fill("a");
    buffer.write(specialChars, 0);
    const newMessage = buffer.toString();
    const uResult = await queueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage,
    );
    assert.isDefined(uResult.version);
    assert.isDefined(uResult.nextVisibleOn);
    assert.isDefined(uResult.date);
    assert.isDefined(uResult.requestId);
    assert.isDefined(eResult.clientRequestId);
    assert.isDefined(uResult.popReceipt);

    const pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message negative with 65537B (64KB+1B) characters including special char which is computed after encoding", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
    assert.isDefined(eResult.requestId);
    assert.isDefined(eResult.nextVisibleOn);
    assert.isDefined(eResult.version);

    const specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    const buffer = Buffer.alloc(64 * 1024 + 1);
    buffer.fill("a");
    buffer.write(specialChars, 0);
    const newMessage = buffer.toString();

    let error;
    try {
      await queueClient.updateMessage(eResult.messageId, eResult.popReceipt, newMessage);
    } catch (err: any) {
      error = err;
    }
    assert.isDefined(error);
    assert.include(
      error.message,
      "The request body is too large and exceeds the maximum permissible limit.",
    );
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);

    const newClient = await createQueueClient("AccountKey", { queueName, recorder });
    assert.isDefined(newClient);
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent,
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent,
    );
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode and options", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);

    const newClient = await createQueueClient("AccountKey", {
      queueName,
      recorder,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    assert.isDefined(newClient);
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent,
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent,
    );
  });

  it("can be created with Pipeline mode", async () => {
    const credential = queueClient["credential"];

    const eResult = await queueClient.sendMessage(messageContent);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);

    const pipeline = newPipeline(credential);
    const newClient = await createQueueClient("Pipeline", { queueName, recorder, pipeline });
    await newClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      messageContent + " " + messageContent,
    );
    const response = await queueClient.peekMessages();
    assert.equal(
      response.peekedMessageItems![0].messageText,
      messageContent + " " + messageContent,
    );
  });

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode",
    async () => {
      const eResult = await queueClient.sendMessage(messageContent);
      assert.isDefined(eResult.messageId);
      assert.isDefined(eResult.popReceipt);

      const newClient = await createQueueClient("AccountConnectionString", {
        queueName: queueClient.name,
        recorder,
      });
      assert.isDefined(newClient);
      await newClient.updateMessage(
        eResult.messageId,
        eResult.popReceipt,
        messageContent + " " + messageContent,
      );
      const response = await queueClient.peekMessages();
      assert.equal(
        response.peekedMessageItems![0].messageText,
        messageContent + " " + messageContent,
      );
    },
  );

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode and options",
    async () => {
      const eResult = await queueClient.sendMessage(messageContent);
      assert.isDefined(eResult.messageId);
      assert.isDefined(eResult.popReceipt);

      const newClient = await createQueueClient("AccountConnectionString", {
        queueName: queueClient.name,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);
      await newClient.updateMessage(
        eResult.messageId,
        eResult.popReceipt,
        messageContent + " " + messageContent,
      );
      const response = await queueClient.peekMessages();
      assert.equal(
        response.peekedMessageItems![0].messageText,
        messageContent + " " + messageContent,
      );
    },
  );

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      new QueueClient(getStorageConnectionString()!, "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
  });
});
