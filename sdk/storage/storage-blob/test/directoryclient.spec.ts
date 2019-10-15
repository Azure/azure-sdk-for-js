// import * as assert from 'assert';
import * as assert from "assert";
import * as dotenv from "dotenv";

import { BlobServiceClient, ContainerClient, DirectoryClient } from "../src";
import { getAdlsBSU } from "./utils";
import { record } from "./utils/recorder";

dotenv.config({ path: "../.env" });

// ADLS related APIs depends on following optional environments, otherwise cases will be ignored in a live test
// When recording test cases "TEST_MODE=record", following environment variables are required
// DFS_ACCOUNT_NAME_OPTIONAL
// DFS_ACCOUNT_KEY_OPTIONAL
// DFS_ACCOUNT_SAS_OPTIONAL
// DFS_STORAGE_CONNECTION_STRING_OPTIONAL
describe("DirectoryClient", () => {
  let blobServiceClient: BlobServiceClient;
  try {
    blobServiceClient = getAdlsBSU();
  } catch (err) {}

  let containerName: string;
  let containerClient: ContainerClient;
  let directoryName: string;
  let directoryClient: DirectoryClient;
  let recorder: any;

  beforeEach(async function() {
    if (blobServiceClient === undefined) {
      this.skip();
    }

    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    directoryName = recorder.getUniqueName("directory");
    directoryClient = containerClient.getDirectoryClient(directoryName);
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
  });

  it("create directory should work", async () => {
    const response = await directoryClient.create();
    assert.notStrictEqual(response.eTag, undefined);
    assert.notStrictEqual(response.lastModified, undefined);
  });

  it("create directory with all parameters should work", async () => {
    const options = {
      directoryProperties: { prop1: "val1", prop2: "val2" },
      posixPermissions: "0777", // rwxrwxrwx
      posixUmask: "0057", // ---r-xrwx With unmask, resulting permission should be rwx-w----
      directoryHttpHeaders: {
        cacheControl: "cacheControl",
        contentType: "contentType",
        contentEncoding: "contentEncoding",
        contentLanguage: "contentLanguage",
        contentDisposition: "contentDisposition"
      }
    };
    await directoryClient.create(options);

    const blobURL = directoryClient.getBlobClient();
    const properties = await blobURL.getProperties();
    assert.deepStrictEqual((properties.metadata || {}).prop1, options.directoryProperties.prop1);
    assert.deepStrictEqual((properties.metadata || {}).prop2, options.directoryProperties.prop2);
    assert.deepStrictEqual(properties.cacheControl, options.directoryHttpHeaders.cacheControl);
    assert.deepStrictEqual(properties.contentType, options.directoryHttpHeaders.contentType);
    assert.deepStrictEqual(
      properties.contentEncoding,
      options.directoryHttpHeaders.contentEncoding
    );
    assert.deepStrictEqual(
      properties.contentLanguage,
      options.directoryHttpHeaders.contentLanguage
    );
    assert.deepStrictEqual(
      properties.contentDisposition,
      options.directoryHttpHeaders.contentDisposition
    );

    const permissions = await directoryClient.getAccessControl();
    assert.deepStrictEqual(permissions.xMsPermissions, "rwx-w----");
    assert.deepStrictEqual(permissions.xMsOwner, "$superuser");
    assert.deepStrictEqual(permissions.xMsGroup, "$superuser");
  });

  it("delete directory should work", async () => {
    const subdir = directoryClient.getDirectoryClient(recorder.getUniqueName("directory_delete"));
    await subdir.create();
    await subdir.deleteSegment();
  });

  it("delete directory segment should work", async () => {
    const count = 3;
    for (let i = 0; i < count; i++) {
      await directoryClient
        .getDirectoryClient(recorder.getUniqueName("directory_delete" + i))
        .create();
    }

    let marker;
    do {
      marker = (await directoryClient.deleteSegment(marker)).marker;
    } while (marker);
  });

  it("delete directory async iterator should work", async () => {
    const count = 3;
    for (let i = 0; i < count; i++) {
      await directoryClient
        .getDirectoryClient(recorder.getUniqueName("directory_delete_async" + i))
        .create();
    }

    for await (const _response of directoryClient.delete()) {
    }
  });

  it("set directory permissions should work", async () => {
    await directoryClient.create();
    await directoryClient.setPermissions("0000");
    let permissions = await directoryClient.getAccessControl();
    assert.deepStrictEqual(permissions.xMsPermissions, "---------");

    await directoryClient.setPermissions(undefined, { owner: "$superuser" });
    permissions = await directoryClient.getAccessControl();
    assert.deepStrictEqual(permissions.xMsPermissions, "---------");
    assert.deepStrictEqual(permissions.xMsOwner, "$superuser");
  });

  it("set directory permissions with all parameters should work", async () => {
    await directoryClient.create();
    await directoryClient.setPermissions("0777", { owner: "$superuser", group: "$superuser" });
    const permissions = await directoryClient.getAccessControl();
    assert.deepStrictEqual(permissions.xMsPermissions, "rwxrwxrwx");
    assert.deepStrictEqual(permissions.xMsOwner, "$superuser");
    assert.deepStrictEqual(permissions.xMsGroup, "$superuser");
  });

  it("set empty directory permissions should not work", async () => {
    await directoryClient.create();

    let error;
    try {
      await directoryClient.setPermissions();
    } catch (err) {
      error = err;
    }

    assert.notEqual(error, undefined);
    assert.deepStrictEqual(
      error.message,
      "options.owner or options.group must be provided when permissions parameter is empty."
    );
  });

  it("set directory access control should work", async () => {
    await directoryClient.create();
    await directoryClient.setAccessControl("user::rwx,group::r-x,other::-w-");
    let permissions = await directoryClient.getAccessControl();
    assert.deepStrictEqual(permissions.xMsPermissions, "rwxr-x-w-");
    assert.deepStrictEqual(permissions.xMsOwner, "$superuser");
    assert.deepStrictEqual(permissions.xMsGroup, "$superuser");
  });

  it("set directory access control should work with all parameters", async () => {
    await directoryClient.create();
    await directoryClient.setAccessControl("user::rwx,group::r-x,other::-w-", {
      owner: "$superuser",
      group: "$superuser"
    });
    let permissions = await directoryClient.getAccessControl();
    assert.deepStrictEqual(permissions.xMsPermissions, "rwxr-x-w-");
    assert.deepStrictEqual(permissions.xMsOwner, "$superuser");
    assert.deepStrictEqual(permissions.xMsGroup, "$superuser");
  });
});
