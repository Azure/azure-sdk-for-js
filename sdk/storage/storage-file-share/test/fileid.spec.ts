// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, expect } from "vitest";
import {
  ShareClient,
  ShareDirectoryClient,
  ShareFileClient,
  ShareLeaseClient,
} from "../src/index.js";
import { base64encode } from "./utils/testutils.common.js";

const shareUrl = "https://account.file.core.windows.net/share";
const snapshot = "2026-10-07T00:00:00.0000000Z";

// Records each request the client sends and answers with the given response.
function respondWith(
  client: ShareFileClient | ShareDirectoryClient,
  requests: PipelineRequest[],
  status: number,
  headers: Record<string, string> = {},
  bodyAsText?: string,
): void {
  const pipeline: Pipeline = (client as any).storageClientContext.client.pipeline;
  pipeline.addPolicy(
    {
      name: "fakeServicePolicy",
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        requests.push(request);
        return { request, status, headers: createHttpHeaders(headers), bodyAsText };
      },
    },
    { afterPhase: "Sign" },
  );
}

// Browsers add a cache-busting `_` query parameter to GET and HEAD requests.
function requestUrl(request: PipelineRequest): string {
  const url = new URL(request.url);
  url.searchParams.delete("_");
  return url.toString();
}

describe("File ID addressing - clients", () => {
  let shareClient: ShareClient;

  beforeEach(() => {
    shareClient = new ShareClient(shareUrl);
  });

  it("getShareFileClient addresses the file by its file ID", () => {
    const fileClient = shareClient.getShareFileClient("13835128424026472451");

    assert.equal(fileClient.url, `${shareUrl}?fileid=13835128424026472451`);
    assert.equal(fileClient.fileId, "13835128424026472451");
    assert.equal(fileClient.shareName, "share");
    assert.equal(fileClient.name, "");
    assert.equal(fileClient.path, "");
  });

  it("getShareDirectoryClient addresses the directory by its file ID", () => {
    const directoryClient = shareClient.getShareDirectoryClient("13835128424026472452");

    assert.equal(directoryClient.url, `${shareUrl}?fileid=13835128424026472452`);
    assert.equal(directoryClient.fileId, "13835128424026472452");
    assert.equal(directoryClient.shareName, "share");
    assert.equal(directoryClient.name, "");
    assert.equal(directoryClient.path, "");
  });

  it("keeps the share's SAS and snapshot and drops a trailing slash", () => {
    const sasShareClient = new ShareClient(`${shareUrl}/?sv=2026-10-06&sig=signature`).withSnapshot(
      snapshot,
    );
    const url = new URL(sasShareClient.getShareFileClient("123").url);

    assert.equal(url.pathname, "/share");
    assert.equal(url.searchParams.get("sv"), "2026-10-06");
    assert.equal(url.searchParams.get("sig"), "signature");
    assert.equal(url.searchParams.get("sharesnapshot"), snapshot);
    assert.equal(url.searchParams.get("fileid"), "123");
  });

  it("rejects an empty file ID", () => {
    for (const fileId of ["", "  "]) {
      assert.throws(() => shareClient.getShareFileClient(fileId), RangeError);
      assert.throws(() => shareClient.getShareDirectoryClient(fileId), RangeError);
    }
  });

  it("drops every trailing slash of the share URL", () => {
    const url = new URL(new ShareClient(`${shareUrl}///`).getShareFileClient("123").url);

    assert.equal(url.pathname, "/share");
    assert.equal(url.searchParams.get("fileid"), "123");
  });

  it("encodes the file ID in the URL", () => {
    const fileClient = shareClient.getShareFileClient("1&comp=list#x");
    const url = new URL(fileClient.url);

    assert.equal(url.searchParams.get("fileid"), "1&comp=list#x");
    assert.isNull(url.searchParams.get("comp"));
    assert.equal(url.hash, "");
    assert.equal(fileClient.fileId, "1&comp=list#x");
  });

  it("constructors detect a file ID in the URL, whatever the case of the parameter name", () => {
    const fileClient = new ShareFileClient(`${shareUrl}?FileId=123`);
    const directoryClient = new ShareDirectoryClient(`${shareUrl}?FILEID=456`);

    assert.equal(fileClient.fileId, "123");
    assert.equal(fileClient.name, "");
    assert.equal(fileClient.path, "");
    assert.equal(directoryClient.fileId, "456");
    assert.equal(directoryClient.name, "");
    assert.equal(directoryClient.path, "");
  });

  it("clients addressed by path have no file ID", () => {
    const fileClient = new ShareFileClient(`${shareUrl}/dir/file`);
    const directoryClient = new ShareDirectoryClient(`${shareUrl}/dir?fileid=`);

    assert.isUndefined(fileClient.fileId);
    assert.equal(fileClient.name, "file");
    assert.equal(fileClient.path, "dir/file");
    assert.isUndefined(directoryClient.fileId);
    assert.equal(directoryClient.name, "dir");
    assert.equal(new ShareFileClient(`${shareUrl}?fileid=&FileId=123`).fileId, "123");
  });

  it("withShareSnapshot keeps the file ID", () => {
    const fileClient = shareClient.getShareFileClient("123").withShareSnapshot(snapshot);
    const url = new URL(fileClient.url);

    assert.equal(fileClient.fileId, "123");
    assert.equal(url.searchParams.get("fileid"), "123");
    assert.equal(url.searchParams.get("sharesnapshot"), snapshot);
  });
});

