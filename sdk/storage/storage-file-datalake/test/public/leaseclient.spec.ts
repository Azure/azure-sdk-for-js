// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, Recorder } from "@azure-tools/test-recorder";
import type {
  DataLakeFileClient,
  DataLakeDirectoryClient,
  DataLakeFileSystemClient,
  DataLakeServiceClient,
} from "../../src/index.js";
import { createDataLakeServiceClient } from "./utils/clients.js";
import { getUniqueName } from "./utils/utils.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("LeaseClient from FileSystem", () => {
  let serviceClient: DataLakeServiceClient;
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    serviceClient = await createDataLakeServiceClient("TokenCredential", { recorder });
    fileSystemName = getUniqueName("filesystem", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease without specifying a lease id", async () => {
    const duration = 30;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(30 * 1000); // Wait 2x the lease duration to ensure expiry
    const result2 = await fileSystemClient.getProperties();
    // Handle race condition: leaseDuration may still be "fixed" or undefined depending on timing
    assert.isTrue(
      result2.leaseDuration === undefined || result2.leaseDuration === "fixed",
      `Expected leaseDuration to be undefined or 'fixed', but got '${result2.leaseDuration}'`,
    );
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await leaseClient.renewLease();
    const result3 = await fileSystemClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await fileSystemClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(3);

    const result2 = await fileSystemClient.getProperties();
    assert.isUndefined(result2.leaseDuration);
    // Handle race condition: state could be either "breaking" or "broken" immediately after breakLease call
    if (result2.leaseState === "breaking") {
      assert.equal(result2.leaseStatus, "locked");
    } else if (result2.leaseState === "broken") {
      assert.equal(result2.leaseStatus, "unlocked");
    } else {
      assert.fail(`Invalid leaseState: ${result2.leaseState}`);
    }

    await delay(5 * 1000); // Wait 2x the break period to ensure transition completes

    const result3 = await fileSystemClient.getProperties();
    assert.isUndefined(result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });
});

describe("LeaseClient from File", () => {
  let serviceClient: DataLakeServiceClient;
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
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
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(30 * 1000); // Wait 2x the lease duration to ensure expiry

    const result2 = await fileClient.getProperties();
    // Handle race condition: leaseDuration may still be "fixed" or undefined depending on timing
    assert.isTrue(
      result2.leaseDuration === undefined || result2.leaseDuration === "fixed",
      `Expected leaseDuration to be undefined or 'fixed', but got '${result2.leaseDuration}'`,
    );
    assert.equal(result2.leaseState, "expired");
    // assert.equal(result2.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "expired" lease

    await leaseClient.renewLease();
    const result3 = await fileClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await fileClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(5);

    const result2 = await fileClient.getProperties();
    assert.isUndefined(result2.leaseDuration);
    // Handle race condition: state could be either "breaking" or "broken" immediately after breakLease call
    if (result2.leaseState === "breaking") {
      assert.equal(result2.leaseStatus, "locked");
    } else if (result2.leaseState === "broken") {
      // leaseStatus may still be "locked" due to potential server bug
    } else {
      assert.fail(`Invalid leaseState: ${result2.leaseState}`);
    }

    await delay(10 * 1000); // Wait 2x the break period to ensure transition completes

    const result3 = await fileClient.getProperties();
    assert.isUndefined(result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    // assert.equal(result3.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "broken" lease
  });
});

describe("LeaseClient from Directory", () => {
  let serviceClient: DataLakeServiceClient;
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryName: string;
  let directoryClient: DataLakeDirectoryClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    serviceClient = await createDataLakeServiceClient("TokenCredential", { recorder });
    fileSystemName = getUniqueName("filesystem", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    directoryName = getUniqueName("dir", { recorder });
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(30 * 1000); // Wait 2x the lease duration to ensure expiry

    const result2 = await directoryClient.getProperties();
    // Handle race condition: leaseDuration may still be "fixed" or undefined depending on timing
    assert.isTrue(
      result2.leaseDuration === undefined || result2.leaseDuration === "fixed",
      `Expected leaseDuration to be undefined or 'fixed', but got '${result2.leaseDuration}'`,
    );
    assert.equal(result2.leaseState, "expired");
    // assert.equal(result2.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "expired" lease

    await leaseClient.renewLease();
    const result3 = await directoryClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await directoryClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(15);

    const result2 = await directoryClient.getProperties();
    assert.isUndefined(result2.leaseDuration);
    // Handle race condition: state could be either "breaking" or "broken" immediately after breakLease call
    if (result2.leaseState === "breaking") {
      assert.equal(result2.leaseStatus, "locked");
    } else if (result2.leaseState === "broken") {
      // leaseStatus may still be "locked" due to potential server bug
    } else {
      assert.fail(`Invalid leaseState: ${result2.leaseState}`);
    }

    await delay(30 * 1000); // Wait 2x the break period to ensure transition completes

    const result3 = await directoryClient.getProperties();
    assert.isUndefined(result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    // assert.equal(result3.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "broken" lease
  });
});
