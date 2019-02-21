import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { QueueURL } from "../../lib/QueueURL";
import { MessagesURL } from "../../lib/MessagesURL";
import { MessageIdURL } from "../../lib/MessageIdURL";
import { getQSU, getUniqueName } from "../utils";

describe("MessageIdURL Node", () => {
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

  it("update message with 64KB characters including special char which is computed after encoding", async () => {
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

    let specialChars = '!@#$%^&*()_+`-=[]\|};\'":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞\𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦'
    let buffer = Buffer.alloc(64*1024); //64KB
    buffer.fill('a');
    buffer.write(specialChars, 0);
    let newMessage = buffer.toString();
    let messageIdURL = MessageIdURL.fromMessagesURL(
      messagesURL,
      eResult.messageId
    );
    let uResult = await messageIdURL.update(
      Aborter.none,
      eResult.popReceipt,
      0,
      newMessage
    );
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesURL.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(
      pResult.peekedMessageItems[0].messageText,
      newMessage
    );
  });

  it("update message negative with 65537B (64KB+1B) characters including special char which is computed after encoding", async () => {
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

    let specialChars = '!@#$%^&*()_+`-=[]\|};\'":,./?><`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞\𻆕󛿓򐞺Ӯ򡗺򴜍<񐸩԰Bu)򁉂񖨞á<џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦'
    let buffer = Buffer.alloc(64*1024 + 1);
    buffer.fill('a');
    buffer.write(specialChars, 0);
    let newMessage = buffer.toString();
    let messageIdURL = MessageIdURL.fromMessagesURL(
      messagesURL,
      eResult.messageId
    );

    let error;
    try{
      await messageIdURL.update(
        Aborter.none,
        eResult.popReceipt,
        0,
        newMessage
      );
    } catch(err) {
      error = err
    }
    assert.ok(error);
    assert.ok(error.message.includes("The request body is too large and exceeds the maximum permissible limit."))
  });
});
