// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { isNode, delay } from "@azure/core-http";
import { SpanGraph, setTracer } from "@azure/test-utils";
import { record, Recorder } from "@azure-tools/test-recorder";
import { setSpan, context } from "@azure/core-tracing";
import { assert } from "chai";

import { DataLakeDirectoryClient, DataLakeFileClient, DataLakeFileSystemClient } from "../src";
import { toPermissionsString } from "../src/transforms";
import {
  bodyToString,
  getDataLakeServiceClient,
  getEncryptionScope,
  recorderEnvSetup,
  sleep,
} from "./utils";
import { Context } from "mocha";
import { Test_CPK_INFO } from "./utils/fakeTestSecrets";

describe("DataLakePathClient", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("DataLakeFileClient create with meta data", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const metadata = {
      a: "a",
      b: "b",
    };

    await testFileClient.create({ metadata: metadata });
    const result = await testFileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("DataLakeFileClient create with permission and umark", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const permissionString = "0777";
    const umask = "0057";

    await testFileClient.create({ permissions: permissionString, umask: umask });
    const result = await testFileClient.getAccessControl();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(result.permissions, permissions);
  });

  it("DataLakeFileClient create with headers", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const httpHeader = {
      cacheControl: "control",
      contentEncoding: "encoding",
      contentLanguage: "language",
      contentDisposition: "disposition",
      contentType: "type/subtype",
    };

    await testFileClient.create({ pathHttpHeaders: httpHeader });
    const result = await testFileClient.getProperties();
    assert.equal(result.cacheControl, httpHeader.cacheControl);
    assert.equal(result.contentEncoding, httpHeader.contentEncoding);
    assert.equal(result.contentLanguage, httpHeader.contentLanguage);
    assert.equal(result.contentDisposition, httpHeader.contentDisposition);
    assert.equal(result.contentType, httpHeader.contentType);
  });

  it("DataLakeFileClient create with leaseId", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const leaseId = "25180729-00c9-42b0-938b-ecabce67a007";
    const leaseDuration = 20;

    await testFileClient.create({ proposedLeaseId: leaseId, leaseDuration: leaseDuration });
    const result = await testFileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
  });

  it("DataLakeFileClient create with relative expiry", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const timeToExpireInMs = 60 * 60 * 1000; // 1hour
    await testFileClient.create({ expiresOn: timeToExpireInMs });
    const result = await testFileClient.getProperties();
    assert.equal(result.createdOn!.getTime() + 1000 * 3600, result.expiresOn!.getTime());
  });

  it("DataLakeFileClient create with absolute expiry", async () => {
    const now = new Date();
    const recordedNow = recorder.newDate("now"); // Flaky workaround for the recording to work.
    const delta = 20 * 1000;
    const expiresOn = new Date(now.getTime() + delta);

    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    await testFileClient.create({ expiresOn: expiresOn });

    const result = await testFileClient.getProperties();
    const recordedExpiresOn = new Date(recordedNow.getTime() + delta);
    recordedExpiresOn.setMilliseconds(0); // milliseconds dropped
    assert.equal(result.expiresOn?.getTime(), recordedExpiresOn.getTime());

    await delay(delta);
    assert.ok(!(await testFileClient.exists()));
  });

  it("DataLakeFileClient create with all parameters", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };

    const permissionString = "0777";
    const umask = "0057";

    const httpHeader = {
      cacheControl: "control",
      contentEncoding: "encoding",
      contentLanguage: "language",
      contentDisposition: "disposition",
      contentType: "type/subtype",
    };
    const leaseId = "25180729-00c9-42b0-938b-ecabce67a007";
    const leaseDuration = 20;

    const timeToExpireInMs = 60 * 1000; // 60s

    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    await testFileClient.create({
      metadata: metadata,
      permissions: permissionString,
      umask: umask,
      pathHttpHeaders: httpHeader,
      proposedLeaseId: leaseId,
      leaseDuration: leaseDuration,
      expiresOn: timeToExpireInMs,
    });

    const result = await testFileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
    assert.equal(result.createdOn!.getTime() + 1000 * 60, result.expiresOn!.getTime());
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
    assert.equal(result.cacheControl, httpHeader.cacheControl);
    assert.equal(result.contentEncoding, httpHeader.contentEncoding);
    assert.equal(result.contentLanguage, httpHeader.contentLanguage);
    assert.equal(result.contentDisposition, httpHeader.contentDisposition);
    assert.equal(result.contentType, httpHeader.contentType);
    const aclResult = await testFileClient.getAccessControl();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(aclResult.permissions, permissions);
  });

  it("DataLakeFileClient createIfNotExists with default parameters", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);

    await testFileClient.createIfNotExists();
    assert.ok(await testFileClient.exists());
  });

  it("DataLakeFileClient createIfNotExists with meta data", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const metadata = {
      a: "a",
      b: "b",
    };

    await testFileClient.createIfNotExists({ metadata: metadata });
    const result = await testFileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("DataLakeFileClient createIfNotExists with permission and umark", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const permissionString = "0777";
    const umask = "0057";

    await testFileClient.createIfNotExists({ permissions: permissionString, umask: umask });
    const result = await testFileClient.getAccessControl();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(result.permissions, permissions);
  });

  it("DataLakeFileClient createIfNotExists with headers", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const httpHeader = {
      cacheControl: "control",
      contentEncoding: "encoding",
      contentLanguage: "language",
      contentDisposition: "disposition",
      contentType: "type/subtype",
    };

    await testFileClient.createIfNotExists({ pathHttpHeaders: httpHeader });
    const result = await testFileClient.getProperties();
    assert.equal(result.cacheControl, httpHeader.cacheControl);
    assert.equal(result.contentEncoding, httpHeader.contentEncoding);
    assert.equal(result.contentLanguage, httpHeader.contentLanguage);
    assert.equal(result.contentDisposition, httpHeader.contentDisposition);
    assert.equal(result.contentType, httpHeader.contentType);
  });

  it("DataLakeFileClient createIfNotExists with leaseId", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const leaseId = "25180729-00c9-42b0-938b-ecabce67a007";
    const leaseDuration = 20;

    await testFileClient.createIfNotExists({
      proposedLeaseId: leaseId,
      leaseDuration: leaseDuration,
    });
    const result = await testFileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
  });

  it("DataLakeFileClient createIfNotExists with relative expiry", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const timeToExpireInMs = 60 * 60 * 1000; // 1hour
    await testFileClient.createIfNotExists({ expiresOn: timeToExpireInMs });
    const result = await testFileClient.getProperties();
    assert.equal(result.createdOn!.getTime() + 1000 * 3600, result.expiresOn!.getTime());
  });

  it("DataLakeFileClient createIfNotExists with absolute expiry", async () => {
    const now = new Date();
    const recordedNow = recorder.newDate("now"); // Flaky workaround for the recording to work.
    const delta = 20 * 1000;
    const expiresOn = new Date(now.getTime() + delta);

    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    await testFileClient.createIfNotExists({ expiresOn: expiresOn });

    const result = await testFileClient.getProperties();
    const recordedExpiresOn = new Date(recordedNow.getTime() + delta);
    recordedExpiresOn.setMilliseconds(0); // milliseconds dropped
    assert.equal(result.expiresOn?.getTime(), recordedExpiresOn.getTime());

    await delay(delta);
    assert.ok(!(await testFileClient.exists()));
  });

  it("DataLakeDirectoryClient create with default parameters", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testdirClient = fileSystemClient.getDirectoryClient(testDirName);
    await testdirClient.create();
    assert.ok(await testdirClient.exists());
  });

  it("DataLakeDirectoryClient create with meta data", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const metadata = {
      a: "a",
      b: "b",
    };

    await testDirClient.create({ metadata: metadata });
    const result = await testDirClient.getProperties();
    assert.deepStrictEqual(result.metadata, {
      ...metadata,
      hdi_isfolder: "true",
    });
  });

  it("DataLakeDirectoryClient create with permission and umark", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const permissionString = "0777";
    const umask = "0057";

    await testDirClient.create({ permissions: permissionString, umask: umask });
    const result = await testDirClient.getAccessControl();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(result.permissions, permissions);
  });

  it("DataLakeDirectoryClient create with headers", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const httpHeader = {
      cacheControl: "control",
      contentEncoding: "encoding",
      contentLanguage: "language",
      contentDisposition: "disposition",
      contentType: "type/subtype",
    };

    await testDirClient.create({ pathHttpHeaders: httpHeader });
    const result = await testDirClient.getProperties();
    assert.equal(result.cacheControl, httpHeader.cacheControl);
    assert.equal(result.contentEncoding, httpHeader.contentEncoding);
    assert.equal(result.contentLanguage, httpHeader.contentLanguage);
    assert.equal(result.contentDisposition, httpHeader.contentDisposition);
    assert.equal(result.contentType, httpHeader.contentType);
  });

  it("DataLakeDirectoryClient create with leaseId", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const leaseId = "25180729-00c9-42b0-938b-ecabce67a007";
    const leaseDuration = 20;

    await testDirClient.create({ proposedLeaseId: leaseId, leaseDuration: leaseDuration });
    const result = await testDirClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
  });

  it("DataLakeDirectoryClient create with all parameters", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };

    const permissionString = "0777";
    const umask = "0057";

    const httpHeader = {
      cacheControl: "control",
      contentEncoding: "encoding",
      contentLanguage: "language",
      contentDisposition: "disposition",
      contentType: "type/subtype",
    };
    const leaseId = "25180729-00c9-42b0-938b-ecabce67a007";
    const leaseDuration = 20;

    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getFileClient(testDirName);
    await testDirClient.create({
      metadata: metadata,
      permissions: permissionString,
      umask: umask,
      pathHttpHeaders: httpHeader,
      proposedLeaseId: leaseId,
      leaseDuration: leaseDuration,
    });

    const result = await testDirClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
    assert.equal(result.cacheControl, httpHeader.cacheControl);
    assert.equal(result.contentEncoding, httpHeader.contentEncoding);
    assert.equal(result.contentLanguage, httpHeader.contentLanguage);
    assert.equal(result.contentDisposition, httpHeader.contentDisposition);
    assert.equal(result.contentType, httpHeader.contentType);
    const aclResult = await testDirClient.getAccessControl();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(aclResult.permissions, permissions);
  });

  it("DataLakeDirectoryClient create with relative expiry", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const timeToExpireInMs = 60 * 60 * 1000; // 1hour
    try {
      await testDirClient.create({ expiresOn: timeToExpireInMs });
      assert.fail("Creating directory with expiry should fail.");
    } catch (error) {
      assert.ok((error as any).message.includes("Set Expiry is not supported for a directory"));
    }
  });

  it("DataLakeDirectoryClient create with absolute expiry", async () => {
    const now = new Date();
    const delta = 20 * 1000;
    const expiresOn = new Date(now.getTime() + delta);

    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);

    try {
      await testDirClient.create({ expiresOn: expiresOn });
      assert.fail("Creating directory with expiry should fail.");
    } catch (error) {
      assert.ok((error as any).message.includes("Set Expiry is not supported for a directory"));
    }
  });

  it("DataLakeDirectoryClient createIfNotExists with default parameters", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testdirClient = fileSystemClient.getDirectoryClient(testDirName);
    await testdirClient.createIfNotExists();
    assert.ok(await testdirClient.exists());
  });

  it("DataLakeDirectoryClient createIfNotExists with meta data", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const metadata = {
      a: "a",
      b: "b",
    };

    await testDirClient.createIfNotExists({ metadata: metadata });
    const result = await testDirClient.getProperties();
    assert.deepStrictEqual(result.metadata, {
      ...metadata,
      hdi_isfolder: "true",
    });
  });

  it("DataLakeDirectoryClient createIfNotExists with permission and umark", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const permissionString = "0777";
    const umask = "0057";

    await testDirClient.createIfNotExists({ permissions: permissionString, umask: umask });
    const result = await testDirClient.getAccessControl();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(result.permissions, permissions);
  });

  it("DataLakeDirectoryClient createIfNotExists with headers", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const httpHeader = {
      cacheControl: "control",
      contentEncoding: "encoding",
      contentLanguage: "language",
      contentDisposition: "disposition",
      contentType: "type/subtype",
    };

    await testDirClient.createIfNotExists({ pathHttpHeaders: httpHeader });
    const result = await testDirClient.getProperties();
    assert.equal(result.cacheControl, httpHeader.cacheControl);
    assert.equal(result.contentEncoding, httpHeader.contentEncoding);
    assert.equal(result.contentLanguage, httpHeader.contentLanguage);
    assert.equal(result.contentDisposition, httpHeader.contentDisposition);
    assert.equal(result.contentType, httpHeader.contentType);
  });

  it("DataLakeDirectoryClient createIfNotExists with leaseId", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const leaseId = "25180729-00c9-42b0-938b-ecabce67a007";
    const leaseDuration = 20;

    await testDirClient.createIfNotExists({
      proposedLeaseId: leaseId,
      leaseDuration: leaseDuration,
    });
    const result = await testDirClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
  });

  it("DataLakeDirectoryClient createIfNotExists with relative expiry", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const timeToExpireInMs = 60 * 60 * 1000; // 1hour
    try {
      await testDirClient.createIfNotExists({ expiresOn: timeToExpireInMs });
      assert.fail("Creating directory with expiry should fail.");
    } catch (error) {
      assert.ok((error as any).message.includes("Set Expiry is not supported for a directory"));
    }
  });

  it("DataLakeDirectoryClient createIfNotExists with absolute expiry", async () => {
    const now = new Date();
    const delta = 20 * 1000;
    const expiresOn = new Date(now.getTime() + delta);

    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);

    try {
      await testDirClient.createIfNotExists({ expiresOn: expiresOn });
      assert.fail("Creating directory with expiry should fail.");
    } catch (error) {
      assert.ok((error as any).message.includes("Set Expiry is not supported for a directory"));
    }
  });

  it("read with with default parameters", async () => {
    const result = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("read should not have aborted error after read finishes", async () => {
    const aborter = new AbortController();
    const result = await fileClient.read(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("read all parameters set", async () => {
    // For browser scenario, please ensure CORS settings exposed headers: content-md5,x-ms-content-crc64
    // So JS can get contentCrc64 and contentMD5.
    const result1 = await fileClient.read(0, 1, {
      rangeGetContentCrc64: true,
    });
    assert.ok(result1.clientRequestId);
    // assert.ok(result1.contentCrc64!);
    assert.deepStrictEqual(await bodyToString(result1, 1), content[0]);
    assert.ok(result1.clientRequestId);

    const result2 = await fileClient.read(1, 1, {
      rangeGetContentMD5: true,
    });
    assert.ok(result2.clientRequestId);
    // assert.ok(result2.contentMD5!);

    let exceptionCaught = false;
    try {
      await fileClient.read(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true,
      });
    } catch (err: any) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);
    const result = await fileClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);

    await fileClient.setMetadata();
    const result2 = await fileClient.getProperties();
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHttpHeaders with default parameters", async () => {
    await fileClient.setHttpHeaders({});
    const result = await fileClient.getProperties();

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHttpHeaders with all parameters set", async () => {
    const headers = {
      cacheControl: "cacheControl",
      contentDisposition: "contentDisposition",
      contentEncoding: "contentEncoding",
      contentLanguage: "contentLanguage",
      contentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      contentType: "contentType",
    };
    await fileClient.setHttpHeaders(headers);
    const result = await fileClient.getProperties();
    assert.ok(result.date);

    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.cacheControl);
    assert.deepStrictEqual(result.contentType, headers.contentType);
    assert.deepStrictEqual(result.contentMD5, headers.contentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.contentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.contentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.contentDisposition);
  });

  it("delete", async () => {
    await fileClient.delete();
  });

  it("read with default parameters and tracing", async () => {
    const tracer = setTracer();

    const rootSpan = tracer.startSpan("root");

    const result = await fileClient.read(undefined, undefined, {
      tracingOptions: {
        tracingContext: setSpan(context.active(), rootSpan),
      },
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.DataLake.DataLakeFileClient-read",
              children: [
                {
                  name: "Azure.Storage.Blob.BlobClient-download",
                  children: [
                    {
                      name: "HTTP GET",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });

  it("verify fileName and fileSystemName passed to the client", async () => {
    const accountName = "myaccount";
    const path = "file/part/1.txt";
    const newClient = new DataLakeFileClient(
      `https://${accountName}.dfs.core.windows.net/` + fileSystemName + "/" + path
    );
    assert.equal(
      newClient.fileSystemName,
      fileSystemName,
      "File system name is not the same as the one provided."
    );
    assert.equal(newClient.name, path, "File name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  });

  it("append with acquire lease", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);
    const leaseId = "ca761232ed4211cebacd00aa0057b223";

    await tempFileClient.create();

    await tempFileClient.append(body, 0, body.length, {
      proposedLeaseId: leaseId,
      leaseDuration: 15,
      leaseAction: "acquire",
    });

    let gotError = false;
    try {
      await tempFileClient.append(body, body.length, body.length, {
        flush: true,
      });
    } catch (err) {
      gotError = true;
      assert.ok(
        (err as any).message.startsWith(
          "There is currently a lease on the resource and no lease ID was specified in the request."
        )
      );
    }
    assert.ok(gotError, "Should throw out an exception to write to a leased file without lease id");

    await tempFileClient.append(body, body.length, body.length, {
      conditions: {
        leaseId: leaseId,
      },
      flush: true,
    });

    const properties = await tempFileClient.getProperties();
    assert.equal(properties.contentLength, body.length * 2);
    assert.equal(properties.leaseState, "leased");
    assert.equal(properties.leaseDuration, "fixed");
    assert.equal(properties.leaseStatus, "locked");

    await sleep(15);
    await tempFileClient.delete();
  });

  it("append with auto-renew lease", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);
    const leaseId = "ca761232ed4211cebacd00aa0057b223";

    await tempFileClient.create({
      proposedLeaseId: leaseId,
      leaseDuration: 15,
    });

    const properties = await tempFileClient.getProperties();
    assert.equal(properties.leaseState, "leased");
    assert.equal(properties.leaseDuration, "fixed");
    assert.equal(properties.leaseStatus, "locked");

    await sleep(15);

    await tempFileClient.append(body, 0, body.length, {
      conditions: { leaseId: leaseId },
      leaseDuration: 15,
      leaseAction: "auto-renew",
    });

    let gotError = false;
    try {
      await tempFileClient.append(body, body.length, body.length, {
        flush: true,
      });
    } catch (err) {
      gotError = true;
      assert.ok(
        (err as any).message.startsWith(
          "There is currently a lease on the resource and no lease ID was specified in the request."
        )
      );
    }
    assert.ok(gotError, "Should throw out an exception to write to a leased file without lease id");

    await sleep(15);
    await tempFileClient.delete();
  });

  it("append with release lease", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);
    const leaseId = "ca761232ed4211cebacd00aa0057b223";

    await tempFileClient.create({
      proposedLeaseId: leaseId,
      leaseDuration: 15,
    });

    await tempFileClient.append(body, 0, body.length, {
      conditions: { leaseId: leaseId },
    });

    await tempFileClient.append(body, body.length, body.length, {
      conditions: { leaseId: leaseId },
      leaseAction: "release",
      flush: true,
    });

    const properties = await tempFileClient.getProperties();
    assert.equal(properties.leaseState, "available");
    assert.equal(properties.leaseStatus, "unlocked");

    await tempFileClient.delete();
  });

  it("flush with acquire lease", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);
    const leaseId = "ca761232ed4211cebacd00aa0057b223";

    await tempFileClient.create();

    await tempFileClient.append(body, 0, body.length);
    await tempFileClient.append(body, body.length, body.length);

    await tempFileClient.flush(body.length * 2, {
      proposedLeaseId: leaseId,
      leaseDuration: 15,
      leaseAction: "acquire",
    });

    let gotError = false;
    try {
      await tempFileClient.delete();
    } catch (err) {
      gotError = true;
      assert.ok(
        (err as any).message.startsWith(
          "There is currently a lease on the resource and no lease ID was specified in the request."
        )
      );
    }
    assert.ok(gotError, "Should throw out an exception to write to a leased file without lease id");

    const properties = await tempFileClient.getProperties();
    assert.equal(properties.contentLength, body.length * 2);
    assert.equal(properties.leaseState, "leased");
    assert.equal(properties.leaseDuration, "fixed");
    assert.equal(properties.leaseStatus, "locked");

    await sleep(15);
    await tempFileClient.delete();
  });

  it("flush with auto-renew lease", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);
    const leaseId = "ca761232ed4211cebacd00aa0057b223";

    await tempFileClient.create({
      proposedLeaseId: leaseId,
      leaseDuration: 15,
    });

    await tempFileClient.append(body, 0, body.length, {
      conditions: { leaseId: leaseId },
    });
    await tempFileClient.append(body, body.length, body.length, {
      conditions: { leaseId: leaseId },
    });

    await sleep(15);

    await tempFileClient.flush(body.length * 2, {
      conditions: { leaseId: leaseId },
      leaseDuration: 15,
      leaseAction: "auto-renew",
    });

    let gotError = false;
    try {
      await tempFileClient.delete();
    } catch (err) {
      gotError = true;
      assert.ok(
        (err as any).message.startsWith(
          "There is currently a lease on the resource and no lease ID was specified in the request."
        )
      );
    }
    assert.ok(gotError, "Should throw out an exception to write to a leased file without lease id");

    const properties = await tempFileClient.getProperties();
    assert.equal(properties.contentLength, body.length * 2);
    assert.equal(properties.leaseState, "leased");
    assert.equal(properties.leaseDuration, "fixed");
    assert.equal(properties.leaseStatus, "locked");

    await sleep(15);
    await tempFileClient.delete();
  });

  it("flush with release lease", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);
    const leaseId = "ca761232ed4211cebacd00aa0057b223";

    await tempFileClient.create({
      proposedLeaseId: leaseId,
      leaseDuration: 15,
    });

    await tempFileClient.append(body, 0, body.length, {
      conditions: { leaseId: leaseId },
    });
    await tempFileClient.append(body, body.length, body.length, {
      conditions: { leaseId: leaseId },
    });

    await tempFileClient.flush(body.length * 2, {
      conditions: { leaseId: leaseId },
      leaseAction: "release",
    });

    const properties = await tempFileClient.getProperties();
    assert.equal(properties.leaseState, "available");
    assert.equal(properties.leaseStatus, "unlocked");

    await tempFileClient.delete();
  });

  it("append with flush should work", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);

    await tempFileClient.create();

    await tempFileClient.append(body, 0, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });
    await tempFileClient.append(body, body.length, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });
    await tempFileClient.append(body, body.length * 2, body.length, {
      transactionalContentMD5: new Uint8Array([]),
      flush: true,
    });

    const properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, body.length * 3);

    await tempFileClient.delete();
  });

  it("append & flush should work", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);

    await tempFileClient.create();

    await tempFileClient.append(body, 0, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });
    await tempFileClient.append(body, body.length, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });
    await tempFileClient.append(body, body.length * 2, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });

    await tempFileClient.flush(body.length * 3);

    const properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, body.length * 3);

    await tempFileClient.delete();
  });

  it("append & flush should work with all parameters", async () => {
    const body = "HelloWorld";

    const tempFileName = recorder.getUniqueName("tempfile2");
    const tempFileClient = fileSystemClient.getFileClient(tempFileName);

    const permissions = {
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      other: { read: false, write: false, execute: false },
      stickyBit: false,
      extendedAcls: false,
    };
    const permissionsString = toPermissionsString(permissions);
    const metadata = {
      a: "val-a",
      b: "val-b",
    };
    let pathHttpHeaders = {
      cacheControl: "cacheControl",
      contentEncoding: "contentEncoding",
      contentLanguage: "contentLanguage",
      contentDisposition: "contentDisposition",
      contentType: "contentType",
    };
    await tempFileClient.create({
      permissions: permissionsString,
      metadata,
      umask: "0000",
      pathHttpHeaders,
    });

    let properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, 0);
    assert.deepStrictEqual(properties.cacheControl, pathHttpHeaders.cacheControl);
    assert.deepStrictEqual(properties.contentEncoding, pathHttpHeaders.contentEncoding);
    assert.deepStrictEqual(properties.contentLanguage, pathHttpHeaders.contentLanguage);
    assert.deepStrictEqual(properties.contentDisposition, pathHttpHeaders.contentDisposition);
    assert.deepStrictEqual(properties.contentType, pathHttpHeaders.contentType);
    assert.deepStrictEqual(properties.metadata, metadata);

    const acl = await tempFileClient.getAccessControl();
    assert.deepStrictEqual(acl.permissions, permissions);

    await tempFileClient.append(body, 0, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });
    await tempFileClient.append(body, body.length, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });
    await tempFileClient.append(body, body.length * 2, body.length, {
      transactionalContentMD5: new Uint8Array([]),
    });

    pathHttpHeaders = {
      cacheControl: "cacheControl2",
      contentEncoding: "contentEncoding2",
      contentLanguage: "contentLanguage2",
      contentDisposition: "contentDisposition2",
      contentType: "contentType2",
    };
    await tempFileClient.flush(body.length * 3, {
      retainUncommittedData: true,
      close: true,
      pathHttpHeaders,
    });

    properties = await tempFileClient.getProperties();
    assert.deepStrictEqual(properties.contentLength, body.length * 3);
    assert.deepStrictEqual(properties.cacheControl, pathHttpHeaders.cacheControl);
    assert.deepStrictEqual(properties.contentEncoding, pathHttpHeaders.contentEncoding);
    assert.deepStrictEqual(properties.contentLanguage, pathHttpHeaders.contentLanguage);
    assert.deepStrictEqual(properties.contentDisposition, pathHttpHeaders.contentDisposition);
    assert.deepStrictEqual(properties.contentType, pathHttpHeaders.contentType);
    assert.deepStrictEqual(properties.metadata, metadata);

    await tempFileClient.delete();
  });

  it("exists returns true on an existing file", async () => {
    const result = await fileClient.exists();
    assert.ok(result, "exists() should return true for an existing file");
  });

  it("exists returns false on non-existing file or directory", async () => {
    const newFileClient = fileSystemClient.getFileClient(recorder.getUniqueName("newFile"));
    const result = await newFileClient.exists();
    assert.ok(result === false, "exists() should return false for a non-existing file");

    const newDirectoryClient = fileSystemClient.getDirectoryClient(
      recorder.getUniqueName("newDirectory")
    );
    const dirResult = await newDirectoryClient.exists();
    assert.ok(dirResult === false, "exists() should return false for a non-existing directory");
  });

  it("DataLakeDirectoryClient-createIfNotExists", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const res = await directoryClient.createIfNotExists();
    assert.ok(res.succeeded);

    const res2 = await directoryClient.createIfNotExists();
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "PathAlreadyExists");
  });

  it("DataLakeFileClient-createIfNotExists", async () => {
    const res = await fileClient.createIfNotExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "PathAlreadyExists");
  });

  it("DataLakePathClient-deleteIfExists", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const res = await directoryClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "PathNotFound");

    await directoryClient.create();
    const res2 = await directoryClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("DataLakePathClient-deleteIfExists when parent not exists", async () => {
    const directoryName = recorder.getUniqueName("dir");
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const newFileClient = directoryClient.getFileClient(fileName);
    const res2 = await newFileClient.deleteIfExists();
    assert.ok(!res2.succeeded);
    assert.deepStrictEqual(res2.errorCode, "PathNotFound");
  });

  it("set expiry - NeverExpire", async () => {
    await fileClient.setExpiry("NeverExpire");
    const getRes = await fileClient.getProperties();
    assert.equal(getRes.expiresOn, undefined);
  });

  it("set expiry - Absolute", async () => {
    const now = new Date();
    const recordedNow = recorder.newDate("now"); // Flaky workaround for the recording to work.
    const delta = 5 * 1000;
    const expiresOn = new Date(now.getTime() + delta);
    await fileClient.setExpiry("Absolute", { expiresOn });

    const getRes = await fileClient.getProperties();
    const recordedExpiresOn = new Date(recordedNow.getTime() + delta);
    recordedExpiresOn.setMilliseconds(0); // milliseconds dropped
    assert.equal(getRes.expiresOn?.getTime(), recordedExpiresOn.getTime());

    await delay(delta);
    assert.ok(!(await fileClient.exists()));
  });

  it("set expiry - RelativeToNow", async () => {
    const delta = 1000;
    await fileClient.setExpiry("RelativeToNow", { timeToExpireInMs: delta });

    await delay(delta);
    assert.ok(!(await fileClient.exists()));
  });

  it("set expiry - RelativeToCreation", async () => {
    const delta = 1000 * 3600 + 0.12;
    await fileClient.setExpiry("RelativeToCreation", { timeToExpireInMs: delta });

    const getRes = await fileClient.getProperties();
    assert.equal(getRes.expiresOn?.getTime(), getRes.createdOn!.getTime() + Math.round(delta));
  });

  it("set expiry - override", async () => {
    const delta = 1000 * 3600;
    await fileClient.setExpiry("RelativeToCreation", { timeToExpireInMs: delta });

    const getRes = await fileClient.getProperties();
    assert.equal(getRes.expiresOn?.getTime(), getRes.createdOn!.getTime() + delta);

    await fileClient.setExpiry("NeverExpire");
    const getRes2 = await fileClient.getProperties();
    assert.equal(getRes2.expiresOn, undefined);
  });
});

