// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  generateAccountSASQueryParameters,
  SASProtocol,
  ShareClient,
  ShareFileClient,
  ShareServiceClient,
} from "../../../src/index.js";
import { AnonymousCredential, UserDelegationKeyCredential } from "@azure/storage-common";
import type { StorageSharedKeyCredential } from "@azure/storage-common";
import { FileSASPermissions } from "../../../src/FileSASPermissions.js";
import { generateFileSASQueryParameters } from "../../../src/FileSASSignatureValues.js";
import { newPipeline } from "../../../src/Pipeline.js";
import { ShareSASPermissions } from "../../../src/ShareSASPermissions.js";
import { delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createTestCredential } from "@azure-tools/test-credential";
import { createShareServiceClient, createTokenServiceClient } from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { parseJwt, getSignatureFromSasUrl } from "../../utils/node/testHelpers.js";
import { ensureClientRecording } from "../../utils/recorder.js";
import { getAccountKey } from "../../utils/injectables.js";

describe.runIf(getAccountKey())("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClientOrUndefined = await createShareServiceClient("SharedKeyCredential", {
      recorder,
    });
    assert.isDefined(serviceClientOrUndefined);
    serviceClient = serviceClientOrUndefined;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.runIf(isLiveMode())(
    "GenerateUserDelegationSAS with skuoid should work for share",
    async () => {
      const fileServiceClientWithToken = await createTokenServiceClient(recorder);
      const tokenCredential = createTestCredential();
      const token = (await tokenCredential.getToken("https://storage.azure.com/.default"))?.token;
      assert.isDefined(token, "Token should be defined");
      const jwtObj = parseJwt(token);

      const now = new Date(recorder.variable("now", new Date().toISOString()));
      now.setHours(now.getHours() - 1);
      const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
      tmr.setDate(tmr.getDate() + 1);
      const userDelegationKey = await fileServiceClientWithToken.getUserDelegationKey(now, tmr);

      const sharedKeyCredential = serviceClient["credential"] as StorageSharedKeyCredential;

      const accountName = sharedKeyCredential.accountName;

      const shareName = getUniqueName("share", { recorder });
      const shareClient = serviceClient.getShareClient(shareName);
      await shareClient.create();

      const shareSAS = generateFileSASQueryParameters(
        {
          shareName: shareName,
          expiresOn: tmr,
          // ipRange: {
          //   start: "0000:0000:0000:0000:0000:000:000:0000",
          //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
          // },
          permissions: ShareSASPermissions.parse("rcwdl"),
          protocol: SASProtocol.HttpsAndHttp,
          startsOn: now,
          delegatedUserObjectId: jwtObj.oid,
          version: "2025-07-05",
        },
        userDelegationKey,
        accountName,
      ).toString();

      const sasClient = `${shareClient.url}?${shareSAS}`;
      const shareClientwithSAS = new ShareClient(sasClient, newPipeline(tokenCredential), {
        fileRequestIntent: "backup",
      });
      await ensureClientRecording(recorder, shareClientwithSAS);

      const result = (
        await shareClientwithSAS.getDirectoryClient("").listFilesAndDirectories().byPage().next()
      ).value;
      assert.ok(result.serviceEndpoint.length > 0);
      assert.deepStrictEqual(result.continuationToken, "");
      await shareClient.delete();
    },
  );

  it("ShareClient.generateUserDelegationSasUrl should work", async function () {
    const fileServiceClientWithToken = await createTokenServiceClient(recorder);
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await fileServiceClientWithToken.getUserDelegationKey(now, tmr);

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const sasSignatureValues = {
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: ShareSASPermissions.parse("rcwdl"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2025-07-05",
    };

    const shareSASUrl = shareClient.generateUserDelegationSasUrl(
      sasSignatureValues,
      userDelegationKey,
    );

    const shareClientwithSAS = new ShareClient(
      shareSASUrl,
      newPipeline(new AnonymousCredential()),
      {
        fileRequestIntent: "backup",
      },
    );
    await ensureClientRecording(recorder, shareClientwithSAS);

    const result = (
      await shareClientwithSAS.getDirectoryClient("").listFilesAndDirectories().byPage().next()
    ).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.deepStrictEqual(result.continuationToken, "");
    await shareClient.delete();

    const stringToSign = shareClient.generateUserDelegationStringToSign(
      sasSignatureValues,
      userDelegationKey,
    );

    const sharedKeyCredential = serviceClient["credential"] as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const signature = new UserDelegationKeyCredential(
      accountName,
      userDelegationKey,
    ).computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(shareSASUrl));
  });

  it.runIf(isLiveMode())("GenerateUserDelegationSAS with skuoid should work for file", async () => {
    const fileServiceClientWithToken = await createTokenServiceClient(recorder);
    const tokenCredential = createTestCredential();
    const token = (await tokenCredential.getToken("https://storage.azure.com/.default"))?.token;
    assert.isDefined(token, "Token should be defined");
    const jwtObj = parseJwt(token);

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await fileServiceClientWithToken.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = serviceClient["credential"] as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const directoryName = getUniqueName("dir", { recorder });
    const dirClient = shareClient.getDirectoryClient(directoryName);
    await dirClient.create();

    const fileName = getUniqueName("file", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024);

    const fileSas = generateFileSASQueryParameters(
      {
        shareName: shareName,
        filePath: fileClient.path,
        expiresOn: tmr,
        // ipRange: {
        //   start: "0000:0000:0000:0000:0000:000:000:0000",
        //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
        // },
        permissions: ShareSASPermissions.parse("rcwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        delegatedUserObjectId: jwtObj.oid,
        version: "2025-07-05",
      },
      userDelegationKey,
      accountName,
    ).toString();

    const sasClient = `${fileClient.url}?${fileSas}`;
    const fileClientwithSAS = new ShareFileClient(sasClient, newPipeline(tokenCredential), {
      fileRequestIntent: "backup",
    });
    await ensureClientRecording(recorder, fileClientwithSAS);

    await fileClientwithSAS.getProperties();
    await shareClient.delete();
  });

  it("FileClient.generateUserDelegationSasUrl should work", async function () {
    const fileServiceClientWithToken = await createTokenServiceClient(recorder);
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await fileServiceClientWithToken.getUserDelegationKey(now, tmr);

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const sasSignatureValues = {
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: ShareSASPermissions.parse("rcwd"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2025-07-05",
    };

    const shareSASUrl = shareClient.generateUserDelegationSasUrl(
      sasSignatureValues,
      userDelegationKey,
    );

    const shareClientwithSAS = new ShareClient(
      shareSASUrl,
      newPipeline(new AnonymousCredential()),
      {
        fileRequestIntent: "backup",
      },
    );
    await ensureClientRecording(recorder, shareClientwithSAS);

    const directoryName = getUniqueName("dir", { recorder });
    const dirClient = shareClientwithSAS.getDirectoryClient(directoryName);
    await dirClient.create();

    const fileName = getUniqueName("file", { recorder });
    const fileClient = shareClient.getDirectoryClient(directoryName).getFileClient(fileName);

    const fileSASUrl = fileClient.generateUserDelegationSasUrl(
      sasSignatureValues,
      userDelegationKey,
    );

    const stringToSign = fileClient.generateUserDelegationStringToSign(
      sasSignatureValues,
      userDelegationKey,
    );

    const fileClientwithSAS = new ShareFileClient(
      fileSASUrl,
      newPipeline(new AnonymousCredential()),
      {
        fileRequestIntent: "backup",
      },
    );
    await ensureClientRecording(recorder, fileClientwithSAS);

    await fileClientwithSAS.create(1024);
    await shareClient.delete();

    const sharedKeyCredential = serviceClient["credential"] as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;

    const signature = new UserDelegationKeyCredential(
      accountName,
      userDelegationKey,
    ).computeHMACSHA256(stringToSign);
    assert.deepEqual(signature, getSignatureFromSasUrl(fileSASUrl));
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

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

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL, newPipeline());
    await ensureClientRecording(recorder, serviceClientWithSAS);

    const result = (await serviceClientWithSAS.listShares().byPage().next()).value;
    assert.isAtLeast(result.shareItems?.length ?? 0, 0);
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];
    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential()),
    );
    await ensureClientRecording(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.isDefined(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btq").toString(),
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL);
    await ensureClientRecording(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.isDefined(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

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

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL);
    await ensureClientRecording(recorder, serviceClientWithSAS);

    let error;
    try {
      await serviceClientWithSAS.getProperties();
    } catch (err: any) {
      error = err;
    }

    assert.isDefined(error);
  });

  it("generateFileSASQueryParameters should work for share", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const shareSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ShareSASPermissions.parse("rcwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: shareClient.name,
        startsOn: now,
        version: "2018-03-28",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(sasURL);
    await ensureClientRecording(recorder, shareClientwithSAS);

    const dirURLwithSAS = shareClientwithSAS.getDirectoryClient("");
    const result = (await dirURLwithSAS.listFilesAndDirectories().byPage().next()).value;
    assert.isAtLeast(result.segment.directoryItems?.length ?? 0, 0);
    assert.isAtLeast(result.segment.fileItems?.length ?? 0, 0);

    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for file", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = getUniqueName("dir", { recorder });
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = getUniqueName("file", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const fileSAS = generateFileSASQueryParameters(
      {
        cacheControl: "cache-control-override",
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        filePath: fileClient.path,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSASPermissions.parse("rcwd"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: fileClient.shareName,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientwithSAS = new ShareFileClient(sasURL);
    await ensureClientRecording(recorder, fileClientwithSAS);

    const properties = await fileClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for share with access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = getUniqueName("dir", { recorder });
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = getUniqueName("file", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const id = "unique-id";
    await shareClient.setAccessPolicy([
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: ShareSASPermissions.parse("rcwdl").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a share, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://learn.microsoft.com/rest/api/storageservices/set-share-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(60 * 1000);

    const shareSAS = generateFileSASQueryParameters(
      {
        identifier: id,
        shareName,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${shareClient.url}?${shareSAS}`;
    const shareClientwithSAS = new ShareClient(sasURL, newPipeline(new AnonymousCredential()));
    await ensureClientRecording(recorder, shareClientwithSAS);

    const dirClientwithSAS = shareClientwithSAS.getDirectoryClient("");
    const result = (await dirClientwithSAS.listFilesAndDirectories().byPage().next()).value;
    assert.isAtLeast(result.segment.directoryItems?.length ?? 0, 0);
    assert.isAtLeast(result.segment.fileItems?.length ?? 0, 0);
    await shareClient.delete();
  });

  it("generateFileSASQueryParameters should work for file with access policy", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const sharedKeyCredential = serviceClient["credential"];

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = getUniqueName("dir", { recorder });
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = getUniqueName("file", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const id = "unique-id";
    await shareClient.setAccessPolicy([
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: FileSASPermissions.parse("rcwd").toString(),
          startsOn: now,
        },
        id,
      },
    ]);

    /*
     * When you establish a stored access policy on a share, it may take up to 30 seconds to take effect.
     * During this interval, a shared access signature that is associated with the stored access policy will
     * fail with status code 403 (Forbidden), until the access policy becomes active.
     * More details: https://learn.microsoft.com/rest/api/storageservices/set-share-acl
     * Note: delay in recorder module only take effect in live and recording mode.
     */
    await delay(45 * 1000);

    const fileSAS = generateFileSASQueryParameters(
      {
        identifier: id,
        shareName,
        filePath: fileClient.path,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new ShareFileClient(sasURL, newPipeline(new AnonymousCredential()));
    await ensureClientRecording(recorder, fileClientWithSAS);
    await fileClientWithSAS.getProperties();

    await shareClient.delete();
  });

  it("ShareServiceClient.generateAccountSasUrl should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("f").toString(),
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();
    const sasURL1 = `${serviceClient.url}?${sas}`;

    const sasURL = serviceClient.generateAccountSasUrl(
      tmr,
      AccountSASPermissions.parse("rwdlacup"),
      AccountSASResourceTypes.parse("sco").toString(),
      {
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31",
      },
    );
    assert.deepStrictEqual(sasURL, sasURL1);

    const serviceClientWithSAS = new ShareServiceClient(sasURL);
    await ensureClientRecording(recorder, serviceClientWithSAS);
    const result = (await serviceClientWithSAS.listShares().byPage().next()).value;
    assert.isAtLeast(result.shareItems?.length ?? 0, 0);
  });

  it("ShareServiceClient.generateAccountSasUrl should work with default parameters", async () => {
    const sasURL = serviceClient.generateAccountSasUrl();
    const serviceClientWithSAS = new ShareServiceClient(sasURL);
    await ensureClientRecording(recorder, serviceClientWithSAS);
    await serviceClientWithSAS.getProperties();

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      await serviceClientWithSAS.generateAccountSasUrl();
    } catch (err: any) {
      assert.instanceOf(err, RangeError);
      exceptionCaught = true;
    }
    assert.isDefined(exceptionCaught);
  });

  it("ShareCleint.generateSasUrl should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const shareSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: ShareSASPermissions.parse("rcwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: shareClient.name,
        startsOn: now,
        version: "2018-03-28",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );

    const sasURL1 = `${shareClient.url}?${shareSAS}`;
    const sasURL = shareClient.generateSasUrl({
      expiresOn: tmr,
      // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: ShareSASPermissions.parse("rcwdl"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2018-03-28",
    });
    assert.deepStrictEqual(sasURL, sasURL1);

    const shareClientwithSAS = new ShareClient(sasURL);
    await ensureClientRecording(recorder, shareClientwithSAS);
    const dirURLwithSAS = shareClientwithSAS.getDirectoryClient("");
    const result = (await dirURLwithSAS.listFilesAndDirectories().byPage().next()).value;
    assert.isAtLeast(result.segment.directoryItems?.length ?? 0, 0);
    assert.isAtLeast(result.segment.fileItems?.length ?? 0, 0);

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      shareClient.generateSasUrl({});
    } catch (err: any) {
      assert.instanceOf(err, RangeError);
      exceptionCaught = true;
    }
    assert.isDefined(exceptionCaught);

    await shareClient.delete();
  });

  it("ShareFileClient.generateSasUrl should work", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sharedKeyCredential = serviceClient["credential"];

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const dirName = getUniqueName("dir", { recorder });
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = getUniqueName("file", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024, {
      fileHttpHeaders: {
        fileContentType: "content-type-original",
      },
    });

    const fileSAS = generateFileSASQueryParameters(
      {
        cacheControl: "cache-control-override",
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        filePath: fileClient.path,
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSASPermissions.parse("rcwd"),
        protocol: SASProtocol.HttpsAndHttp,
        shareName: fileClient.shareName,
        startsOn: now,
        version: "2016-05-31",
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    );
    const sasURL1 = `${fileClient.url}?${fileSAS}`;

    const sasURL = fileClient.generateSasUrl({
      cacheControl: "cache-control-override",
      contentDisposition: "content-disposition-override",
      contentEncoding: "content-encoding-override",
      contentLanguage: "content-language-override",
      contentType: "content-type-override",
      expiresOn: tmr,
      // ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: FileSASPermissions.parse("rcwd"),
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: now,
      version: "2016-05-31",
    });
    assert.deepStrictEqual(sasURL1, sasURL);

    const fileClientwithSAS = new ShareFileClient(sasURL);
    await ensureClientRecording(recorder, fileClientwithSAS);
    const properties = await fileClientwithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    // Should throw with client constructed with an Anonymous credential.
    let exceptionCaught = false;
    try {
      fileClient.generateSasUrl({});
    } catch (err: any) {
      assert.instanceOf(err, RangeError);
      exceptionCaught = true;
    }
    assert.isDefined(exceptionCaught);

    await shareClient.delete();
  });

  it("rename file - source and destination with different SAS", async () => {
    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const sourceFileName = getUniqueName("sourcefile", { recorder });
    const sourceFileClient = shareClient.getDirectoryClient("").getFileClient(sourceFileName);
    await sourceFileClient.create(1024);

    const sourceUrl = shareClient.generateSasUrl({
      permissions: ShareSASPermissions.parse("r"),
      expiresOn: tmr,
    });

    const sasShareClient = new ShareClient(sourceUrl);
    await ensureClientRecording(recorder, sasShareClient);
    const sasSourceFileClient = sasShareClient.getDirectoryClient("").getFileClient(sourceFileName);

    const destFileName = getUniqueName("destfile", { recorder });
    const destFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await destFileClient.create(2048);

    const sharedKeyCredential = serviceClient["credential"];
    const destSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: FileSASPermissions.parse("w"),
        shareName: shareName,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const result = await sasSourceFileClient.rename(destFileName + "?" + destSAS, {
      replaceIfExists: true,
    });

    assert.strictEqual(
      result.destinationFileClient.name,
      destFileName,
      "Destination name should be expected",
    );

    try {
      await sourceFileClient.getProperties();
      assert.fail("Source file should not exist anymore");
    } catch (err: any) {
      assert.strictEqual(err.statusCode as number, 404, "Source file should not exist anymore");
    }
  });

  it("rename directory - source and destination with different SAS", async () => {
    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const sourceDirName = getUniqueName("sourcedir", { recorder });
    const sourceDirClient = shareClient.getDirectoryClient(sourceDirName);
    await sourceDirClient.create();

    const shareSASUrl = shareClient.generateSasUrl({
      permissions: ShareSASPermissions.parse("r"),
      expiresOn: tmr,
    });

    const sasShareClient = new ShareClient(shareSASUrl);
    await ensureClientRecording(recorder, sasShareClient);
    const sasSourceDirClient = sasShareClient.getDirectoryClient(sourceDirName);

    const destFileName = getUniqueName("destfile", { recorder });
    const destFileClient = shareClient.getDirectoryClient("").getFileClient(destFileName);
    await destFileClient.create(2048);

    const sharedKeyCredential = serviceClient["credential"];
    const destSAS = generateFileSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: FileSASPermissions.parse("w"),
        shareName: shareName,
      },
      sharedKeyCredential as StorageSharedKeyCredential,
    ).toString();

    const result = await sasSourceDirClient.rename(destFileName + "?" + destSAS, {
      replaceIfExists: true,
    });

    assert.strictEqual(
      result.destinationDirectoryClient.name,
      destFileName,
      "Destination name should be expected",
    );

    assert.isFalse(await sourceDirClient.exists(), "Source directory should not exist anymore");
  });

  it("create share with invalid SAS should fail", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() - 1);

    const sharedKeyCredential = serviceClient["credential"];

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

    const sasURL = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new ShareServiceClient(sasURL, newPipeline());
    await ensureClientRecording(recorder, serviceClientWithSAS);

    const shareName = getUniqueName("share", { recorder });
    const shareClient = serviceClientWithSAS.getShareClient(shareName);
    try {
      await shareClient.create();
    } catch (err) {
      assert.isTrue(
        (err as any).details.authenticationErrorDetail.startsWith("Signed expiry time"),
      );
    }
  });
});
