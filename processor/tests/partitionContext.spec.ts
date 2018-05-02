// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
import * as assert from "assert";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
import * as uuid from "uuid/v4";
const debug = debugModule("azure:event-hubs:lease-spec");
import { PartitionContext } from "../lib/partitionContext"
import { BlobLease } from "../lib/blobLease";
import { BlobLeaseManager } from "../lib/blobLeaseManager";
import { parseConnectionString, StorageConnectionStringModel } from "../lib/util/utils";
import * as dotenv from "dotenv";
dotenv.config();

describe("Partition Context", function () {
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
    const partitionContext = new PartitionContext("0", "host-1", lease);
    let checkpointInfo: any;
    m1.on(BlobLeaseManager.acquired, function () {
      debug(">>> Lease acquired and managed by M1..");
      lease.isHeld.should.eql(true);
      partitionContext.setCheckpointInfo("host-1", "some-token", 120, "12334343", 343434);
      partitionContext.checkpoint().then((info) => {
        checkpointInfo = info;
        debug(">>> Checkpoint info: %O", checkpointInfo);
        return lease.getContent();
      }).then((content) => {
        let data: any;
        try {
          data = JSON.parse(content);
          debug(">>>> Parsed json content: %O", data);
          assert.deepEqual(data, checkpointInfo);
          debug(">>> The checkpointed info and the content of the blob is the same...");
          debug(">>> Unmanaging the lease from M1..");
          m1.unmanageLease(lease);
          done();
        } catch (err) {
          debug("An error occurred while parsing the content from the lease.. %O", err);
          debug(">>> Unmanaging the lease from M1..");
          m1.unmanageLease(lease);
          done(err);
        }
      }).catch(done);

    });
    m1.manageLease(lease);
  });
});