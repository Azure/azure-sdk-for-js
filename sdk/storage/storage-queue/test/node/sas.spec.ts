import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  MessagesURL,
  MessageIdURL,
  QueueSASPermissions,
  QueueURL,
  generateAccountSASQueryParameters,
  generateQueueSASQueryParameters,
  ServiceURL,
  SharedKeyCredential,
  StorageURL
} from "../../src";
import { Aborter } from "../../src/Aborter";
import { SASProtocol } from "../../src/SASQueryParameters";
import { getQSU } from "../utils/index";
import { record, delay } from "../utils/recorder";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  const serviceURL = getQSU();

  let recorder: any;

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(() => {
    recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLwithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    await serviceURLwithSAS.getProperties(Aborter.none);
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("wdlcup").toString(),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLwithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceURLwithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup").toString(),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("b").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLwithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceURLwithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${serviceURL.url}?${sas}`;
    const serviceURLwithSAS = new ServiceURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceURLwithSAS.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateQueueSASQueryParameters should work for queue", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName,
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${queueURL.url}?${queueSAS}`;
    const queueURLwithSAS = new QueueURL(sasURL, StorageURL.newPipeline(new AnonymousCredential()));

    await queueURLwithSAS.getProperties(Aborter.none);
    await queueURL.delete(Aborter.none);
  });

  it("generateQueueSASQueryParameters should work for messages", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueName,
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup").toString(),
        protocol: SASProtocol.HTTPSandHTTP,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const messageContent = "Hello World!";

    const messagesURL = MessagesURL.fromQueueURL(queueURL);
    const sasURLForMessages = `${messagesURL.url}?${queueSAS}`;
    const messagesURLWithSAS = new MessagesURL(
      sasURLForMessages,
      StorageURL.newPipeline(new AnonymousCredential())
    );
    const enqueueResult = await messagesURLWithSAS.enqueue(Aborter.none, messageContent);

    let pResult = await messagesURL.peek(Aborter.none);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);

    const messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, enqueueResult.messageId);
    const sasURLForMessageId = `${messageIdURL.url}?${queueSAS}`;
    const messageIdURLWithSAS = new MessageIdURL(
      sasURLForMessageId,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    await messageIdURLWithSAS.delete(Aborter.none, enqueueResult.popReceipt);

    pResult = await messagesURL.peek(Aborter.none);
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 0);

    await queueURL.delete(Aborter.none);
  });

  it("generateQueueSASQueryParameters should work for queue with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = serviceURL.pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);

    const id = "unique-id";
    await queueURL.setAccessPolicy(Aborter.none, [
      {
        accessPolicy: {
          expiry: tmr,
          permission: QueueSASPermissions.parse("raup").toString(),
          start: now
        },
        id
      }
    ]);

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName,
        identifier: id
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const messagesURL = MessagesURL.fromQueueURL(queueURL);

    const sasURL = `${messagesURL.url}?${queueSAS}`;
    const messagesURLwithSAS = new MessagesURL(
      sasURL,
      StorageURL.newPipeline(new AnonymousCredential())
    );

    const messageContent = "hello";

    const eResult = await messagesURLwithSAS.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.messageId);
    const pResult = await messagesURLwithSAS.peek(Aborter.none);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    const dResult = await messagesURLwithSAS.dequeue(Aborter.none, {
      visibilitytimeout: 1
    });
    assert.deepStrictEqual(dResult.dequeuedMessageItems[0].messageText, messageContent);

    await delay(2 * 1000);

    const messageIdURL = MessageIdURL.fromMessagesURL(
      messagesURL,
      dResult.dequeuedMessageItems[0].messageId
    );

    const sasURLForMessage = `${messageIdURL.url}?${queueSAS}`;
    const messageIdURLwithSAS = new MessageIdURL(
      sasURLForMessage,
      StorageURL.newPipeline(new AnonymousCredential())
    );
    const deleteResult = await messageIdURLwithSAS.delete(
      Aborter.none,
      dResult.dequeuedMessageItems[0].popReceipt
    );
    assert.ok(deleteResult.requestId);
    assert.ok(deleteResult.clientRequestId);

    //const cResult = await messagesURLwithSAS.clear(Aborter.none); //This request is not authorized to perform this operation. As testing, this is service's current behavior.
  });
});
