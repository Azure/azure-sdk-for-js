import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  QueueSASPermissions,
  QueueClient,
  generateAccountSASQueryParameters,
  generateQueueSASQueryParameters,
  QueueServiceClient,
  StorageSharedKeyCredential,
  newPipeline
} from "../../src";
import { SASProtocol } from "../../src/SASQueryParameters";
import { getQSU } from "../utils/index";
import { record, delay, Recorder } from "@azure/test-utils-recorder";
import { recorderEnvSetup } from "../utils/index.browser";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let queueServiceClient: QueueServiceClient;
  let recorder: Recorder;

  beforeEach(function() {
    recorder = record(this, recorderEnvSetup);
    queueServiceClient = getQSU();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    await queueServiceClientwithSAS.getProperties();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("b").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
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
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${queueClient.url}?${queueSAS}`;
    const queueClientwithSAS = new QueueClient(sasURL, newPipeline(new AnonymousCredential()));

    await queueClientwithSAS.getProperties();
    await queueClient.delete();
  });

  it("generateQueueSASQueryParameters should work for messages", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const messageContent = "Hello World!";

    const sasURLForMessages = `${queueClient.url}?${queueSAS}`;
    const queuesClientWithSAS = new QueueClient(
      sasURLForMessages,
      newPipeline(new AnonymousCredential())
    );
    const enqueueResult = await queuesClientWithSAS.sendMessage(messageContent);

    let pResult = await queueClient.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);

    const sasURLForMessageId = `${queueClient.url}?${queueSAS}`;
    const queueClientWithSAS = new QueueClient(sasURLForMessageId);

    await queueClientWithSAS.deleteMessage(enqueueResult.messageId, enqueueResult.popReceipt);

    pResult = await queueClient.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 0);

    await queueClient.delete();
  });

  it("generateQueueSASQueryParameters should work for queue with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const id = "unique-id";
    await queueClient.setAccessPolicy([
      {
        accessPolicy: {
          permissions: QueueSASPermissions.parse("raup").toString(),
          startsOn: now
        },
        id
      }
    ]);

    const queueSAS = generateQueueSASQueryParameters(
      {
        expiresOn: tmr,
        queueName: queueClient.name,
        identifier: id
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${queueClient.url}?${queueSAS}`;
    const queuesClientwithSAS = new QueueClient(sasURL);

    const messageContent = "hello";

    const eResult = await queuesClientwithSAS.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    const pResult = await queuesClientwithSAS.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    const dResult = await queuesClientwithSAS.receiveMessages({
      visibilityTimeout: 1
    });
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, messageContent);

    await delay(2 * 1000);

    const sasURLForMessage = `${queueClient.url}?${queueSAS}`;
    const queueClientwithSAS = new QueueClient(sasURLForMessage);
    const deleteResult = await queueClientwithSAS.deleteMessage(
      dResult.receivedMessageItems[0].messageId,
      dResult.receivedMessageItems[0].popReceipt
    );
    assert.ok(deleteResult.requestId);
    assert.ok(deleteResult.clientRequestId);

    //const cResult = await queuesClientwithSAS.clear(); //This request is not authorized to perform this operation. As testing, this is service's current behavior.
  });
});
