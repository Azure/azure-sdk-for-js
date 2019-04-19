// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import dotenv from "dotenv";
import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:iothub-spec");
import { EventHubClient } from "../src";
dotenv.config();

describe("EventHub Client with iothub connection string", function(): void {
  const service = { connectionString: process.env.IOTHUB_CONNECTION_STRING };
  let client: EventHubClient;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      process.env.IOTHUB_CONNECTION_STRING,
      "define IOTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
  });

  afterEach("close the connection", async function(): Promise<void> {
    if (client) {
      debug(">>> After Each, closing the client...");
      await client.close();
    }
  });

  it("should be able to get hub runtime info", async function(): Promise<void> {
    client = await EventHubClient.createFromIotHubConnectionString(service.connectionString!);
    const runtimeInfo = await client.getHubRuntimeInformation();
    debug(">>> RuntimeInfo: ", runtimeInfo);
    should.exist(runtimeInfo);
    runtimeInfo.type.should.equal("com.microsoft:eventhub");
    runtimeInfo.partitionCount.should.be.greaterThan(0);
    runtimeInfo.partitionIds.length.should.be.greaterThan(0);
  });

  it("should be able to receive messages from the event hub", async function(): Promise<void> {
    client = await EventHubClient.createFromIotHubConnectionString(service.connectionString!);
    const datas = await client.receiveBatch("0", 15, 10);
    debug(">>>> Received events from partition %s, %O", "0", datas);
  });
}).timeout(30000);
