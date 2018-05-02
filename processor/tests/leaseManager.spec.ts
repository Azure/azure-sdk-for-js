// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
const debug = debugModule("azure:event-hubs:lease-spec");
import { BlobLease } from "../lib/blobLease";
import { BlobLeaseManager } from "../lib/blobLeaseManager";
import { parseConnectionString, StorageConnectionStringModel } from "azure-event-hubs/lib/util/utils";
import * as dotenv from "dotenv";
dotenv.config();

describe("Blob Lease Manager", function () {
  this.timeout(10000);
  before("validate environment", function () {
    should.exist(process.env.STORAGE_CONNECTION_STRING,
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests.");
  });
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const config = parseConnectionString<StorageConnectionStringModel>(storageConnString!);

  it("should allow lease takeover", function (done) {
    const blobName = "testblob-" + uuid();
    const containerName = "testcontainer-" + uuid();
    const lease = BlobLease.createFromNameAndKey("host-1", config.AccountName,
      config.AccountKey, containerName, blobName);
    const m1 = new BlobLeaseManager("host-1", 15);
    let managedByM1 = false;
    m1.on(BlobLeaseManager.acquired, function () {
      debug(">>> Lease acquired and managed by M1..");
      managedByM1 = true;
      lease.isHeld.should.eql(true);
      debug(">>> Unmanaging the lease from M1..");
      m1.unmanageLease(lease);
    });
    const m2 = new BlobLeaseManager("host-2", 15);
    m2.on(BlobLeaseManager.acquired, function () {
      debug(">>> Lease acquired and managed by M2..");
      lease.isHeld.should.eql(true);
      debug(">>> Unmanaging the lease from M2..");
      m2.unmanageLease(lease);
    });
    m2.on(BlobLeaseManager.released, function () {
      managedByM1.should.equal(true);
      debug("As expected the lease is managed by M1...");
      done();
    });
    setTimeout(function () {
      debug("After 2 seconds M2 calls manage lease..");
      lease.hostName = "host-2";
      m2.manageLease(lease);
    }, 2000);
    debug(">>> M1 calls manage lease..");
    m1.manageLease(lease);
  });

  it("should manage several leases", function (done) {
    const blobNameRoot = "testblob-" + uuid();
    const containerName = "testcontainer-" + uuid();
    const m1 = new BlobLeaseManager("host-1", 15);
    const leases: any[] = [];
    m1.on(BlobLeaseManager.acquired, function (l) {
      debug(">>> Lease acquired and managed by M1..");
      l.isHeld.should.eql(true);
      leases[l.idx].held = true;
      if (leases.every(function (x) { return x.held; })) {
        leases.forEach(function (_l) { m1.unmanageLease(_l.lease); });
        done();
      }
    });

    for (let idx = 0; idx < 20; ++idx) {
      var details: any = {};
      details.blobName = blobNameRoot + "--" + idx;
      debug(">>> Creating lease for blob %s..", details.blobName);
      details.lease = BlobLease.createFromNameAndKey("host-1", config.AccountName,
        config.AccountKey, containerName, details.blobName);
      details.lease.idx = idx;
      leases.push(details);
      m1.manageLease(details.lease);
    }
  });
});