describe("File ID addressing - unsupported members", () => {
  const notSupported = "is not supported when the client addresses the resource by file ID.";
  let fileClient: ShareFileClient;
  let directoryClient: ShareDirectoryClient;
  let requests: PipelineRequest[];

  beforeEach(() => {
    requests = [];
    fileClient = new ShareClient(shareUrl).getShareFileClient("123");
    directoryClient = new ShareClient(shareUrl).getShareDirectoryClient("456");
    respondWith(fileClient, requests, 200);
    respondWith(directoryClient, requests, 200);
  });

  const fileMembers: Array<[string, (client: ShareFileClient) => unknown]> = [
    ["create", (c) => c.create(1)],
    ["download", (c) => c.download()],
    ["exists", (c) => c.exists()],
    ["setProperties", (c) => c.setProperties()],
    ["delete", (c) => c.delete()],
    ["deleteIfExists", (c) => c.deleteIfExists()],
    ["setHttpHeaders", (c) => c.setHttpHeaders()],
    ["resize", (c) => c.resize(1)],
    ["setMetadata", (c) => c.setMetadata()],
    ["uploadRange", (c) => c.uploadRange("a", 0, 1)],
    ["uploadRangeFromURL", (c) => c.uploadRangeFromURL(`${shareUrl}/source`, 0, 0, 1)],
    ["clearRange", (c) => c.clearRange(0, 1)],
    ["getRangeList", (c) => c.getRangeList()],
    ["getRangeListDiff", (c) => c.getRangeListDiff(snapshot)],
    ["listRanges", (c) => c.listRanges()],
    ["listRangesDiff", (c) => c.listRangesDiff(snapshot)],
    ["startCopyFromURL", (c) => c.startCopyFromURL(`${shareUrl}/source`)],
    ["abortCopyFromURL", (c) => c.abortCopyFromURL("copyId")],
    ["uploadData", (c) => c.uploadData(new Uint8Array(1))],
    ["uploadFile", (c) => c.uploadFile("file.txt")],
    ["uploadSeekableBlob", (c) => c.uploadSeekableBlob(() => undefined as any, 1)],
    ["uploadResetableStream", (c) => c.uploadResetableStream(() => undefined as any, 1)],
    ["downloadToBuffer", (c) => c.downloadToBuffer()],
    ["uploadStream", (c) => c.uploadStream(undefined as any, 1, 1, 1)],
    ["downloadToFile", (c) => c.downloadToFile("file.txt")],
    ["listHandles", (c) => c.listHandles()],
    ["forceCloseAllHandles", (c) => c.forceCloseAllHandles()],
    ["forceCloseHandle", (c) => c.forceCloseHandle("handleId")],
    ["createHardLink", (c) => c.createHardLink("dir/target")],
    ["createSymbolicLink", (c) => c.createSymbolicLink("target")],
    ["getSymbolicLink", (c) => c.getSymbolicLink()],
    ["getShareLeaseClient", (c) => c.getShareLeaseClient()],
    ["generateSasUrl", (c) => c.generateSasUrl({})],
    ["generateSasStringToSign", (c) => c.generateSasStringToSign({})],
    ["generateUserDelegationSasUrl", (c) => c.generateUserDelegationSasUrl({}, {} as any)],
    [
      "generateUserDelegationStringToSign",
      (c) => c.generateUserDelegationStringToSign({}, {} as any),
    ],
    ["rename", (c) => c.rename("dir/newname")],
  ];

  const directoryMembers: Array<[string, (client: ShareDirectoryClient) => unknown]> = [
    ["create", (c) => c.create()],
    ["createIfNotExists", (c) => c.createIfNotExists()],
    ["setProperties", (c) => c.setProperties()],
    ["getDirectoryClient", (c) => c.getDirectoryClient("subdir")],
    ["createSubdirectory", (c) => c.createSubdirectory("subdir")],
    ["deleteSubdirectory", (c) => c.deleteSubdirectory("subdir")],
    ["createFile", (c) => c.createFile("file", 1)],
    ["deleteFile", (c) => c.deleteFile("file")],
    ["getFileClient", (c) => c.getFileClient("file")],
    ["exists", (c) => c.exists()],
    ["delete", (c) => c.delete()],
    ["deleteIfExists", (c) => c.deleteIfExists()],
    ["setMetadata", (c) => c.setMetadata()],
    ["listFilesAndDirectories", (c) => c.listFilesAndDirectories()],
    ["listHandles", (c) => c.listHandles()],
    ["forceCloseAllHandles", (c) => c.forceCloseAllHandles()],
    ["forceCloseHandle", (c) => c.forceCloseHandle("handleId")],
    ["rename", (c) => c.rename("newdir")],
  ];

  for (const [name, call] of fileMembers) {
    it(`ShareFileClient.${name} throws without sending a request`, async () => {
      await expect((async () => call(fileClient))()).rejects.toThrow(`${name} ${notSupported}`);
      assert.lengthOf(requests, 0);
    });
  }

  for (const [name, call] of directoryMembers) {
    it(`ShareDirectoryClient.${name} throws without sending a request`, async () => {
      await expect((async () => call(directoryClient))()).rejects.toThrow(
        `${name} ${notSupported}`,
      );
      assert.lengthOf(requests, 0);
    });
  }

  it("ShareLeaseClient can't be created for a file client addressed by file ID", () => {
    assert.throws(() => new ShareLeaseClient(fileClient), `ShareLeaseClient ${notSupported}`);
  });

  it("getFileLinks throws on a file client addressed by path without sending a request", async () => {
    const pathClient = new ShareFileClient(`${shareUrl}/dir/file`);
    respondWith(pathClient, requests, 200);

    await expect(pathClient.getFileLinks()).rejects.toThrow(
      "getFileLinks is only supported when the client addresses the resource by file ID.",
    );
    assert.lengthOf(requests, 0);
  });
});

