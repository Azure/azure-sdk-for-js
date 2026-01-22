// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { join } from "node:path";
import fs from "node:fs";
import type {
  AccessControlChangeCounters,
  AccessControlChanges,
  DataLakeFileSystemClient,
  DataLakeServiceClient,
  PathAccessControlItem,
  PathPermissions,
} from "@azure/storage-file-datalake";
import {
  DataLakeFileClient,
  DataLakePathClient,
  DataLakeSASPermissions,
  getDataLakeServiceAccountAudience,
} from "@azure/storage-file-datalake";
import { toAcl, toRemoveAcl } from "$internal/transforms.js";
import { configureStorageClient } from "../../utils/recorder.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/node/testHelpers.js";
import {
  createDataLakeServiceClient,
  getDataLakeServiceClientWithDefaultCredential,
  getDataLakeFileSystemClientWithSASCredential,
} from "../../utils/node/clients.js";
import { SimpleTokenCredential } from "../../utils/simpleToken.js";
import { getTestCpkInfo } from "../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DataLakePathClient Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";
  let serviceClient: DataLakeServiceClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    // Use StorageSharedKeyCredential so that owner/group default to $superuser
    // (OAuth/TokenCredential would set owner/group to the caller's AAD Object ID)
    serviceClient = await createDataLakeServiceClient("StorageSharedKeyCredential", { recorder });
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-rename-source"],
        },
      },
      ["record", "playback"],
    );
    fileSystemName = getUniqueName("filesystem", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = getUniqueName("file", { recorder });
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it.skip(
    "DataLakeDirectoryClient paginated delete",
    { timeout: 10 * 60 * 60 * 1000 },
    async () => {
      // To run this test, the NamespaceTenant AAD info needs to be set to an AAD app that does not have any RBAC permissions,
      const directoryName1 = getUniqueName("directory1", { recorder });
      const directoryClient = fileSystemClient.getDirectoryClient(directoryName1);
      await directoryClient.create();

      for (let i = 0; i < 5020; i++) {
        const fileClientInternal = directoryClient.getFileClient(
          getUniqueName("file" + i, { recorder }),
        );
        await fileClientInternal.create();
      }

      const rootDirectory = fileSystemClient.getDirectoryClient("/");

      const originAcls = await rootDirectory.getAccessControl();
      const acls: PathAccessControlItem[] = [];

      originAcls.acl.forEach((entry) => {
        if (entry.accessControlType === "other") {
          entry.permissions = {
            read: true,
            write: true,
            execute: true,
          };
        }
        acls.push(entry);
      });

      await rootDirectory.setAccessControlRecursive(acls);

      const oauthService = await getDataLakeServiceClientWithDefaultCredential(recorder);
      const oauthDirectory = oauthService
        .getFileSystemClient(fileSystemName)
        .getDirectoryClient(directoryName1);
      await oauthDirectory.delete(true);
    },
  );

  it("DataLakeFileClient delete without paginated", async () => {
    const fileName1 = getUniqueName("file1", { recorder });
    const fileClient1 = fileSystemClient.getFileClient(fileName1);
    await fileClient1.create();

    const rootDirectory = fileSystemClient.getDirectoryClient("/");

    const originAcls = await rootDirectory.getAccessControl();
    const acls: PathAccessControlItem[] = [];

    originAcls.acl.forEach((entry) => {
      if (entry.accessControlType === "other") {
        entry.permissions = {
          read: true,
          write: true,
          execute: true,
        };
      }
      acls.push(entry);
    });

    await rootDirectory.setAccessControlRecursive(acls);

    const oauthService = await getDataLakeServiceClientWithDefaultCredential(recorder);
    const oauthFile = oauthService.getFileSystemClient(fileSystemName).getFileClient(fileName1);
    await oauthFile.delete();
  });

  it("DataLakeFileClient create with owner", async () => {
    const testFileName = getUniqueName("testfile", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testFileClient.create({ owner: owner });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.owner, owner);

    const properties = await testFileClient.getProperties();
    assert.equal(properties.owner, owner);
    assert.equal(properties.group, "$superuser");
  });

  it("DataLakeFileClient create with group", async () => {
    const testFileName = getUniqueName("testfile", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testFileClient.create({ group: group });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.group, group);

    const properties = await testFileClient.getProperties();
    assert.equal(properties.owner, "$superuser");
    assert.equal(properties.group, group);
  });

  it("DataLakeFileClient create with acl", async () => {
    const testFileName = getUniqueName("testfile", { recorder });
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

    const properties = await testFileClient.getProperties();

    assert.deepStrictEqual(properties.owner, "$superuser");
    assert.deepStrictEqual(properties.group, "$superuser");
    assert.deepStrictEqual(properties.permissions, {
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

    const readResult = await testFileClient.read();

    assert.deepStrictEqual(readResult.owner, "$superuser");
    assert.deepStrictEqual(readResult.group, "$superuser");
    assert.deepStrictEqual(readResult.permissions, {
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
    assert.deepStrictEqual(readResult.acl, acl);

    const readFilePath = getUniqueName("readFilePath", { recorder });
    const readToFileResponse = await testFileClient.readToFile(readFilePath);
    fs.unlinkSync(readFilePath);

    assert.deepStrictEqual(readToFileResponse.owner, "$superuser");
    assert.deepStrictEqual(readToFileResponse.group, "$superuser");
    assert.deepStrictEqual(readToFileResponse.permissions, {
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
    assert.deepStrictEqual(readToFileResponse.acl, acl);
  });

  it("DataLakeFileClient createIfNotExists with owner", async () => {
    const testFileName = getUniqueName("testfile", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testFileClient.createIfNotExists({ owner: owner });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.owner, owner);
  });

  it("DataLakeFileClient createIfNotExists with group", async () => {
    const testFileName = getUniqueName("testfile", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testFileClient.createIfNotExists({ group: group });
    const result = await testFileClient.getAccessControl();
    assert.equal(result.group, group);
  });

  it("DataLakeFileClient createIfNotExists with acl", async () => {
    const testFileName = getUniqueName("testfile", { recorder });
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
    const testDirName = getUniqueName("testdir", { recorder });
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testDirClient.create({ owner: owner });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.owner, owner);

    const properties = await testDirClient.getProperties();
    assert.equal(properties.owner, owner);
  });

  it("DataLakeDirectoryClient create with group", async () => {
    const testDirName = getUniqueName("testdir", { recorder });
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testDirClient.create({ group: group });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.group, group);

    const properties = await testDirClient.getProperties();
    assert.equal(properties.group, group);
  });

  it("DataLakeDirectoryClient create with acl", async () => {
    const testDirName = getUniqueName("testdir", { recorder });
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

    const permissions = {
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
    };

    const aclResult = await testDirClient.getAccessControl();
    assert.deepStrictEqual(aclResult.owner, "$superuser");
    assert.deepStrictEqual(aclResult.group, "$superuser");
    assert.deepStrictEqual(aclResult.permissions, permissions);
    assert.deepStrictEqual(aclResult.acl, acl);

    const propertiesResult = await testDirClient.getProperties();
    assert.deepStrictEqual(propertiesResult.owner, "$superuser");
    assert.deepStrictEqual(propertiesResult.group, "$superuser");
    assert.deepStrictEqual(propertiesResult.permissions, permissions);
    assert.deepStrictEqual(aclResult.acl, acl);
  });

  it("DataLakeDirectoryClient createIfNotExists with owner", async () => {
    const testDirName = getUniqueName("testdir", { recorder });
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const owner = "25fb43dd-e251-48a8-903b-e924f405299a";

    await testDirClient.createIfNotExists({ owner: owner });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.owner, owner);
  });

  it("DataLakeDirectoryClient createIfNotExists with group", async () => {
    const testDirName = getUniqueName("testdir", { recorder });
    const testDirClient = fileSystemClient.getDirectoryClient(testDirName);
    const group = "67089e35-dc13-458b-b06e-d873b8406284";

    await testDirClient.createIfNotExists({ group: group });
    const result = await testDirClient.getAccessControl();
    assert.equal(result.group, group);
  });

  it("DataLakeDirectoryClient createIfNotExists with acl", async () => {
    const testDirName = getUniqueName("testdir", { recorder });
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
          execute: false,
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
    assert.deepStrictEqual(response.permissions, permissions);
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
        execute: true,
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
    const destFileName = getUniqueName("destfile", { recorder });
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await destFileClient.getProperties();
  });

  it("move should encode source", async () => {
    const destFileName = getUniqueName(" a+'%20%2F%2B%27%%25%2520.txt", { recorder });
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(encodeURIComponent(destFileName));
    await destFileClient.getProperties();

    await destFileClient.move(fileName);
    await fileClient.getProperties();
  });

  it("move cross file system", async () => {
    const destFileSystemName = getUniqueName("destfilesystem", { recorder });
    const destFileSystemClient = serviceClient.getFileSystemClient(destFileSystemName);
    await destFileSystemClient.create();

    const destFileName = getUniqueName("destfile", { recorder });
    const destFileClient = destFileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileSystemName, destFileName);

    await destFileClient.getProperties();
    await destFileSystemClient.deleteIfExists();
  });

  it("move should not encode / in the source", async () => {
    await fileSystemClient.getDirectoryClient("path").create();
    const destFileName = getUniqueName("path/slash", { recorder });
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(encodeURIComponent(destFileName));
    await destFileClient.getProperties();
    await destFileClient.move(fileName);
    await fileClient.getProperties();
  });

  it("move with destination path encoded", async () => {
    await fileSystemClient.getDirectoryClient("dest file with & and 1").create();
    const destFileName = getUniqueName("dest file with & and 1/char", { recorder });
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(encodeURIComponent(destFileName));
    await destFileClient.getProperties();
  });

  it("move with destination path not encoded", async () => {
    await fileSystemClient.getDirectoryClient("dest file with & and 2").create();
    const destFileName = getUniqueName("dest file with & and 2/char", { recorder });
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await destFileClient.getProperties();
  });

  it("move with shared key to authenticate source, SAS to authenticate destination", async () => {
    const destFileName = getUniqueName("destfile", { recorder });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const sasFileSystemClient = await getDataLakeFileSystemClientWithSASCredential(recorder, {
      fileSystemName: fileSystemClient.name,
      pathName: destFileName,
      expiresOn: new Date(now.getTime() + 60 * 1000),
      permissions: DataLakeSASPermissions.parse("rwm"),
    });
    const sasDestFileClient = sasFileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await sasDestFileClient.getProperties();
  });

  it("move with SAS to authenticate source, SAS to authenticate destination", async () => {
    const destFileName = getUniqueName("destfile", { recorder });
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const sasFileSystemClient = await getDataLakeFileSystemClientWithSASCredential(recorder, {
      fileSystemName: fileSystemClient.name,
      expiresOn: new Date(now.getTime() + 60 * 1000),
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

    const response = await fileClient2.query("select * from BlobStorage", {
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
    await bodyToString(response);
  });

  it("query should work with Parquet input configuration", async () => {
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
      customerProvidedKey: getTestCpkInfo(),
    });
    await fileClient2.append(csvContent, 0, csvContent.length, {
      customerProvidedKey: getTestCpkInfo(),
    });
    await fileClient2.flush(csvContent.length, {
      customerProvidedKey: getTestCpkInfo(),
    });

    const response = await fileClient2.query("select * from BlobStorage", {
      customerProvidedKey: getTestCpkInfo(),
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("DataLakeFileClient default audience should work", async () => {
    const fileClientWithOAuthToken = new DataLakeFileClient(fileClient.url, createTestCredential());
    configureStorageClient(recorder, fileClientWithOAuthToken);
    const exist = await fileClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeFileClient customized audience should work", async () => {
    const fileClientWithOAuthToken = new DataLakeFileClient(
      fileClient.url,
      createTestCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) },
    );
    configureStorageClient(recorder, fileClientWithOAuthToken);
    const exist = await fileClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeFileClient bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const fileClientWithPlainOAuthToken = new DataLakeFileClient(
      fileClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureStorageClient(recorder, fileClientWithPlainOAuthToken);

    try {
      await fileClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const fileClientWithOAuthToken = new DataLakeFileClient(
      fileClient.url,
      createTestCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" },
    );
    configureStorageClient(recorder, fileClientWithOAuthToken);
    const exist = await fileClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeDirectoryClient default audience should work", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.createIfNotExists();

    const directoryClientWithOAuthToken = new DataLakePathClient(
      directoryClient.url,
      createTestCredential(),
    ).toDirectoryClient();
    configureStorageClient(recorder, directoryClientWithOAuthToken);
    const exist = await directoryClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeDirectoryClient customized audience should work", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.createIfNotExists();

    const directoryClientWithOAuthToken = new DataLakePathClient(
      fileClient.url,
      createTestCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) },
    ).toDirectoryClient();
    configureStorageClient(recorder, directoryClientWithOAuthToken);
    const exist = await directoryClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("DataLakeDirectoryClient bearer token challenge should work", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.createIfNotExists();

    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const directoryClientWithPlainOAuthToken = new DataLakePathClient(
      fileClient.url,
      new SimpleTokenCredential(authToken!.token),
    ).toDirectoryClient();
    configureStorageClient(recorder, directoryClientWithPlainOAuthToken);

    try {
      await directoryClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const directoryClientWithOAuthToken = new DataLakePathClient(
      fileClient.url,
      createTestCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" },
    ).toDirectoryClient();
    configureStorageClient(recorder, directoryClientWithOAuthToken);
    const exist = await directoryClientWithOAuthToken.exists();
    assert.equal(exist, true);
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

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    serviceClient = await createDataLakeServiceClient("TokenCredential", { recorder });
    fileSystemName = getUniqueName("filesystem", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = getUniqueName("file", { recorder });
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("setAccessControlRecursive should work", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });

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
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
      ),
    );

    assert.deepStrictEqual(3, result.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, result.counters.changedFilesCount);
    assert.deepStrictEqual(0, result.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, result.continuationToken);
  });

  it("setAccessControlRecursive should work with options - maxBatches", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });

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
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
      ),
      {
        batchSize: 2,
        maxBatches: 1,
        onProgress: () => {
          batchCounter++;
        },
      },
    );

    assert.deepStrictEqual(1, batchCounter);
    assert.notDeepEqual(undefined, result.continuationToken);
  });

  it("setAccessControlRecursive should work with options - batchSize", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });

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
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
      ),
      {
        batchSize: 2,
        onProgress: (progress) => {
          assert.isAtMost(
            progress.batchCounters.changedDirectoriesCount +
              progress.batchCounters.changedFilesCount +
              progress.batchCounters.failedChangesCount,
            2,
          );
          cumulativeCounters.changedDirectoriesCount +=
            progress.batchCounters.changedDirectoriesCount;
          cumulativeCounters.changedFilesCount += progress.batchCounters.changedFilesCount;
          cumulativeCounters.failedChangesCount += progress.batchCounters.failedChangesCount;

          assert.deepStrictEqual(
            progress.aggregateCounters.changedDirectoriesCount,
            cumulativeCounters.changedDirectoriesCount,
          );
          assert.deepStrictEqual(
            progress.aggregateCounters.changedFilesCount,
            cumulativeCounters.changedFilesCount,
          );
          assert.deepStrictEqual(
            progress.aggregateCounters.failedChangesCount,
            cumulativeCounters.failedChangesCount,
          );

          batchCounter++;
        },
      },
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
    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });

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
          "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
        ),
        {
          batchSize: 2,
          onProgress: (progress) => {
            midProgress = progress;
            continuation = progress.continuationToken;
            aborter.abort();
          },
          abortSignal: aborter.signal,
        },
      );
    } catch (err: any) {
      assert.equal(err.name, "DataLakeAclChangeFailedError");
      assert.equal(err.innerError.name, "AbortError");
      assert.equal(
        err.innerError.message,
        "The operation was aborted. Request has already been canceled.",
        "Unexpected error caught: " + err,
      );
    }

    const result = await directoryClient.setAccessControlRecursive(
      toAcl(
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
      ),
      {
        continuationToken: continuation,
      },
    );

    assert.deepStrictEqual(
      3,
      result.counters.changedDirectoriesCount + midProgress!.batchCounters.changedDirectoriesCount,
    );
    assert.deepStrictEqual(
      4,
      result.counters.changedFilesCount + midProgress!.batchCounters.changedFilesCount,
    );
    assert.deepStrictEqual(
      0,
      result.counters.failedChangesCount + midProgress!.batchCounters.failedChangesCount,
    );
    assert.deepStrictEqual(undefined, result.continuationToken);
  });

  it("updateAccessControlRecursive should work", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });

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
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
      ),
    );

    assert.deepStrictEqual(3, result.counters.changedDirectoriesCount);
    assert.deepStrictEqual(4, result.counters.changedFilesCount);
    assert.deepStrictEqual(0, result.counters.failedChangesCount);
    assert.deepStrictEqual(undefined, result.continuationToken);
  });

  it("removeAccessControlRecursive should work", async () => {
    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });

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
        "user::rwx,user:ec3595d6-2c17-4696-8caa-7e139758d24a:rw-,group::rw-,mask::rwx,other::---",
      ),
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
          "default:user:ec3595d6-2c17-4696-8caa-7e139758d24a,default:group:ec3595d6-2c17-4696-8caa-7e139758d24a",
      ),
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

    const directoryName = getUniqueName("directory", { recorder });
    const subDirectoryName1 = getUniqueName("subdirectory1", { recorder });
    const fileName1 = getUniqueName("fileName1", { recorder });
    const fileName2 = getUniqueName("fileName2", { recorder });
    const subDirectoryName2 = getUniqueName("subdirectory2", { recorder });
    const fileName3 = getUniqueName("fileName3", { recorder });
    const fileName4 = getUniqueName("fileName4", { recorder });
    const fileName5 = getUniqueName("fileName5", { recorder });
    const fileName6 = getUniqueName("fileName6", { recorder });

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

  it("read with default parameters", async () => {
    const result = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("read a file with encryption context set", async () => {
    const testFileName = getUniqueName("file1", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const encryptionContext = "EncryptionContext";
    await testFileClient.create({ encryptionContext: encryptionContext });
    await testFileClient.append(content, 0, content.length);
    await testFileClient.flush(content.length);
    const result = await testFileClient.read();
    assert.equal(result.encryptionContext, encryptionContext);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.exists(result.createdOn);
  });

  it("read a file with permissions set", async () => {
    const testFileName = getUniqueName("file1", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const permissionString = "0777";
    const umask = "0057";
    await testFileClient.create({ permissions: permissionString, umask: umask });
    await testFileClient.append(content, 0, content.length);
    await testFileClient.flush(content.length);
    const result = await testFileClient.read();
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
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.exists(result.createdOn);
  });

  it("read should not have aborted error after read finishes", async () => {
    const aborter = new AbortController();
    const result = await fileClient.read(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("read all parameters set", async () => {
    const result1 = await fileClient.read(0, 1, {
      rangeGetContentCrc64: true,
    });
    assert.isDefined(result1.clientRequestId);
    assert.deepStrictEqual(await bodyToString(result1, 1), content[0]);
    assert.isDefined(result1.clientRequestId);

    const result2 = await fileClient.read(1, 1, {
      rangeGetContentMD5: true,
    });
    assert.isDefined(result2.clientRequestId);

    let exceptionCaught = false;
    try {
      await fileClient.read(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true,
      });
    } catch (err: any) {
      exceptionCaught = true;
    }
    assert.isDefined(exceptionCaught);
  });

  it("file create, append, flush and read with cpk", async () => {
    const cpkFileName = getUniqueName("cpkFile", { recorder });
    const cpkFileClient = fileSystemClient.getFileClient(cpkFileName);
    await cpkFileClient.create({
      customerProvidedKey: getTestCpkInfo(),
    });
    await cpkFileClient.append(content, 0, content.length, {
      customerProvidedKey: getTestCpkInfo(),
    });
    await cpkFileClient.flush(content.length, {
      customerProvidedKey: getTestCpkInfo(),
    });

    const result = await cpkFileClient.read(0, undefined, {
      customerProvidedKey: getTestCpkInfo(),
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });
});
