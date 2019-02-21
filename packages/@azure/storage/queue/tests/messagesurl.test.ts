import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { QueueURL } from "../lib/QueueURL";
import { MessagesURL } from "../lib/MessagesURL";
import { getQSU, getUniqueName } from "./utils";

describe("MessagesURL", () => {
  const serviceURL = getQSU();
  let queueName = getUniqueName("queue");
  let queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
  const messageContent = "Hello World";

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);
  });

  afterEach(async () => {
    await queueURL.delete(Aborter.none);
  });

  it("enqueue, peek, dequeue and clear message with default parameters", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    await messagesURL.enqueue(Aborter.none, messageContent);

    let pResult = await messagesURL.peek(Aborter.none);
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageId,
      eResult.messageId
    );

    let dqResult = await messagesURL.dequeue(Aborter.none);
    assert.ok(dqResult.date);
    assert.ok(dqResult.requestId);
    assert.ok(dqResult.version);
    assert.deepStrictEqual(dqResult.dequeuedMessageItems.length, 1);
    assert.ok(dqResult.dequeuedMessageItems[0].popReceipt);
    assert.deepStrictEqual(
      dqResult.dequeuedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(
      dqResult.dequeuedMessageItems[0].messageId,
      eResult.messageId
    );

    let cResult = await messagesURL.clear(Aborter.none);
    assert.ok(cResult.date);
    assert.ok(cResult.requestId);
    assert.ok(cResult.version);

    // check all messages are cleared
    let pResult2 = await messagesURL.peek(Aborter.none);
    assert.ok(pResult2.date);
    assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
  });

  it("enqueue, peek, dequeue and clear message with all parameters", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);

    let eResult = await messagesURL.enqueue(Aborter.none, messageContent, {
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

    let eResult2 = await messagesURL.enqueue(Aborter.none, messageContent, {
      messageTimeToLive: 40,
      visibilitytimeout: 0
    });
    await messagesURL.enqueue(Aborter.none, messageContent, {
      messageTimeToLive: 10,
      visibilitytimeout: 5
    });
    await messagesURL.enqueue(Aborter.none, messageContent, {
      messageTimeToLive: 20,
      visibilitytimeout: 19
    });

    let pResult = await messagesURL.peek(Aborter.none, { numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 2);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].expirationTime,
      eResult.expirationTime
    );

    assert.deepStrictEqual(
      pResult.peekedMessageItems[1].messageText,
      messageContent
    );
    assert.deepStrictEqual(pResult.peekedMessageItems[1].dequeueCount, 0);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[1].messageId,
      eResult2.messageId
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[1].insertionTime,
      eResult2.insertionTime
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[1].expirationTime,
      eResult2.expirationTime
    );

    let dResult = await messagesURL.dequeue(Aborter.none, {
      visibilitytimeout: 10,
      numberOfMessages: 2
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.dequeuedMessageItems.length, 2);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].expirationTime,
      eResult.expirationTime
    );
    assert.ok(dResult.dequeuedMessageItems[0].popReceipt);
    assert.ok(dResult.dequeuedMessageItems[0].timeNextVisible);

    assert.deepStrictEqual(
      pResult.peekedMessageItems[1].messageText,
      messageContent
    );

    // check no message is visible
    let pResult2 = await messagesURL.peek(Aborter.none);
    assert.ok(pResult2.date);
    assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
  });

  it("enqueue, peek, dequeue empty message, and peek, dequeue with numberOfMessages > count(messages)", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);

    let eResult = await messagesURL.enqueue(Aborter.none, "", {
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

    let pResult = await messagesURL.peek(Aborter.none, { numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      ""
    );
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].expirationTime,
      eResult.expirationTime
    );

    let dResult = await messagesURL.dequeue(Aborter.none, {
      visibilitytimeout: 10,
      numberOfMessages: 2
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.dequeuedMessageItems.length, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageText,
      ''
    );
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].expirationTime,
      eResult.expirationTime
    );
    assert.ok(dResult.dequeuedMessageItems[0].popReceipt);
    assert.ok(dResult.dequeuedMessageItems[0].timeNextVisible);
  });

  it("enqueue, peek, dequeue special characters", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);

    let specialMessage = '!@#$%^&*()_+`-=[]\|};\'":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞\𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦\u00E9'

    let eResult = await messagesURL.enqueue(Aborter.none, specialMessage, {
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

    let pResult = await messagesURL.peek(Aborter.none, { numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      specialMessage
    );
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].expirationTime,
      eResult.expirationTime
    );

    let dResult = await messagesURL.dequeue(Aborter.none, {
      visibilitytimeout: 10,
      numberOfMessages: 2
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.dequeuedMessageItems.length, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageText,
      specialMessage
    );
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].expirationTime,
      eResult.expirationTime
    );
    assert.ok(dResult.dequeuedMessageItems[0].popReceipt);
    assert.ok(dResult.dequeuedMessageItems[0].timeNextVisible);
  });

  it("enqueue, peek, dequeue with 64KB characters size which is computed after encoding", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let messageContent = new Array(64*1024 + 1).join('a');

    let eResult = await messagesURL.enqueue(Aborter.none, messageContent, {
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

    let pResult = await messagesURL.peek(Aborter.none, { numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].expirationTime,
      eResult.expirationTime
    );

    let dResult = await messagesURL.dequeue(Aborter.none, {
      visibilitytimeout: 10,
      numberOfMessages: 2
    });
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);
    assert.deepStrictEqual(dResult.dequeuedMessageItems.length, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].dequeueCount, 1);
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      dResult.dequeuedMessageItems[0].expirationTime,
      eResult.expirationTime
    );
    assert.ok(dResult.dequeuedMessageItems[0].popReceipt);
    assert.ok(dResult.dequeuedMessageItems[0].timeNextVisible);
  });

  it("enqueue, peek and dequeue negative", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent, {
      messageTimeToLive: 40
    });
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let error;
    try {
      await messagesURL.enqueue(Aborter.none, messageContent, {
        messageTimeToLive: 30,
        visibilitytimeout: 30
      });
    } catch (err) {
      error = err;
    }
    assert.ok(error);

    let errorPeek;
    try {
      await messagesURL.peek(Aborter.none, { numberOfMessages: 100 });
    } catch (err) {
      errorPeek = err;
    }
    assert.ok(errorPeek);

    let pResult = await messagesURL.peek(Aborter.none, { numberOfMessages: 2 });
    assert.ok(pResult.date);
    assert.ok(pResult.requestId);
    assert.ok(pResult.version);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      messageContent
    );
    assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageId,
      eResult.messageId
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].insertionTime,
      eResult.insertionTime
    );
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].expirationTime,
      eResult.expirationTime
    );

    // Note visibility time could be larger then message time to live for dequeue.
    await messagesURL.dequeue(Aborter.none, {
      visibilitytimeout: 40,
      numberOfMessages: 2
    });
  });

  it("enqueue negative with 65537B(64KB+1B) characters size which is computed after encoding", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let messageContent = new Array(64*1024 + 2).join('a');

    let error
    try {
      await messagesURL.enqueue(Aborter.none, messageContent, {});
    } catch(err) {
      error = err
    }
    assert.ok(error)
    assert.ok(error.message.includes("The request body is too large and exceeds the maximum permissible limit."))
  });
});