describe("File ID addressing - requests", () => {
  let shareClient: ShareClient;
  let requests: PipelineRequest[];

  const linkHeaders: Record<string, string> = {
    "content-type": "application/xml",
    "last-modified": "Wed, 07 Oct 2026 01:02:03 GMT",
    etag: '"0x8DE0000000000001"',
    "x-ms-type": "File",
    "x-ms-meta-color": "blue",
    "x-ms-content-type": "text/plain",
    "x-ms-content-length": "1024",
    "x-ms-content-md5": base64encode(String.fromCharCode(1, 2, 3, 4)),
    "x-ms-content-encoding": "gzip",
    "x-ms-content-language": "en-US",
    "x-ms-cache-control": "no-cache",
    "x-ms-content-disposition": "attachment",
    "x-ms-server-encrypted": "true",
    "x-ms-file-attributes": "Archive",
    "x-ms-file-creation-time": "2026-10-07T01:02:03.0000000Z",
    "x-ms-file-last-write-time": "2026-10-07T01:02:04.0000000Z",
    "x-ms-file-change-time": "2026-10-07T01:02:05.0000000Z",
    "x-ms-file-permission-key": "1234567890*987654321",
    "x-ms-request-id": "request-id",
    "x-ms-version": "2027-03-07",
    date: "Wed, 07 Oct 2026 01:02:06 GMT",
    "x-ms-file-id": "123",
    "x-ms-file-parent-id": "456",
    "x-ms-file-name": "report.csv",
    "x-ms-lease-duration": "infinite",
    "x-ms-lease-state": "leased",
    "x-ms-lease-status": "locked",
    "x-ms-mode": "0640",
    "x-ms-owner": "1000",
    "x-ms-group": "1001",
    "x-ms-file-file-type": "Regular",
    "x-ms-link-count": "2",
  };

  beforeEach(() => {
    shareClient = new ShareClient(shareUrl);
    requests = [];
  });

  it("file getProperties sends HEAD to the share URL with the file ID and returns fileName", async () => {
    const fileClient = shareClient.getShareFileClient("123");
    respondWith(fileClient, requests, 200, {
      "x-ms-type": "File",
      "content-length": "1024",
      "x-ms-file-id": "123",
      "x-ms-file-parent-id": "456",
      "x-ms-file-name": "my%20report.csv",
    });

    const properties = await fileClient.getProperties();

    assert.equal(requests[0].method, "HEAD");
    assert.equal(requestUrl(requests[0]), `${shareUrl}?fileid=123`);
    assert.equal(properties.fileName, "my%20report.csv");
    assert.equal(properties.fileId, "123");
    assert.equal(properties.fileParentId, "456");
    assert.equal(properties.contentLength, 1024);
  });

  it("directory getProperties sends restype=directory with the file ID and returns fileName", async () => {
    const directoryClient = shareClient.getShareDirectoryClient("456");
    respondWith(directoryClient, requests, 200, {
      "x-ms-file-id": "456",
      "x-ms-file-parent-id": "0",
      "x-ms-file-name": "reports",
    });

    const properties = await directoryClient.getProperties();

    assert.equal(requests[0].method, "GET");
    assert.equal(requestUrl(requests[0]), `${shareUrl}?fileid=456&restype=directory`);
    assert.equal(properties.fileName, "reports");
    assert.equal(properties.fileId, "456");
    assert.equal(properties.fileParentId, "0");
  });

  it("getFileLinks returns the file's properties and its links", async () => {
    const fileClient = shareClient.getShareFileClient("123");
    respondWith(
      fileClient,
      requests,
      200,
      linkHeaders,
      '<?xml version="1.0" encoding="utf-8"?><HardLinks>' +
        "<HardLink><FileName>report.csv</FileName><ParentId>456</ParentId></HardLink>" +
        '<HardLink><FileName Encoded="true">a+b%20c%EF%BF%BE.txt</FileName><ParentId>0</ParentId></HardLink>' +
        "</HardLinks>",
    );

    const result = await fileClient.getFileLinks();

    assert.equal(requests[0].method, "GET");
    assert.equal(requestUrl(requests[0]), `${shareUrl}?fileid=123&comp=hardlinks`);
    assert.deepEqual(result.links, [
      { name: "report.csv", parentId: "456" },
      { name: "a+b c\uFFFE.txt", parentId: "0" },
    ]);
    assert.equal(result.contentType, "text/plain");
    assert.equal(result.contentLength, 1024);
    assert.deepEqual(result.contentMD5, new Uint8Array([1, 2, 3, 4]));
    assert.equal(result.contentEncoding, "gzip");
    assert.equal(result.contentLanguage, "en-US");
    assert.equal(result.cacheControl, "no-cache");
    assert.equal(result.contentDisposition, "attachment");
    assert.deepEqual(result.metadata, { color: "blue" });
    assert.strictEqual(result.isServerEncrypted, true);
    assert.equal(result.fileAttributes, "Archive");
    assert.equal(result.fileCreatedOn?.toISOString(), "2026-10-07T01:02:03.000Z");
    assert.equal(result.fileLastWriteOn?.toISOString(), "2026-10-07T01:02:04.000Z");
    assert.equal(result.fileChangeOn?.toISOString(), "2026-10-07T01:02:05.000Z");
    assert.equal(result.filePermissionKey, "1234567890*987654321");
    assert.equal(result.requestId, "request-id");
    assert.equal(result.version, "2027-03-07");
    assert.equal(result.date?.toISOString(), "2026-10-07T01:02:06.000Z");
    assert.equal(result.fileId, "123");
    assert.equal(result.fileParentId, "456");
    assert.equal(result.fileName, "report.csv");
    assert.equal(result.fileType, "File");
    assert.equal(result.etag, '"0x8DE0000000000001"');
    assert.equal(result.lastModified?.toISOString(), "2026-10-07T01:02:03.000Z");
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
    assert.equal(result.posixProperties?.owner, "1000");
    assert.equal(result.posixProperties?.group, "1001");
    assert.equal(result.posixProperties?.fileType, "Regular");
    assert.strictEqual(result.posixProperties?.linkCount, 2);
    assert.deepEqual(result.posixProperties?.fileMode?.owner, {
      read: true,
      write: true,
      execute: false,
    });
    assert.deepEqual(result.posixProperties?.fileMode?.group, {
      read: true,
      write: false,
      execute: false,
    });
    assert.deepEqual(result.posixProperties?.fileMode?.other, {
      read: false,
      write: false,
      execute: false,
    });
    assert.equal(result._response.parsedHeaders.contentType, "text/plain");
    assert.equal(result._response.parsedHeaders.contentLength, 1024);
    assert.isTrue(result._response.parsedHeaders.isServerEncrypted);
    assert.notProperty(result._response.parsedHeaders, "_response");
    assert.notProperty(result._response.parsedHeaders, "hardLinks");
    assert.deepEqual(result._response.parsedBody, result.links);
  });

  it("getFileLinks returns isServerEncrypted false", async () => {
    const fileClient = shareClient.getShareFileClient("123");
    respondWith(
      fileClient,
      requests,
      200,
      { ...linkHeaders, "x-ms-server-encrypted": "False" },
      "<HardLinks />",
    );

    const result = await fileClient.getFileLinks();

    assert.strictEqual(result.isServerEncrypted, false);
  });

  it("getFileLinks returns an empty list when the service returns no links", async () => {
    const fileClient = shareClient.getShareFileClient("123");
    respondWith(fileClient, requests, 200, linkHeaders, "<HardLinks />");

    const result = await fileClient.getFileLinks();

    assert.deepEqual(result.links, []);
  });

  it("getFileLinks doesn't return the XML body's content type as the file's", async () => {
    const fileClient = shareClient.getShareFileClient("123");
    const headers = { ...linkHeaders };
    delete headers["x-ms-content-type"];
    respondWith(fileClient, requests, 200, headers, "<HardLinks />");

    const result = await fileClient.getFileLinks();

    assert.isUndefined(result.contentType);
    assert.isUndefined(result._response.parsedHeaders.contentType);
  });

  it("getFileLinks returns a single link as a list", async () => {
    const fileClient = shareClient.getShareFileClient("123");
    respondWith(
      fileClient,
      requests,
      200,
      linkHeaders,
      "<HardLinks><HardLink><FileName>report.csv</FileName><ParentId>0</ParentId></HardLink></HardLinks>",
    );

    const result = await fileClient.getFileLinks();

    assert.deepEqual(result.links, [{ name: "report.csv", parentId: "0" }]);
  });

  it("getFileLinks sends the lease ID and the share snapshot", async () => {
    const fileClient = shareClient.withSnapshot(snapshot).getShareFileClient("123");
    respondWith(
      fileClient,
      requests,
      200,
      linkHeaders,
      "<HardLinks><HardLink><FileName>report.csv</FileName><ParentId>0</ParentId></HardLink></HardLinks>",
    );

    await fileClient.getFileLinks({ leaseAccessConditions: { leaseId: "lease-id" } });

    const url = new URL(requests[0].url);
    assert.equal(url.searchParams.get("fileid"), "123");
    assert.equal(url.searchParams.get("sharesnapshot"), snapshot);
    assert.equal(url.searchParams.get("comp"), "hardlinks");
    assert.equal(requests[0].headers.get("x-ms-lease-id"), "lease-id");
  });

  it("clients created by file ID send the share's request intent", async () => {
    const intentShareClient = (): ShareClient =>
      new ShareClient(shareUrl, undefined, { fileRequestIntent: "backup" });
    const fileClient = intentShareClient().getShareFileClient("123");
    respondWith(fileClient, requests, 200, linkHeaders, "<HardLinks />");
    const snapshotClient = intentShareClient()
      .getShareFileClient("123")
      .withShareSnapshot(snapshot);
    respondWith(snapshotClient, requests, 200, { "x-ms-type": "File" });
    const directoryClient = intentShareClient().getShareDirectoryClient("456");
    respondWith(directoryClient, requests, 200);

    await fileClient.getFileLinks();
    await snapshotClient.getProperties();
    await directoryClient.getProperties();

    assert.lengthOf(requests, 3);
    for (const request of requests) {
      assert.equal(request.headers.get("x-ms-file-request-intent"), "backup");
    }
  });
});
