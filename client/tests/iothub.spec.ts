// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as dotenv from "dotenv";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:iothub-spec");
import { EventHubClient } from "../lib";
dotenv.config();

describe("EventHub Client with iothub connection string", function () {
  this.timeout(30000);
  const service = { connectionString: process.env.IOTHUB_CONNECTION_STRING };
  let client: EventHubClient;
  before("validate environment", async function () {
    should.exist(process.env.IOTHUB_CONNECTION_STRING,
      "define IOTHUB_CONNECTION_STRING in your environment before running integration tests.");
  });

  afterEach("close the connection", async function () {
    if (client) {
      debug(">>> After Each, closing the client...");
      await client.close();
    }
  });

  it("should be able to get hub runtime info", async function () {
    client = await EventHubClient.createFromIotHubConnectionString(service.connectionString!);
    const runtimeInfo = await client.getHubRuntimeInformation();
    debug(">>> RuntimeInfo: ", runtimeInfo);
    should.exist(runtimeInfo);
    runtimeInfo.type.should.equal("com.microsoft:eventhub");
    runtimeInfo.partitionCount.should.be.greaterThan(0);
    runtimeInfo.partitionIds.length.should.be.greaterThan(0);
  });

  it("should be able to receive messages from the event hub", async function () {
    client = await EventHubClient.createFromIotHubConnectionString(service.connectionString!);
    const datas = await client.receiveBatch("0", 15, 10);
    debug(">>>> Received events from partition %s, %O", "0", datas);
  });
});