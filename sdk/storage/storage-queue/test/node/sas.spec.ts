// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { StorageSharedKeyCredential } from "../../src/index.js";
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
  newPipeline,
  StorageOAuthScopes,
} from "../../src/index.js";
import { SASProtocol } from "../../src/SASQueryParameters.js";
import {
  configureStorageClient,
  getQSU,
  getSignatureFromSasUrl,
  getTokenBSU,
  getTokenBSUWithDefaultCredential,
  getTokenCredential,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.js";
import { delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { UserDelegationKeyCredential } from "@azure/storage-common";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let queueServiceClient: QueueServiceClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    queueServiceClient = getQSU(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(sasURL, newPipeline());
    configureStorageClient(recorder, queueServiceClientwithSAS);

    await queueServiceClientwithSAS.getProperties();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, queueServiceClientwithSAS);

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.isDefined(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("b").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, queueServiceClientwithSAS);

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.isDefined(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, queueServiceClientwithSAS);

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.isDefined(error);
  });

  it("generateQueueSASQueryParameters should work for queue", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${queueClient.url}?${queueSAS}`;
    const queueClientwithSAS = new QueueClient(sasURL, newPipeline(new AnonymousCredential()));
    configureStorageClient(recorder, queueClientwithSAS);

    await queueClientwithSAS.getProperties();
    await queueClient.delete();
  });

  it("generateQueueSASQueryParameters should work for messages", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const messageContent = "Hello World!";

    const sasURLForMessages = `${queueClient.url}?${queueSAS}`;
    const queuesClientWithSAS = new QueueClient(
      sasURLForMessages,
      newPipeline(new AnonymousCredential()),
    );
    configureStorageClient(recorder, queuesClientWithSAS);
    const enqueueResult = await queuesClientWithSAS.sendMessage(messageContent);

    let pResult = await queueClient.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);

    const sasURLForMessageId = `${queueClient.url}?${queueSAS}`;
    const queueClientWithSAS = new QueueClient(sasURLForMessageId);
    configureStorageClient(recorder, queueClientWithSAS);

    await queueClientWithSAS.deleteMessage(enqueueResult.messageId, enqueueResult.popReceipt);

    pResult = await queueClient.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 0);

    await queueClient.delete();
  });

  it("generateQueueSASQueryParameters should work for queue with access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const id = "unique-id";
    await queueClient.setAccessPolicy([
      {
        accessPolicy: {
          permissions: QueueSASPermissions.parse("raup").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    const queueSAS = generateQueueSASQueryParameters(
      {
        expiresOn: tmr,
        queueName: queueClient.name,
        identifier: id,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${queueClient.url}?${queueSAS}`;
    const queuesClientwithSAS = new QueueClient(sasURL);
    configureStorageClient(recorder, queuesClientwithSAS);

    const messageContent = "hello";

    const eResult = await queuesClientwithSAS.sendMessage(messageContent);
    assert.isDefined(eResult.messageId);
    const pResult = await queuesClientwithSAS.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    const dResult = await queuesClientwithSAS.receiveMessages({
      visibilityTimeout: 1,
    });
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, messageContent);

    await delay(2 * 1000);

    const sasURLForMessage = `${queueClient.url}?${queueSAS}`;
    const queueClientwithSAS = new QueueClient(sasURLForMessage);
    configureStorageClient(recorder, queueClientwithSAS);
    const deleteResult = await queueClientwithSAS.deleteMessage(
      dResult.receivedMessageItems[0].messageId,
      dResult.receivedMessageItems[0].popReceipt,
    );
    assert.isDefined(deleteResult.requestId);
    assert.isDefined(deleteResult.clientRequestId);

    // const cResult = await queuesClientwithSAS.clear(); //This request is not authorized to perform this operation. As testing, this is service's current behavior.
  });

  it("QueueServiceClient.generateAccountSasUrl should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];
    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("q").toString(),
        startsOn: now,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();
    const sasURL1 = `${queueServiceClient.url}?${sas}`;

    const sasURL = queueServiceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacup"),
      undefined,
      {
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
      },
    );
    assert.deepStrictEqual(sasURL, sasURL1);

    const queueServiceClientwithSAS = new QueueServiceClient(sasURL);
    configureStorageClient(recorder, queueServiceClientwithSAS);
    await queueServiceClientwithSAS.getProperties();
  });

  it("QueueServiceClient.generateAccountSasUrl with previous version should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];
    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("q").toString(),
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();
    const sasURL1 = `${queueServiceClient.url}?${sas}`;

    const sasURL = queueServiceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacup"),
      undefined,
      {
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      },
    );
    assert.deepStrictEqual(sasURL, sasURL1);

    const queueServiceClientwithSAS = new QueueServiceClient(sasURL);
    configureStorageClient(recorder, queueServiceClientwithSAS);
    await queueServiceClientwithSAS.getProperties();
  });

  it("QueueClient.generateSasUrl should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
    const sasURL1 = `${queueClient.url}?${queueSAS}`;

    const sasURL = queueClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: QueueSASPermissions.parse("raup"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2016-05-31",
    });
    assert.deepStrictEqual(sasURL, sasURL1);

    const queueClientwithSAS = new QueueClient(sasURL, newPipeline(new AnonymousCredential()));
    configureStorageClient(recorder, queueClientwithSAS);
    await queueClientwithSAS.getProperties();
    await queueClient.delete();
  });

  it("create queue with invalid SAS should fail", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() - 1);

    const sharedKeyCredential = queueServiceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const serviceClientWithSAS = new QueueServiceClient(sasURL, newPipeline());
    configureStorageClient(recorder, serviceClientWithSAS);

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = serviceClientWithSAS.getQueueClient(queueName);
    try {
      await queueClient.create();
    } catch (err) {
      assert.isTrue(
        (err as any).details.authenticationErrorDetail.startsWith("Signed expiry time"),
      );
    }
  });

  function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }

  it("GenerateUserDelegationSAS with skuoid should work", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }

    // Try to get BlobServiceClient object with DefaultCredential
    // when AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET environment variables are set
    let queueServiceClientWithToken: QueueServiceClient;
    try {
      queueServiceClientWithToken = getTokenBSU(recorder);
    } catch {
      // Requires bearer token for this case which cannot be generated in the runtime
      // Make sure this case passed in sanity test
      ctx.skip();
    }

    const tokenCredential = getTokenCredential();
    const token = (await tokenCredential.getToken(StorageOAuthScopes))?.token;
    const jwtObj = parseJwt(token!);

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await queueServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = queueServiceClient["credential"] as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueName,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        delegatedUserObjectId: jwtObj.oid,
        version: "2025-07-05",
      },
      userDelegationKey,
      accountName,
    ).toString();

    const sasClient = `${queueClient.url}?${queueSAS}`;
    const queueClientwithSAS = new QueueClient(sasClient, tokenCredential);
    configureStorageClient(recorder, queueClientwithSAS);

    await queueClientwithSAS.getProperties();
    await queueClient.delete();
  });

  it("QueueClient.generateUserDelegationSasUrl should work", async function (ctx) {
    // Try to get BlobServiceClient object with DefaultCredential
    // when AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET environment variables are set
    let queueServiceClientWithToken: QueueServiceClient;
    try {
      queueServiceClientWithToken = getTokenBSUWithDefaultCredential(recorder);
    } catch {
      // Requires bearer token for this case which cannot be generated in the runtime
      // Make sure this case passed in sanity test
      ctx.skip();
    }

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await queueServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const queueName = recorder.variable("queue", getUniqueName("queue"));
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const sasSignatureValues = {
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: QueueSASPermissions.parse("raup"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2025-07-05",
    };

    const queueSASUrl = queueClient.generateUserDelegationSasUrl(
      sasSignatureValues,
      userDelegationKey,
    );

    const queueClientwithSAS = new QueueClient(queueSASUrl);
    configureStorageClient(recorder, queueClientwithSAS);

    await queueClientwithSAS.getProperties();
    await queueClient.delete();

    const stringToSign = queueClient.generateUserDelegationStringToSign(
      sasSignatureValues,
      userDelegationKey,
    );

    const sharedKeyCredential = queueServiceClient["credential"] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const signature = new UserDelegationKeyCredential(
      accountName,
      userDelegationKey,
    ).computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(queueSASUrl));
  });
});
