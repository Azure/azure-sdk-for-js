// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { DefaultAzureCredential } from "@azure/identity";
import {
  DataLakeServiceClient,
  FileSystemSASPermissions,
  generateDataLakeSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-file-datalake";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    // Enter your storage account name
    const account = "<account>";
    const defaultAzureCredential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // @ts-ignore
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      defaultAzureCredential,
    );
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "<connection string>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const dataLakeServiceClient = DataLakeServiceClient.fromConnectionString(connectionString);
  });

  it("ReadmeSampleCreateClient_StorageSharedKeyCredential", async () => {
    // Enter your storage account name and shared key
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    // @ts-ignore
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      sharedKeyCredential,
    );
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-ignore
    const serviceClientWithSAS = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net${sas}`,
    );
  });

  it("ReadmeSampleCreateFileSystem", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // Create a file system
    const fileSystemName = `newfilesystem${new Date().getTime()}`;
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    const createResponse = await fileSystemClient.create();
    console.log(`Create file system ${fileSystemName} successfully`, createResponse.requestId);
  });

  it("ReadmeSampleListFileSystems", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    const fileSystems = datalakeServiceClient.listFileSystems();
    for await (const fileSystem of fileSystems) {
      console.log(`File system ${i++}: ${fileSystem.name}`);
    }
  });

  it("ReadmeSampleListFileSystems_Iterator", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    const fileSystems = datalakeServiceClient.listFileSystems();
    let { value, done } = await fileSystems.next();
    while (!done) {
      console.log(`File system ${i++}: ${value.name}`);
      ({ value, done } = await fileSystems.next());
    }
  });

  it("ReadmeSampleListFileSystems_ByPage", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    for await (const response of datalakeServiceClient
      .listFileSystems()
      .byPage({ maxPageSize: 20 })) {
      if (response.fileSystemItems) {
        for (const fileSystem of response.fileSystemItems) {
          console.log(`File System ${i++}: ${fileSystem.name}`);
        }
      }
    }
  });

  it("ReadmeSampleListFileSystems_Continuation", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    let fileSystems = datalakeServiceClient.listFileSystems().byPage({ maxPageSize: 2 });
    let response = (await fileSystems.next()).value;
    // Prints 2 file systems
    if (response.fileSystemItems) {
      for (const fileSystem of response.fileSystemItems) {
        console.log(`File system ${i++}: ${fileSystem.name}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    fileSystems = datalakeServiceClient
      .listFileSystems()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await fileSystems.next()).value;
    // Prints 10 file systems
    if (response.fileSystemItems) {
      for (const fileSystem of response.fileSystemItems) {
        console.log(`File system ${i++}: ${fileSystem.name}`);
      }
    }
  });

  it("ReadmeSampleCreateDeleteDirectory", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    const directoryClient = fileSystemClient.getDirectoryClient("directory");
    await directoryClient.create();
    await directoryClient.delete();
  });

  it("ReadmeSampleCreateFile", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    const content = "Hello world!";
    const fileName = `newfile${+new Date()}`;
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    console.log(`Create and upload file ${fileName} successfully`);
  });

  it("ReadmeSampleListPaths", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    const paths = fileSystemClient.listPaths();
    for await (const path of paths) {
      console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
    }
  });

  it("ReadmeSampleListPaths_Iterator", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    const paths = fileSystemClient.listPaths();
    let { value, done } = await paths.next();
    while (!done) {
      console.log(`Path ${i++}: ${value.name}, is directory: ${value.isDirectory}`);
      ({ value, done } = await paths.next());
    }
  });

  it("ReadmeSampleListPaths_ByPage", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    for await (const response of fileSystemClient.listPaths().byPage({ maxPageSize: 20 })) {
      if (response.pathItems) {
        for (const path of response.pathItems) {
          console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
        }
      }
    }
  });

  it("ReadmeSampleListPaths_Continuation", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    let paths = fileSystemClient.listPaths().byPage({ maxPageSize: 2 });
    let response = (await paths.next()).value;
    // Prints 2 paths
    if (response.pathItems) {
      for (const path of response.pathItems) {
        console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    paths = fileSystemClient.listPaths().byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await paths.next()).value;
    // Prints 10 paths
    if (response.pathItems) {
      for (const path of response.pathItems) {
        console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
      }
    }
  });

  it("ReadmeSampleListDeletedPaths", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    const deletedPaths = fileSystemClient.listDeletedPaths();
    for await (const deletedPath of deletedPaths) {
      console.log(`Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`);
    }
  });

  it("ReadmeSampleListDeletedPaths_Iterator", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    const deletedPaths = fileSystemClient.listDeletedPaths();
    let { value, done } = await deletedPaths.next();
    while (!done) {
      console.log(`Deleted path ${i++}: ${value.name}, deleted on: ${value.deletedOn}`);
      ({ value, done } = await deletedPaths.next());
    }
  });

  it("ReadmeSampleListDeletedPaths_ByPage", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    for await (const response of fileSystemClient.listDeletedPaths().byPage({ maxPageSize: 20 })) {
      if (response.pathItems) {
        for (const deletedPath of response.pathItems) {
          console.log(
            `Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`,
          );
        }
      }
    }
  });

  it("ReadmeSampleListDeletedPaths_Continuation", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    // @ts-preserve-whitespace
    let i = 1;
    let deletedPaths = fileSystemClient.listDeletedPaths().byPage({ maxPageSize: 2 });
    let response = (await deletedPaths.next()).value;
    // Prints 2 deleted paths
    if (response.deletedPathItems) {
      for (const deletedPath of response.deletedPathItems) {
        console.log(
          `Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`,
        );
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    deletedPaths = fileSystemClient
      .listDeletedPaths()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await deletedPaths.next()).value;
    // Prints 10 deleted paths
    if (response.deletedPathItems) {
      for (const deletedPath of response.deletedPathItems) {
        console.log(
          `Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`,
        );
      }
    }
  });

  it("ReadmeSampleDownloadFile_Node", async () => {
    const account = "<account>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileName = "<file name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    const fileClient = fileSystemClient.getFileClient(fileName);
    // @ts-preserve-whitespace
    // Get file content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadResponse.readableStreamBody
    const downloadResponse = await fileClient.read();
    if (downloadResponse.readableStreamBody) {
      const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
      console.log("Downloaded file content:", downloaded.toString());
    }
    // @ts-preserve-whitespace
    // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer.
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

  it("ReadmeSampleDownloadFile_Browser", async () => {
    const account = "<account>";
    const sas = "<sas token>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net${sas}`,
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileName = "<file name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    const fileClient = fileSystemClient.getFileClient(fileName);
    // @ts-preserve-whitespace
    // Get file content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadResponse.contentAsBlob
    const downloadResponse = await fileClient.read();
    if (downloadResponse.contentAsBlob) {
      const blob = await downloadResponse.contentAsBlob;
      const downloaded = await blob.text();
      console.log(`Downloaded file content ${downloaded}`);
    }
  });

  it("ReadmeSampleQueryFile_Node", async () => {
    const account = "<account>";
    const sas = "<sas token>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net${sas}`,
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const fileName = "<file name>";
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    const fileClient = fileSystemClient.getFileClient(fileName);
    // @ts-preserve-whitespace
    // Query and convert a file to a string
    const queryResponse = await fileClient.query("select * from BlobStorage");
    if (queryResponse.readableStreamBody) {
      const responseBuffer = await streamToBuffer(queryResponse.readableStreamBody);
      const downloaded = responseBuffer.toString();
      console.log(`Query file content: ${downloaded}`);
    }
    // @ts-preserve-whitespace
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

  it("DatalakeServiceClientGetUserDelegationKey", async () => {
    const account = "<account>";
    const sas = "<sas token>";
    const datalakeServiceClient = new DataLakeServiceClient(
      `https://${account}.dfs.core.windows.net${sas}`,
    );
    // @ts-preserve-whitespace
    const fileSystemName = "<file system name>";
    const accountName = "<account name>";
    const startsOn = new Date();
    const expiresOn = new Date(+new Date() + 86400 * 1000);
    // Generate user delegation SAS for a file system
    const userDelegationKey = await datalakeServiceClient.getUserDelegationKey(startsOn, expiresOn);
    // @ts-ignore
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName, // Required
        permissions: FileSystemSASPermissions.parse("racwdl"), // Required
        startsOn, // Required. Date type
        expiresOn, // Optional. Date type
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
        protocol: SASProtocol.HttpsAndHttp, // Optional
        version: "2018-11-09", // Must greater than or equal to 2018-11-09 to generate user delegation SAS
      },
      userDelegationKey, // UserDelegationKey
      accountName,
    ).toString();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
