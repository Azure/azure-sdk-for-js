import * as assert from "assert";

import {Aborter} from "../lib/Aborter"
import {QueueURL} from "../lib/QueueURL"
import {MessagesURL} from "../lib/MessagesURL"
import {getQSU, getUniqueName} from "./utils"

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
        await queueURL.delete(Aborter.none)
    });

    it("enqueue, peek, dequeue and clear message with default parameters", async () => {
        let messagesURL = MessagesURL.fromQueueURL(queueURL);
        let eResult = await messagesURL.enqueue(Aborter.none, messageContent);
        assert.ok(eResult.date);
        assert.ok(eResult.expirationTime);
        assert.ok(eResult.insertionTime);
        assert.ok(eResult.messageID);
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
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageID, eResult.messageID);

        let dqResult = await messagesURL.dequeue(Aborter.none);
        assert.ok(dqResult.date);
        assert.ok(dqResult.requestId);
        assert.ok(dqResult.version);
        assert.deepStrictEqual(dqResult.dequeuedMessageItems.length, 1);
        assert.ok(dqResult.dequeuedMessageItems[0].popReceipt);
        assert.deepStrictEqual(dqResult.dequeuedMessageItems[0].messageText, messageContent);
        assert.deepStrictEqual(dqResult.dequeuedMessageItems[0].messageID, eResult.messageID);

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

        let eResult = await messagesURL.enqueue(Aborter.none, messageContent, {messageTimeToLive: 40, visibilitytimeout: 0});
        assert.ok(eResult.date);
        assert.ok(eResult.expirationTime);
        assert.ok(eResult.insertionTime);
        assert.ok(eResult.messageID);
        assert.ok(eResult.popReceipt);
        assert.ok(eResult.requestId);
        assert.ok(eResult.timeNextVisible);
        assert.ok(eResult.version);

        let eResult2 = await messagesURL.enqueue(Aborter.none, messageContent, {messageTimeToLive: 40, visibilitytimeout: 0});
        await messagesURL.enqueue(Aborter.none, messageContent, {messageTimeToLive: 10, visibilitytimeout: 5});
        await messagesURL.enqueue(Aborter.none, messageContent, {messageTimeToLive: 20, visibilitytimeout: 19});

        let pResult = await messagesURL.peek(Aborter.none, {numberOfMessages: 2});
        assert.ok(pResult.date);
        assert.ok(pResult.requestId);
        assert.ok(pResult.version);
        assert.deepStrictEqual(pResult.peekedMessageItems.length, 2);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageID, eResult.messageID);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].insertionTime, eResult.insertionTime);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].expirationTime, eResult.expirationTime);

        assert.deepStrictEqual(pResult.peekedMessageItems[1].messageText, messageContent);
        assert.deepStrictEqual(pResult.peekedMessageItems[1].dequeueCount, 0);
        assert.deepStrictEqual(pResult.peekedMessageItems[1].messageID, eResult2.messageID);
        assert.deepStrictEqual(pResult.peekedMessageItems[1].insertionTime, eResult2.insertionTime);
        assert.deepStrictEqual(pResult.peekedMessageItems[1].expirationTime, eResult2.expirationTime);

        let dResult = await messagesURL.dequeue(Aborter.none, {visibilitytimeout: 10, numberOfMessages: 2});
        assert.ok(dResult.date);
        assert.ok(dResult.requestId);
        assert.ok(dResult.version);
        assert.deepStrictEqual(dResult.dequeuedMessageItems.length, 2);
        assert.deepStrictEqual(dResult.dequeuedMessageItems[0].messageText, messageContent);
        assert.deepStrictEqual(dResult.dequeuedMessageItems[0].dequeueCount, 1);
        assert.deepStrictEqual(dResult.dequeuedMessageItems[0].messageID, eResult.messageID);
        assert.deepStrictEqual(dResult.dequeuedMessageItems[0].insertionTime, eResult.insertionTime);
        assert.deepStrictEqual(dResult.dequeuedMessageItems[0].expirationTime, eResult.expirationTime);
        assert.ok(dResult.dequeuedMessageItems[0].popReceipt);
        assert.ok(dResult.dequeuedMessageItems[0].timeNextVisible);

        assert.deepStrictEqual(pResult.peekedMessageItems[1].messageText, messageContent);

        // check no message is visible
        let pResult2 = await messagesURL.peek(Aborter.none);
        assert.ok(pResult2.date);
        assert.deepStrictEqual(pResult2.peekedMessageItems.length, 0);
    });

    it("enqueue, dequeue and peek negative", async () => {
        let messagesURL = MessagesURL.fromQueueURL(queueURL);
        let eResult = await messagesURL.enqueue(Aborter.none, messageContent, {messageTimeToLive: 40});
        assert.ok(eResult.date);
        assert.ok(eResult.expirationTime);
        assert.ok(eResult.insertionTime);
        assert.ok(eResult.messageID);
        assert.ok(eResult.popReceipt);
        assert.ok(eResult.requestId);
        assert.ok(eResult.timeNextVisible);
        assert.ok(eResult.version);

        let error;
        try {
            await messagesURL.enqueue(Aborter.none, messageContent, {messageTimeToLive: 30, visibilitytimeout: 30});
        }
        catch (err) {
            error = err;
        }
        assert.ok(error);

        let errorPeek;
        try {
            await messagesURL.peek(Aborter.none, {numberOfMessages: 100});
        }
        catch(err) {
            errorPeek = err;
        }
        assert.ok(errorPeek);

        let pResult = await messagesURL.peek(Aborter.none, {numberOfMessages: 2});
        assert.ok(pResult.date);
        assert.ok(pResult.requestId);
        assert.ok(pResult.version);
        assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].dequeueCount, 0);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageID, eResult.messageID);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].insertionTime, eResult.insertionTime);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].expirationTime, eResult.expirationTime);

        // Note visibility time could be larger then message time to live for dequeue.
        await messagesURL.dequeue(Aborter.none, {visibilitytimeout: 40, numberOfMessages: 2});
    });
});