// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import dotenv from "dotenv";
import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:eph:iothub-spec");
import {
  EventPosition,
  OnReceivedError,
  PartitionContext,
  EventData,
  OnReceivedMessage,
  EventProcessorHost
} from "../src";
import { delay } from "@azure/event-hubs";
dotenv.config();

describe("EPH with iothub connection string", function(): void {
  const iothubConnString = process.env.IOTHUB_CONNECTION_STRING;
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const hostName = EventProcessorHost.createHostName();
  let host: EventProcessorHost;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      process.env.IOTHUB_CONNECTION_STRING,
      "define IOTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
  });

  it("should be able to receive messages from the event hub associated with an iothub.", function(done: Mocha.Done): void {
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
          debug("Test logs: [%s] Rx message from '%s': '%O'", hostName, context.partitionId, data);
        };
        const onError: OnReceivedError = (err) => {
          debug("An error occurred while receiving the message: %O", err);
          throw err;
        };
        const runtimeInfo = await host.getHubRuntimeInformation();
        debug("Test logs: runtimeInfo: %O", runtimeInfo);
        // tslint:disable-next-line: no-unused-expression
        runtimeInfo.createdAt.should.exist;
        (typeof runtimeInfo.partitionCount).should.equal("number");
        await host.start(onMessage, onError);
        await delay(15000);
        await host.stop();
      } catch (err) {
        throw err;
      }
    };
    test()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}).timeout(60000);
