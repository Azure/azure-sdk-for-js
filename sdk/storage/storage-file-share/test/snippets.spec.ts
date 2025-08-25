// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { ShareServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-share";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "<connection string>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const shareServiceClient = ShareServiceClient.fromConnectionString(connectionString);
  });

  it("ReadmeSampleCreateClient_StorageSharedKeyCredential", async () => {
    // Enter your storage account name and shared key
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const credential = new StorageSharedKeyCredential(account, accountKey);
    // @ts-ignore
    const serviceClient = new ShareServiceClient(
      // When using AnonymousCredential, following url should include a valid SAS
      `https://${account}.file.core.windows.net`,
      credential,
    );
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const serviceClientWithSAS = new ShareServiceClient(
      `https://${account}.file.core.windows.net?${sas}`,
    );
  });

  it("ReadmeSampleListShares", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    let i = 1;
    for await (const share of serviceClient.listShares()) {
      console.log(`Share${i++}: ${share.name}`);
    }
  });

  it("ReadmeSampleListShares_Iterator", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareIter = serviceClient.listShares();
    let i = 1;
    let { value, done } = await shareIter.next();
    while (!done) {
      console.log(`Share ${i++}: ${value.name}`);
      ({ value, done } = await shareIter.next());
    }
  });

  it("ReadmeSampleListShares_ByPage", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    let i = 1;
    for await (const response of serviceClient.listShares().byPage({ maxPageSize: 20 })) {
      console.log(`Page ${i++}:`);
      for (const share of response.shareItems || []) {
        console.log(`\tShare: ${share.name}`);
      }
    }
  });

  it("ReadmeSampleListShares_Continuation", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    let iterator = serviceClient.listShares().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    for await (const share of response.shareItems || []) {
      console.log(`\tShare: ${share.name}`);
    }
    // @ts-preserve-whitespace
    // Gets next marker
    let marker = response.continuationToken;
    // @ts-preserve-whitespace
    // Passing next marker as continuationToken
    iterator = serviceClient.listShares().byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    for await (const share of response.shareItems || []) {
      console.log(`\tShare: ${share.name}`);
    }
  });

  it("ReadmeSampleCreateShareAndDirectory", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = `newshare${+new Date()}`;
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
    console.log(`Create share ${shareName} successfully`);
    // @ts-preserve-whitespace
    const directoryName = `newdirectory${+new Date()}`;
    const directoryClient = shareClient.getDirectoryClient(directoryName);
    await directoryClient.create();
    console.log(`Create directory ${directoryName} successfully`);
  });

  it("ReadmeSampleCreateFileAndUpload", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    const content = "Hello World!";
    const fileName = `newdirectory${+new Date()}`;
    const fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create(content.length);
    console.log(`Create file ${fileName} successfully`);
    // @ts-preserve-whitespace
    // Upload file range
    await fileClient.uploadRange(content, 0, content.length);
    console.log(`Upload file range "${content}" to ${fileName} successfully`);
  });

  it("ReadmeSampleCreateShareClient", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  it("ReadmeSampleListFilesAndDirectories", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    let i = 1;
    for await (const item of directoryClient.listFilesAndDirectories()) {
      if (item.kind === "directory") {
        console.log(`${i} - directory\t: ${item.name}`);
      } else {
        console.log(`${i} - file\t: ${item.name}`);
      }
      i++;
    }
  });

  it("ReadmeSampleListFilesAndDirectories_Iterator", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    let i = 1;
    const iter = directoryClient.listFilesAndDirectories();
    let { value, done } = await iter.next();
    while (!done) {
      if (value.kind === "directory") {
        console.log(`${i} - directory\t: ${value.name}`);
      } else {
        console.log(`${i} - file\t: ${value.name}`);
      }
      ({ value, done } = await iter.next());
      i++;
    }
  });

  it("ReadmeSampleListFilesAndDirectories_ByPage", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    let i = 1;
    for await (const response of directoryClient
      .listFilesAndDirectories()
      .byPage({ maxPageSize: 20 })) {
      console.log(`Page ${i++}:`);
      for (const item of response.segment.directoryItems) {
        console.log(`\tdirectory: ${item.name}`);
      }
      for (const item of response.segment.fileItems) {
        console.log(`\tfile: ${item.name}`);
      }
    }
  });

  it("ReadmeSampleListFilesAndDirectories_Continuation", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    let iterator = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    for await (const item of response.segment.directoryItems) {
      console.log(`\tdirectory: ${item.name}`);
    }
    // @ts-preserve-whitespace
    for await (const item of response.segment.fileItems) {
      console.log(`\tfile: ${item.name}`);
    }
    // @ts-preserve-whitespace
    // Gets next marker
    let marker = response.continuationToken;
    // @ts-preserve-whitespace
    // Passing next marker as continuationToken
    iterator = directoryClient
      .listFilesAndDirectories()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    for await (const item of response.segment.directoryItems) {
      console.log(`\tdirectory: ${item.name}`);
    }
    // @ts-preserve-whitespace
    for await (const item of response.segment.fileItems) {
      console.log(`\tfile: ${item.name}`);
    }
  });

  it("ReadmeSampleListHandles", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    for await (const handle of directoryClient.listHandles()) {
      console.log(`Handle: ${handle.handleId}`);
    }
  });

  it("ReadmeSampleListHandles_Iterator", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    const handleIter = directoryClient.listHandles();
    let { value, done } = await handleIter.next();
    while (!done) {
      console.log(`Handle: ${value.handleId}`);
      ({ value, done } = await handleIter.next());
    }
  });

  it("ReadmeSampleListHandles_ByPage", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    let i = 1;
    for await (const response of directoryClient.listHandles().byPage({ maxPageSize: 20 })) {
      console.log(`Page ${i++}:`);
      for (const handle of response.handleList || []) {
        console.log(`\thandle: ${handle.handleId}`);
      }
    }
  });

  it("ReadmeSampleListHandles_Continuation", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    let iterator = directoryClient.listHandles().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    for await (const handle of response.handleList || []) {
      console.log(`\thandle: ${handle.handleId}`);
    }
    // @ts-preserve-whitespace
    // Gets next marker
    let marker = response.continuationToken;
    // @ts-preserve-whitespace
    // Passing next marker as continuationToken
    iterator = directoryClient.listHandles().byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    for await (const handle of response.handleList || []) {
      console.log(`\thandle: ${handle.handleId}`);
    }
  });

  it("ReadmeSampleRenameDirectory", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const destinationPath = "<destination path>";
    const directoryClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName);
    // @ts-preserve-whitespace
    await directoryClient.rename(destinationPath);
  });

  it("ReadmeSampleRenameFile", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const fileName = "<file name>";
    const destinationPath = "<destination path>";
    const fileClient = serviceClient
      .getShareClient(shareName)
      .getDirectoryClient(directoryName)
      .getFileClient(fileName);
    // @ts-preserve-whitespace
    await fileClient.rename(destinationPath);
  });

  it("ReadmeSampleDownloadFileAndConvertToString_Node", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const fileName = "<file name>";
    const fileClient = serviceClient
      .getShareClient(shareName)
      .rootDirectoryClient.getFileClient(fileName);
    // @ts-preserve-whitespace
    // Get file content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
    const downloadFileResponse = await fileClient.download();
    if (downloadFileResponse.readableStreamBody) {
      const buffer = await streamToBuffer(downloadFileResponse.readableStreamBody);
      console.log(`Downloaded file content: ${buffer.toString()}`);
    }
    // @ts-preserve-whitespace
    // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
    async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        readableStream.on("data", (data) => {
          chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
      });
    }
  });

  it("ReadmeSampleDownloadFileAndConvertToString_Browser", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-preserve-whitespace
    const serviceClient = new ShareServiceClient(`https://${account}.file.core.windows.net?${sas}`);
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const fileName = "<file name>";
    const fileClient = serviceClient
      .getShareClient(shareName)
      .rootDirectoryClient.getFileClient(fileName);
    // @ts-preserve-whitespace
    // Get file content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadFileResponse.blobBody
    const downloadFileResponse = await fileClient.download(0);
    if (downloadFileResponse.blobBody) {
      console.log(`Downloaded file content: ${(await downloadFileResponse.blobBody).text()}`);
    }
  });

  it("ReadmeSampleGetDirectoryClient", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    const credential = new StorageSharedKeyCredential(account, accountKey);
    const serviceClient = new ShareServiceClient(
      `https://${account}.file.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const shareName = "<share name>";
    const directoryName = "<directory name>";
    const shareClient = serviceClient.getShareClient(shareName);
    const directoryClient = shareClient.getDirectoryClient(directoryName);
    await directoryClient.create();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
