// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { record, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { join } from "path";

import {
  AccessControlChangeCounters,
  AccessControlChanges,
  DataLakeFileClient,
  DataLakeFileSystemClient,
  DataLakeSASPermissions,
  DataLakeServiceClient,
  PathAccessControlItem,
  PathPermissions,
} from "../../src";
import { toAcl, toRemoveAcl } from "../../src/transforms";
import {
  bodyToString,
  getDataLakeServiceClient,
  recorderEnvSetup,
  getDataLakeFileSystemClientWithSASCredential,
} from "../utils";
import { Test_CPK_INFO } from "../utils/fakeTestSecrets";

describe("DataLakePathClient Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";
  let serviceClient: DataLakeServiceClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
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

  it("DataLakeFileClient create with owner", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testFileClient.create({ owner: owner });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.owner, owner);
  });

  it("DataLakeFileClient create with group", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testFileClient.create({ group: group });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.group, group);
  });

  it("DataLakeFileClient create with acl", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false,
        },
      },
    ];
    await testFileClient.create({ acl: acl });

    const permissions = await testFileClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("DataLakeFileClient createIfNotExists with owner", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testFileClient.createIfNotExists({ owner: owner });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.owner, owner);
  });

  it("DataLakeFileClient createIfNotExists with group", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testFileClient.createIfNotExists({ group: group });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.group, group);
  });

  it("DataLakeFileClient createIfNotExists with acl", async () => {
    const testFileName = recorder.getUniqueName("testfile");
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false,
        },
      },
    ];
    await testFileClient.createIfNotExists({ acl: acl });

    const permissions = await testFileClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("DataLakeDirectoryClient create with owner", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testDirClient.create({ owner: owner });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.owner, owner);
  });

  it("DataLakeDirectoryClient create with group", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testDirClient.create({ group: group });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.group, group);
  });

  it("DataLakeDirectoryClient create with acl", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false,
        },
      },
    ];
    await testDirClient.create({ acl: acl });

    const permissions = await testDirClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("DataLakeDirectoryClient createIfNotExists with owner", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testDirClient.createIfNotExists({ owner: owner });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.owner, owner);
  });

  it("DataLakeDirectoryClient createIfNotExists with group", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testDirClient.createIfNotExists({ group: group });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.group, group);
  });

  it("DataLakeDirectoryClient createIfNotExists with acl", async () => {
    const testDirName = recorder.getUniqueName("testdir");
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false,
        },
      },
    ];
    await testDirClient.createIfNotExists({ acl: acl });

    const permissions = await testDirClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("setAccessControl", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false,
        },
      },
    ];
    await fileClient.setAccessControl(acl);

    const permissions = await fileClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("setAccessControl with all parameters", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false,
        },
      },
    ];
    await fileClient.setAccessControl(acl, {
      owner: "$superuser",
      group: "$superuser",
    });

    const permissions = await fileClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("setPermissions", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: false,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: true,
        },
      },
    ];

    const permissions: PathPermissions = {
      extendedAcls: false,
      stickyBit: true,
      owner: {
        read: true,
        write: true,
        execute: false,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    };

    await fileClient.setPermissions(permissions);

    const response = await fileClient.getAccessControl();

    assert.deepStrictEqual(response.owner, "$superuser");
    assert.deepStrictEqual(response.group, "$superuser");
    assert.deepStrictEqual(response.permissions, {
      ...permissions,
      other: { ...permissions.other, execute: true },
    });
    assert.deepStrictEqual(response.acl, acl);
  });

  it("setPermissions with all parameters", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: false,
        },
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true,
        },
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: true,
        },
      },
    ];

    const permissions: PathPermissions = {
      extendedAcls: false,
      stickyBit: true,
      owner: {
        read: true,
        write: true,
        execute: false,
      },
      group: {
        read: true,
        write: false,
        execute: true,
      },
      other: {
        read: false,
        write: true,
        execute: false,
      },
    };

    await fileClient.setPermissions(permissions, { owner: "$superuser", group: "$superuser" });

    const response = await fileClient.getAccessControl();

    assert.deepStrictEqual(response.owner, "$superuser");
    assert.deepStrictEqual(response.group, "$superuser");
    assert.deepStrictEqual(response.permissions, {
      ...permissions,
      other: { ...permissions.other, execute: true },
    });
    assert.deepStrictEqual(response.acl, acl);
  });

  it("move", async () => {
    const destFileName = recorder.getUniqueName("destfile");
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await destFileClient.getProperties();
  });

  it("move should encode source", async () => {
    const destFileName = recorder.getUniqueName(" a+'%20%2F%2B%27%%25%2520.txt");
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(encodeURIComponent(destFileName));
    await destFileClient.getProperties();

    await destFileClient.move(fileName);
    await fileClient.getProperties();
  });

  it("move cross file system", async () => {
    const destFileSystemName = recorder.getUniqueName("destfilesystem");
    const destFileSystemClient = serviceClient.getFileSystemClient(destFileSystemName);
    await destFileSystemClient.create();

    const destFileName = recorder.getUniqueName("destfile");
    const destFileClient = destFileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileSystemName, destFileName);

    await destFileClient.getProperties();
    await destFileSystemClient.deleteIfExists();
  });

  it("move should not encode / in the source", async () => {
    await fileSystemClient.getDirectoryClient("path").create();
    const destFileName = recorder.getUniqueName("path/slash");
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(encodeURIComponent(destFileName));
    await destFileClient.getProperties();
    await destFileClient.move(fileName);
    await fileClient.getProperties();
  });

  it("move with destination path encoded", async () => {
    await fileSystemClient.getDirectoryClient("dest file with & and 1").create();
    const destFileName = recorder.getUniqueName("dest file with & and 1/char");
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(encodeURIComponent(destFileName));
    await destFileClient.getProperties();
  });

  it("move with destination path not encoded", async () => {
    await fileSystemClient.getDirectoryClient("dest file with & and 2").create();
    const destFileName = recorder.getUniqueName("dest file with & and 2/char");
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await destFileClient.getProperties();
  });

  it("move with shared key to authenticate source, SAS to authenticate destination", async () => {
    const destFileName = recorder.getUniqueName("destfile");
    const sasFileSystemClient = getDataLakeFileSystemClientWithSASCredential({
      fileSystemName: fileSystemClient.name,
      pathName: destFileName,
      expiresOn: new Date(Date.now() + 60 * 1000),
      permissions: DataLakeSASPermissions.parse("rwm"),
    });
    const sasDestFileClient = sasFileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await sasDestFileClient.getProperties();
  });

  it("move with SAS to authenticate source, SAS to authenticate destination", async () => {
    const destFileName = recorder.getUniqueName("destfile");
    const sasFileSystemClient = getDataLakeFileSystemClientWithSASCredential({
      fileSystemName: fileSystemClient.name,
      expiresOn: new Date(Date.now() + 60 * 1000),
      permissions: DataLakeSASPermissions.parse("rwdm"),
    });
    const sasDestFileClient = sasFileSystemClient.getFileClient(destFileName);
    const sasSourceFileClient = sasFileSystemClient.getFileClient(fileClient.name);
    await sasSourceFileClient.move(destFileName);
    await sasDestFileClient.getProperties();
  });

  it("quick query should work", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    const fileClient2 = fileSystemClient.getFileClient(fileName + "2");
    await fileClient2.create();
    await fileClient2.append(csvContent, 0, csvContent.length);
    await fileClient2.flush(csvContent.length);

    const response = await fileClient2.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("quick query should work with arrow output configuration", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    const fileClient2 = fileSystemClient.getFileClient(fileName + "2");
    await fileClient2.create();
    await fileClient2.append(csvContent, 0, csvContent.length);
    await fileClient2.flush(csvContent.length);

    await fileClient2.query("select * from BlobStorage", {
      outputTextConfiguration: {
        kind: "arrow",
        schema: [
          {
            type: "decimal",
            name: "name",
            precision: 4,
            scale: 2,
          },
        ],
      },
    });
  });

  it("query should work with Parquet input configuration", async function (this: Context) {
    // Enable the case when STG78 - version 2020-10-02 features is enabled in production.
    this.skip();
    const parquetFilePath = join("test", "resources", "parquet.parquet");

    const fileClient2 = fileSystemClient.getFileClient(fileName + "2");
    await fileClient2.uploadFile(parquetFilePath);

    const response = await fileClient2.query("select * from blobstorage where id < 1;", {
      inputTextConfiguration: {
        kind: "parquet",
      },
    });

    assert.deepStrictEqual(await bodyToString(response), "0,mdifjt55.ea3,mdifjt55.ea3\n");
  });

  it("quick query with CPK", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    const fileClient2 = fileSystemClient.getFileClient(fileName + "2");
    await fileClient2.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient2.append(csvContent, 0, csvContent.length, {
      customerProvidedKey: Test_CPK_INFO,
    });
    await fileClient2.flush(csvContent.length, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const response = await fileClient2.query("select * from BlobStorage", {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });
});

