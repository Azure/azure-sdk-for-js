// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as dotenv from "dotenv";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:eph:iothub-spec");
import {
  EventPosition, OnReceivedError, PartitionContext, EventData, OnReceivedMessage, EventProcessorHost
} from "../lib";
import { delay } from "@azure/amqp-common";
dotenv.config();

describe("EPH with iothub connection string", function () {
  this.timeout(60000);
  const iothubConnString = process.env.IOTHUB_CONNECTION_STRING;
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const hostName = EventProcessorHost.createHostName();
  let host: EventProcessorHost;
  before("validate environment", async function () {
    should.exist(process.env.IOTHUB_CONNECTION_STRING,
      "define IOTHUB_CONNECTION_STRING in your environment before running integration tests.");
  });

  it("should be able to receive messages from the event hub associated with an iothub.", function (done) {
    const test = async () => {
      try {
        host = await EventProcessorHost.createFromIotHubConnectionString(
          hostName,
          storageConnString!,
          EventProcessorHost.createHostName("iot"),
          iothubConnString!,
          {
            initialOffset: EventPosition.fromEnqueuedTime(Date.now()),
            leaseDuration: 20,
            leaseRenewInterval: 10
          }
        );
        const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
          debug(">>> [%s] Rx message from '%s': '%O'", hostName, context.partitionId, data);
        };
        const onError: OnReceivedError = (err) => {
          debug("An error occurred while receiving the message: %O", err);
          throw err;
        };
        const runtimeInfo = await host.getHubRuntimeInformation();
        debug(">>>> runtimeInfo: %O", runtimeInfo);
        runtimeInfo.createdAt.should.exist;
        (typeof runtimeInfo.partitionCount).should.equal("number");
        await host.start(onMessage, onError);
        await delay(15000);
        await host.stop();
      } catch (err) {
        throw err;
      }
    }
    test().then(() => { done(); }).catch((err) => { done(err); });
  });
});