describe("DataLakePathClient with CPK", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let dirName: string;
  let fileClient: DataLakeFileClient;
  let dirClient: DataLakeDirectoryClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
    dirName = recorder.getUniqueName("dir");
    dirClient = fileSystemClient.getDirectoryClient(dirName);
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("file create, append, flush and read with cpk", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient.append(content, 0, content.length, {
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient.flush(content.length, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const result = await fileClient.read(0, undefined, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("file getProperties with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    const result = await fileClient.getProperties({
      customerProvidedKey: Test_CPK_INFO,
    });

    assert.equal(result.contentLength, 0);
  });

  it("file getProperties without CPK on a file with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await fileClient.getProperties();
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }

    assert.ok(gotError, "Should got an error");
  });

  it("file getProperties with CPK on a file without CPK", async () => {
    await fileClient.create();

    let gotError = false;

    try {
      await fileClient.getProperties({
        customerProvidedKey: Test_CPK_INFO,
      });
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }

    assert.ok(gotError, "Should got an error");
  });

  it("file exists with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    assert.ok(
      await fileClient.exists({
        customerProvidedKey: Test_CPK_INFO,
      })
    );
  });

  it("file exists with CPK on a file without CPK", async () => {
    await fileClient.create();

    assert.ok(
      await fileClient.exists({
        customerProvidedKey: Test_CPK_INFO,
      })
    );
  });

  it("file exists without CPK on a file with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    assert.ok(await fileClient.exists());
  });

  it("file append with cpk to a file without CPK", async () => {
    await fileClient.create();

    let gotError = false;

    try {
      await fileClient.append(content, 0, content.length, {
        customerProvidedKey: Test_CPK_INFO,
      });
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }

    assert.ok(gotError, "Should got an error");
  });

  it("file append without cpk to a file with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await fileClient.append(content, 0, content.length);
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }

    assert.ok(gotError, "Should got an error");
  });

  it("file flush with cpk to a file without CPK", async () => {
    await fileClient.create();
    await fileClient.append(content, 0, content.length);

    let gotError = false;
    try {
      await fileClient.flush(content.length, {
        customerProvidedKey: Test_CPK_INFO,
      });
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("file flush without cpk to a file with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient.append(content, 0, content.length, {
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await fileClient.flush(content.length);
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("file read without cpk to a file with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient.append(content, 0, content.length, {
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient.flush(content.length, {
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await fileClient.read(0, undefined);
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("file read with cpk to a file without CPK", async () => {
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);

    let gotError = false;
    try {
      await fileClient.read(0, undefined, {
        customerProvidedKey: Test_CPK_INFO,
      });
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }

    assert.ok(gotError, "Should got an error");
  });

  it("file setMetadata with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata, {
      customerProvidedKey: Test_CPK_INFO,
    });
    const result = await fileClient.getProperties({
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("file setMetadata without cpk to a file with CPK", async () => {
    await fileClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await fileClient.setMetadata({});
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("file setMetadata with cpk to a file without CPK", async () => {
    await fileClient.create();

    let gotError = false;
    try {
      await fileClient.setMetadata(
        {},
        {
          customerProvidedKey: Test_CPK_INFO,
        }
      );
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("directory create and getProperties with CPK", async () => {
    await dirClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    await dirClient.getProperties({
      customerProvidedKey: Test_CPK_INFO,
    });
  });

  it("directory getProperties with CPK on a directory without CPK", async () => {
    await dirClient.create();

    let gotError = false;
    try {
      await dirClient.getProperties({
        customerProvidedKey: Test_CPK_INFO,
      });
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("directory getProperties without CPK on a directory with CPK", async () => {
    await dirClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await dirClient.getProperties();
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("directory exists with CPK", async () => {
    await dirClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.ok(
      await dirClient.exists({
        customerProvidedKey: Test_CPK_INFO,
      })
    );
  });

  it("directory exists with CPK on a directory without CPK", async () => {
    await dirClient.create();
    assert.ok(
      await dirClient.exists({
        customerProvidedKey: Test_CPK_INFO,
      })
    );
  });

  it("directory exists without CPK on a directory with CPK", async () => {
    await dirClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    assert.ok(await dirClient.exists());
  });

  it("directory setMetadata with CPK", async () => {
    await dirClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    const metadata = {
      a: "a",
      b: "b",
    };
    await dirClient.setMetadata(metadata, {
      customerProvidedKey: Test_CPK_INFO,
    });
    const result = await dirClient.getProperties({
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.deepStrictEqual(result.metadata, {
      ...metadata,
      hdi_isfolder: "true",
    });
  });

  it("directory setMetadata without cpk to a directory with CPK", async () => {
    await dirClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });

    let gotError = false;
    try {
      await dirClient.setMetadata({});
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });

  it("directory setMetadata with cpk to a directory without CPK", async () => {
    await dirClient.create();

    let gotError = false;
    try {
      await dirClient.setMetadata(
        {},
        {
          customerProvidedKey: Test_CPK_INFO,
        }
      );
    } catch (err: any) {
      gotError = true;
      assert.equal((err as any).statusCode, 409);
    }
    assert.ok(gotError, "Should got an error");
  });
});

describe("DataLakePathClient - Encryption Scope", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let encryptionScopeName: string;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });
  });

  afterEach(async function () {
    await fileSystemClient?.deleteIfExists();
    await recorder.stop();
  });

  it("DataLakeFileClient - getProperties should return Encryption Scope", async () => {
    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const result = await fileClient.getProperties();
    assert.equal(result.encryptionScope, encryptionScopeName);
  });

  it("DataLakeDirectoryClient - getProperties should return Encryption Scope", async () => {
    const dirName = recorder.getUniqueName("dir");
    const dirClient = fileSystemClient.getDirectoryClient(dirName);
    await dirClient.create();
    const result = await dirClient.getProperties();
    assert.equal(result.encryptionScope, encryptionScopeName);
  });
});