describe("DataLakePathClient setAccessControlRecursive Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";
  let serviceClient: DataLakeServiceClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
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

  it("setAccessControlRecursive should work", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const fileClient1 = subDirectoryClient1.getFileClient(fileName1);
    const fileClient2 = subDirectoryClient1.getFileClient(fileName2);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const fileClient3 = subDirectoryClient2.getFileClient(fileName3);
    const fileClient4 = subDirectoryClient2.getFileClient(fileName4);

    await directoryClient.create();
    await subDirectoryClient1.create();
    await subDirectoryClient2.create();

    await fileClient1.create();
    await fileClient2.create();
    await fileClient3.create();
    await fileClient4.create();

    const result = await directoryClient.setAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
      )
    );

    assert.deepStrictEqual(3, result.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, result.counters.changedFilesCount);
    assert.deepStrictEqual(0, result.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, result.continuationToken);
  });

  it("setAccessControlRecursive should work with options - maxBatches", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const fileClient1 = subDirectoryClient1.getFileClient(fileName1);
    const fileClient2 = subDirectoryClient1.getFileClient(fileName2);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const fileClient3 = subDirectoryClient2.getFileClient(fileName3);
    const fileClient4 = subDirectoryClient2.getFileClient(fileName4);

    await directoryClient.create();
    await subDirectoryClient1.create();
    await subDirectoryClient2.create();

    await fileClient1.create();
    await fileClient2.create();
    await fileClient3.create();
    await fileClient4.create();

    let batchCounter = 0;
    const result = await directoryClient.setAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
      ),
      {
        batchSize: 2,
        maxBatches: 1,
        onProgress: () => {
          batchCounter++;
        },
      }
    );

    assert.deepStrictEqual(1, batchCounter);
    assert.notDeepEqual(undefined, result.continuationToken);
  });

  it("setAccessControlRecursive should work with options - batchSize", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const fileClient1 = subDirectoryClient1.getFileClient(fileName1);
    const fileClient2 = subDirectoryClient1.getFileClient(fileName2);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const fileClient3 = subDirectoryClient2.getFileClient(fileName3);
    const fileClient4 = subDirectoryClient2.getFileClient(fileName4);

    await directoryClient.create();
    await subDirectoryClient1.create();
    await subDirectoryClient2.create();

    await fileClient1.create();
    await fileClient2.create();
    await fileClient3.create();
    await fileClient4.create();

    let batchCounter = 0;
    const cumulativeCounters: AccessControlChangeCounters = {
      changedDirectoriesCount: 0,
      changedFilesCount: 0,
      failedChangesCount: 0,
    };
    const result = await directoryClient.setAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
      ),
      {
        batchSize: 2,
        onProgress: (progress) => {
          assert.ok(
            progress.batchCounters.changedDirectoriesCount +
              progress.batchCounters.changedFilesCount +
              progress.batchCounters.failedChangesCount <=
              2
          );
          cumulativeCounters.changedDirectoriesCount +=
            progress.batchCounters.changedDirectoriesCount;
          cumulativeCounters.changedFilesCount += progress.batchCounters.changedFilesCount;
          cumulativeCounters.failedChangesCount += progress.batchCounters.failedChangesCount;

          assert.deepStrictEqual(
            progress.aggregateCounters.changedDirectoriesCount,
            cumulativeCounters.changedDirectoriesCount
          );
          assert.deepStrictEqual(
            progress.aggregateCounters.changedFilesCount,
            cumulativeCounters.changedFilesCount
          );
          assert.deepStrictEqual(
            progress.aggregateCounters.failedChangesCount,
            cumulativeCounters.failedChangesCount
          );

          batchCounter++;
        },
      }
    );

    assert.deepStrictEqual(3, cumulativeCounters.changedDirectoriesCount);
    assert.deepStrictEqual(4, cumulativeCounters.changedFilesCount);
    assert.deepStrictEqual(0, cumulativeCounters.failedChangesCount);
    assert.deepStrictEqual(3, result.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, result.counters.changedFilesCount);
    assert.deepStrictEqual(0, result.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, result.continuationToken);
    assert.deepStrictEqual(true, batchCounter > 3);
  });

  it("setAccessControlRecursive should work with aborter & resume, ", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const fileClient1 = subDirectoryClient1.getFileClient(fileName1);
    const fileClient2 = subDirectoryClient1.getFileClient(fileName2);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const fileClient3 = subDirectoryClient2.getFileClient(fileName3);
    const fileClient4 = subDirectoryClient2.getFileClient(fileName4);

    await directoryClient.create();
    await subDirectoryClient1.create();
    await subDirectoryClient2.create();

    await fileClient1.create();
    await fileClient2.create();
    await fileClient3.create();
    await fileClient4.create();

    let continuation;
    let midProgress: AccessControlChanges;
    try {
      const aborter = new AbortController();
      await directoryClient.setAccessControlRecursive(
        toAcl(
          "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
        ),
        {
          batchSize: 2,
          onProgress: (progress) => {
            midProgress = progress;
            continuation = progress.continuationToken;
            aborter.abort();
          },
          abortSignal: aborter.signal,
        }
      );
    } catch (err: any) {
      assert.equal(err.name, "DataLakeAclChangeFailedError");
      assert.equal(err.innerError.name, "AbortError");
      assert.equal(
        err.innerError.message,
        "The operation was aborted.",
        "Unexpected error caught: " + err
      );
    }

    const result = await directoryClient.setAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
      ),
      {
        continuationToken: continuation,
      }
    );

    assert.deepStrictEqual(
      3,
      result.counters.changedDirectoriesCount + midProgress!.batchCounters.changedDirectoriesCount
    );
    assert.deepStrictEqual(
      4,
      result.counters.changedFilesCount + midProgress!.batchCounters.changedFilesCount
    );
    assert.deepStrictEqual(
      0,
      result.counters.failedChangesCount + midProgress!.batchCounters.failedChangesCount
    );
    assert.deepStrictEqual(undefined, result.continuationToken);
  });

  it("updateAccessControlRecursive should work", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const fileClient1 = subDirectoryClient1.getFileClient(fileName1);
    const fileClient2 = subDirectoryClient1.getFileClient(fileName2);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const fileClient3 = subDirectoryClient2.getFileClient(fileName3);
    const fileClient4 = subDirectoryClient2.getFileClient(fileName4);

    await directoryClient.create();
    await subDirectoryClient1.create();
    await subDirectoryClient2.create();

    await fileClient1.create();
    await fileClient2.create();
    await fileClient3.create();
    await fileClient4.create();

    const result = await directoryClient.updateAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
      )
    );

    assert.deepStrictEqual(3, result.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, result.counters.changedFilesCount);
    assert.deepStrictEqual(0, result.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, result.continuationToken);
  });

  it("removeAccessControlRecursive should work", async () => {
    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const fileClient1 = subDirectoryClient1.getFileClient(fileName1);
    const fileClient2 = subDirectoryClient1.getFileClient(fileName2);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const fileClient3 = subDirectoryClient2.getFileClient(fileName3);
    const fileClient4 = subDirectoryClient2.getFileClient(fileName4);

    await directoryClient.create();
    await subDirectoryClient1.create();
    await subDirectoryClient2.create();

    await fileClient1.create();
    await fileClient2.create();
    await fileClient3.create();
    await fileClient4.create();

    const result = await directoryClient.updateAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
      )
    );

    assert.deepStrictEqual(3, result.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, result.counters.changedFilesCount);
    assert.deepStrictEqual(0, result.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, result.continuationToken);

    const removeResult = await directoryClient.removeAccessControlRecursive(
      toRemoveAcl(
        "mask," +
          "default:user,default:group," +
          "user:ec3595d6-2c17-4696-8caa-7e139758d24a,group:ec3595d6-2c17-4696-8caa-7e139758d24a," +
          "default:user:ec3595d6-2c17-4696-8caa-7e139758d24a,default:group:ec3595d6-2c17-4696-8caa-7e139758d24a"
      )
    );

    assert.deepStrictEqual(3, removeResult.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, removeResult.counters.changedFilesCount);
    assert.deepStrictEqual(0, removeResult.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, removeResult.continuationToken);
  });

  it("setAccessControlRecursive should work with progress failures", async () => {
    // Manually execution needed
    // TODO: Cannot set up environment to reproduce progress failure due to service change
    // Blob Data Contributor unexpectedly doesn't have permission for setRecursiveAcl API
    // Check with feature team
    // /directory
    // /directory/subdirectory1
    // /directory/subdirectory1/fileName1
    // /directory/subdirectory1/fileName2
    // /directory/subdirectory2/fileName3
    // /directory/subdirectory2/fileName4
    // Service client with SharedKey authentication creates following directories and files
    // /directory/subdirectory1/fileName5
    // /directory/subdirectory2/fileName6
    /*

    const token = "";
    const fileSystemClientOAuth = new DataLakeFileSystemClient(fileSystemClient.url, new SimpleTokenCredential(token));

    const directoryName = recorder.getUniqueName("directory");
    const subDirectoryName1 = recorder.getUniqueName("subdirectory1");
    const fileName1 = recorder.getUniqueName("fileName1");
    const fileName2 = recorder.getUniqueName("fileName2");
    const subDirectoryName2 = recorder.getUniqueName("subdirectory2");
    const fileName3 = recorder.getUniqueName("fileName3");
    const fileName4 = recorder.getUniqueName("fileName4");
    const fileName5 = recorder.getUniqueName("fileName5");
    const fileName6 = recorder.getUniqueName("fileName6");

    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    const directoryClientOAuth = fileSystemClientOAuth.getDirectoryClient(directoryName);
    const subDirectoryClient1 = directoryClient.getSubdirectoryClient(subDirectoryName1);
    const subDirectoryClientOAuth1 = directoryClientOAuth.getSubdirectoryClient(subDirectoryName1);
    const fileClientOAuth1 = subDirectoryClientOAuth1.getFileClient(fileName1);
    const fileClientOAuth2 = subDirectoryClientOAuth1.getFileClient(fileName2);
    const fileClient5 = subDirectoryClient1.getFileClient(fileName5);
    const subDirectoryClient2 = directoryClient.getSubdirectoryClient(subDirectoryName2);
    const subDirectoryClientOAuth2 = directoryClientOAuth.getSubdirectoryClient(subDirectoryName2);
    const fileClientOAuth3 = subDirectoryClientOAuth2.getFileClient(fileName3);
    const fileClientOAuth4 = subDirectoryClientOAuth2.getFileClient(fileName4);
    const fileClient6 = subDirectoryClient2.getFileClient(fileName6);

    await directoryClientOAuth.create();
    await subDirectoryClientOAuth1.create();
    await subDirectoryClientOAuth2.create();

    await fileClientOAuth1.create();
    await fileClientOAuth2.create();
    await fileClientOAuth3.create();
    await fileClientOAuth4.create();
    await fileClient5.create();
    await fileClient6.create();
    
    // let continuation;
    // let midProgress: AccessControlChanges;

    await directoryClientOAuth.setAccessControlRecursive(
        toAcl(
          "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---"
        ),
        {
          batchSize: 2,
          // onProgress: (progress) => {
            // midProgress = progress;
            // continuation = progress.continuationToken;
          // },
          continueOnFailure: true
        }
      );

    */
  });
});
