// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
const debug = debugModule("azure:event-hubs:lease-spec");
import { BlobLease } from "../lib/eph/blobLease";
import { parseConnectionString, StorageConnectionString } from "../lib/util/utils";
import * as dotenv from "dotenv";
dotenv.config();

describe("Blob Lease", function () {
  before("validate environment", function () {
    should.exist(process.env.STORAGE_CONNECTION_STRING,
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests.");
  });
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const config = parseConnectionString<StorageConnectionString>(storageConnString!);

  it("should acquire and release a lease", async function () {
    const blobName = "testblob-" + uuid();
    const containerName = "testcontainer-" + uuid();
    const lease = BlobLease.createFromNameAndKey("host-1", config.AccountName,
      config.AccountKey, containerName, blobName);

    await lease.acquire({ leaseDuration: 15 });
    debug(">>>> Lease acquired...");
    lease.isHeld.should.eql(true);
    await lease.updateContent("Testing update");
    const content = await lease.getContent();
    content.should.eql("Testing update");
    await lease.release();
    debug(">>>> Lease released...");
    lease.isHeld.should.eql(false);
  });

  it("should acquire a lease and renew it before expiry.", async function () {
    const blobName = "testblob-" + uuid();
    const containerName = "testcontainer-" + uuid();
    const lease = BlobLease.createFromNameAndKey("host-1", config.AccountName,
      config.AccountKey, containerName, blobName);

    await lease.acquire({ leaseDuration: 15 });
    debug(">>>> Lease acquired... %O", lease);
    lease.isHeld.should.eql(true);
    await lease.updateContent("Testing update");
    const content = await lease.getContent();
    content.should.eql("Testing update");
    await lease.renew({ leaseDuration: 10 });
    debug(">>>> Lease renewed... %O", lease);
    await lease.release();
    debug(">>>> Lease released...");
    lease.isHeld.should.eql(false);
  });

  it("should fail when trying to acquire the same lease while it is held", async function () {
    const blobName = "testblob-" + uuid();
    const containerName = "testcontainer-" + uuid();
    const lease = BlobLease.createFromNameAndKey("host-1", config.AccountName,
      config.AccountKey, containerName, blobName);

    await lease.acquire({ leaseDuration: 15 });
    debug(">>>> Lease acquired...");
    lease.isHeld.should.eql(true);
    await lease.updateContent("Testing update");
    const content = await lease.getContent();
    content.should.eql("Testing update");
    try {
      debug(">>>> Acquiring Lease again while it is already acquired...");
      await lease.acquire({ leaseDuration: 15 });
      debug(">>>> Acquired lease again...");
    } catch (err) {
      should.exist(err);
      console.log(err.message);
      should.equal(true, RegExp(".*There is already a lease present.*").test(err.message));
    }
    await lease.release();
    debug(">>>> Lease released...");
    lease.isHeld.should.eql(false);
  });

  it("interplay between two leases lease1 and lease2 should function correctly", async function () {
    const blobName = "testblob-" + uuid();
    const containerName = "testcontainer-" + uuid();
    const lease1 = BlobLease.createFromNameAndKey("host-1", config.AccountName,
      config.AccountKey, containerName, blobName);
    const lease2 = BlobLease.createFromNameAndKey("host-2", config.AccountName,
      config.AccountKey, containerName, blobName);
    await lease1.acquire({ leaseDuration: 20 });
    debug(">>>> Lease acquired...");
    lease1.isHeld.should.eql(true);
    await lease1.updateContent("Testing update");
    const content = await lease1.getContent();
    content.should.eql("Testing update");
    try {
      debug(">>>> Acquiring Lease again while it is already acquired...");
      await lease2.acquire({ leaseDuration: 15 });
      debug(">>>> Acquired lease again...");
    } catch (err) {
      debug(">>> Expected error occured while acquiring the lease: %O", err);
      should.exist(err);
      console.log(err.message);
      should.equal(true, RegExp(".*There is already a lease present.*").test(err.message));
    }
    await lease1.release();
    debug(">>>> Lease released...");
    lease1.isHeld.should.eql(false);
    debug(">>>> Acquiring Lease for lease2 after it is released from lease1...");
    await lease2.acquire({ leaseDuration: 15 });
    debug(">>>> Acquired lease again...");
    lease2.isHeld.should.eql(true);
    await lease2.updateContent("Testing update");
    const content2 = await lease2.getContent();
    content2.should.eql("Testing update");
    await lease2.release();
    debug(">>>> Lease released...");
    lease2.isHeld.should.eql(false);
  });
});