// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:iothub-spec");
import { earliestEventPosition } from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

describe("EventHub Client with iothub connection string", function(): void {
  const service = {
    connectionString: (env[EnvVarKeys.IOTHUB_EH_COMPATIBLE_CONNECTION_STRING] as string) || ""
  };
  let client: EventHubClient;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.IOTHUB_EH_COMPATIBLE_CONNECTION_STRING],
      "define IOTHUB_EH_COMPATIBLE_CONNECTION_STRING in your environment before running integration tests."
    );
  });

  afterEach("close the connection", async function(): Promise<void> {
    if (client) {
      debug(">>> After Each, closing the client...");
      await client.close();
    }
  });

  it("should be able to get hub runtime info", async function(): Promise<void> {
    client = new EventHubClient(service.connectionString);
    const runtimeInfo = await client.getProperties();
    debug(">>> RuntimeInfo: ", runtimeInfo);
    should.exist(runtimeInfo, `RuntimeIno does not exist. Found ${runtimeInfo}`);
    should.equal(
      runtimeInfo.partitionIds.length > 0,
      true,
      `partitionIds.length is not > 0 and found ${runtimeInfo.partitionIds.length}`
    );
  });

  it("should be able to receive messages from the event hub", async function(): Promise<void> {
    client = new EventHubClient(service.connectionString);
    const receiver = client.createConsumer(
      EventHubClient.defaultConsumerGroupName,
      "0",
      earliestEventPosition
    );
    const datas = await receiver.receiveBatch(15, 10);
    debug(">>>> Received events from partition %s, %O", "0", datas);
  });
}).timeout(30000);
