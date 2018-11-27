import * as assert from "assert";

import {Aborter} from "../lib/Aborter"
import {QueueURL} from "../lib/QueueURL"
import {MessagesURL} from "../lib/MessagesURL"
import {MessageIDURL} from "../lib/MessageIDURL"
import {getQSU, getUniqueName} from "./utils"

describe("MessageIDURL", () => {
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

    it("update and delete message with default/all parameters", async () => {
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

        let newMessage = "New Message";
        let messageIDURL = MessageIDURL.fromMessagesURL(messagesURL, eResult.messageID);
        let uResult = await messageIDURL.update(Aborter.none, eResult.popReceipt, 0, newMessage);
        assert.ok(uResult.version);
        assert.ok(uResult.timeNextVisible);
        assert.ok(uResult.date);
        assert.ok(uResult.requestId);
        assert.ok(uResult.popReceipt);

        let pResult = await messagesURL.peek(Aborter.none);
        assert.equal(pResult.peekedMessageItems.length, 1);
        assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);

        let dResult = await messageIDURL.delete(Aborter.none, uResult.popReceipt!);
        assert.ok(dResult.date);
        assert.ok(dResult.requestId);
        assert.ok(dResult.version);

        pResult = await messagesURL.peek(Aborter.none);
        assert.equal(pResult.peekedMessageItems.length, 0);
    });

});