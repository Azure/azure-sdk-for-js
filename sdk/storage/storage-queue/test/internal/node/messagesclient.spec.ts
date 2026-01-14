// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { QueueClient } from "../../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../../utils/assert.js";
import { newPipeline } from "../../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createQueueClient, createQueueServiceClient } from "../../public/node/utils/clients.js";
import { getUniqueName } from "../../public/utils/utils.js";
import {
  getAccountKey,
  getAccountQueueUrl,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../../utils/injectables.js";

describe("QueueClient message methods, Node.js only", () => {
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

  it("enqueue, peek, dequeue with 64KB characters including special char which is computed after encoding", async () => {
    const specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    const buffer = Buffer.alloc(64 * 1024); // 64KB
    buffer.fill("a");
    buffer.write(specialChars, 0);
    const newMessageContent = buffer.toString();

    const eResult = await queueClient.sendMessage(newMessageContent, {
      messageTimeToLive: 40,
      visibilityTimeout: 0,
    });
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
    assert.isDefined(eResult.requestId);
    assert.isDefined(eResult.clientRequestId);
    assert.isDefined(eResult.nextVisibleOn);
    assert.isDefined(eResult.version);

    const pResult = await queueClient.peekMessages({ numberOfMessages: 2 });
    assert.isDefined(pResult.date);
    assert.isDefined(pResult.requestId);
    assert.isDefined(eResult.clientRequestId);
    assert.isDefined(pResult.version);
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
    assert.isDefined(dResult.date);
    assert.isDefined(dResult.requestId);
    assert.isDefined(eResult.clientRequestId);
    assert.isDefined(dResult.version);
    assert.deepStrictEqual(dResult.receivedMessageItems.length, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, newMessageContent);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageId, eResult.messageId);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].insertedOn, eResult.insertedOn);
    assert.deepStrictEqual(dResult.receivedMessageItems[0].expiresOn, eResult.expiresOn);
    assert.isDefined(dResult.receivedMessageItems[0].popReceipt);
    assert.isDefined(dResult.receivedMessageItems[0].nextVisibleOn);
  });

  it("enqueue negative with 65537B(64KB+1B) characters including special char which is computed after encoding", async () => {
    const specialChars =
      "!@#$%^&*()_+`-=[]|};'\":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦";
    const buffer = Buffer.alloc(64 * 1024 + 1);
    buffer.fill("a");
    buffer.write(specialChars, 0);
    const newMessageContent = buffer.toString();

    let error;
    try {
      await queueClient.sendMessage(newMessageContent, {});
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
    const newClient = await createQueueClient("AccountKey", { queueName, recorder });
    assert.isDefined(newClient);

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
    assert.isDefined(eResult.requestId);
    assert.isDefined(eResult.nextVisibleOn);
    assert.isDefined(eResult.version);
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode and options", async () => {
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

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
    assert.isDefined(eResult.requestId);
    assert.isDefined(eResult.nextVisibleOn);
    assert.isDefined(eResult.version);
  });

  it("can be created with Pipeline mode", async () => {
    const credential = queueClient["credential"];
    const pipeline = newPipeline(credential);
    const newClient = await createQueueClient("Pipeline", {
      queueName,
      recorder,
      pipeline,
    });

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
    assert.isDefined(eResult.requestId);
    assert.isDefined(eResult.nextVisibleOn);
    assert.isDefined(eResult.version);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode",
    async () => {
      const newClient = await createQueueClient("AccountConnectionString", { queueName, recorder });
      assert.isDefined(newClient);

      const eResult = await newClient.sendMessage(messageContent);
      assert.isDefined(eResult.date);
      assert.isDefined(eResult.expiresOn);
      assert.isDefined(eResult.insertedOn);
      assert.isDefined(eResult.messageId);
      assert.isDefined(eResult.popReceipt);
    },
  );

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode and options",
    async () => {
      const newClient = await createQueueClient("AccountConnectionString", {
        queueName,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);

      const eResult = await newClient.sendMessage(messageContent);
      assert.isDefined(eResult.date);
      assert.isDefined(eResult.expiresOn);
      assert.isDefined(eResult.insertedOn);
      assert.isDefined(eResult.messageId);
      assert.isDefined(eResult.popReceipt);
    },
  );

  it("can be created with Custom mode (TokenCredential)", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = await createQueueClient("Custom", {
      queueName,
      recorder,
      credential: tokenCredential,
    });
    assertClientUsesTokenCredential(newClient);
  });

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created with SASConnectionString mode",
    async () => {
      const newClient = await createQueueClient("SASConnectionString", { queueName, recorder });
      assert.isDefined(newClient);
      const eResult = await newClient.sendMessage(messageContent);
      assert.isDefined(eResult.date);
      assert.isDefined(eResult.expiresOn);
      assert.isDefined(eResult.insertedOn);
      assert.isDefined(eResult.messageId);
      assert.isDefined(eResult.popReceipt);
    },
  );

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created with SASConnectionString mode and options",
    async () => {
      const newClient = await createQueueClient("SASConnectionString", {
        queueName,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);

      const eResult = await newClient.sendMessage(messageContent);
      assert.isDefined(eResult.date);
      assert.isDefined(eResult.expiresOn);
      assert.isDefined(eResult.insertedOn);
      assert.isDefined(eResult.messageId);
      assert.isDefined(eResult.popReceipt);
    },
  );

  it.runIf(getStorageConnectionStringWithSas())(
    "throws error if constructor queueName parameter is empty",
    async () => {
      try {
        new QueueClient(getStorageConnectionStringWithSas()!, "");
        assert.fail("Expecting an thrown error but didn't get one.");
      } catch (error: any) {
        assert.equal(
          "Expecting non-empty strings for queueName parameter",
          error.message,
          "Error message is different than expected.",
        );
      }
    },
  );

  it("verify queueName passed to the client", async () => {
    const testQueueName = "testqueue";
    const newClient = new QueueClient(getAccountQueueUrl() + testQueueName + "/messages/");
    assert.equal(newClient.name, testQueueName, "Queue name is not the same as the one provided.");
  });
});
