// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const should = chai.should();
const debug = debugModule("azure:eph:negative-spec");
import dotenv from "dotenv";
import {
  EventPosition,
  OnReceivedError,
  PartitionContext,
  EventData,
  OnReceivedMessage,
  EventProcessorHost
} from "../src";
dotenv.config();

describe("negative", function(): void {
  before("validate environment", function(): void {
    should.exist(
      process.env.STORAGE_CONNECTION_STRING,
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });
  const ehConnString = process.env.EVENTHUB_CONNECTION_STRING;
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const hubName = process.env.EVENTHUB_NAME;
  const hostName = EventProcessorHost.createHostName();
  let host: EventProcessorHost;
  it("should fail when trying to start an EPH that is already started.", function(done: Mocha.Done): void {
    const test = async () => {
      host = EventProcessorHost.createFromConnectionString(
        hostName,
        storageConnString!,
        EventProcessorHost.createHostName("tc"),
        ehConnString!,
        {
          eventHubPath: hubName!,
          initialOffset: EventPosition.fromEnqueuedTime(Date.now())
        }
      );
      const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
        debug("Test logs: [%s] Rx message from '%s': '%O'", hostName, context.partitionId, data);
      };
      const onError: OnReceivedError = (err) => {
        debug("An error occurred while receiving the message: %O", err);
        throw err;
      };
      await host.start(onMessage, onError);
      try {
        debug("Test logs: [%s] Trying to start second time.", hostName);
        await host.start(onMessage, onError);
        throw new Error("The second call to start() should have failed.");
      } catch (err) {
        err.message.should.match(/A partition manager cannot be started multiple times/gi);
      } finally {
        await host.stop();
        should.equal(host["_context"]["partitionManager"]["_isCancelRequested"], true);
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

  it("should fail when the eventhub name is incorrect.", function(done: Mocha.Done): void {
    host = EventProcessorHost.createFromConnectionString(
      hostName,
      storageConnString!,
      EventProcessorHost.createHostName("tc"),
      ehConnString!,
      {
        eventHubPath: "HeloooooooFooooooo",
        initialOffset: EventPosition.fromEnqueuedTime(Date.now())
      }
    );
    const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
      debug("Test logs: [%s] Rx message from '%s': '%O'", hostName, context.partitionId, data);
    };
    const onError: OnReceivedError = (err) => {
      debug("An error occurred while receiving the message: %O", err);
      throw err;
    };
    host
      .start(onMessage, onError)
      .then(() => {
        return Promise.reject(new Error("This statement should not have executed."));
      })
      .catch((err) => {
        debug("Err action: %s", err.action);
        err.action.should.equal("Getting PartitionIds");
        done();
      });
  });

  it("should fail when the eventhub namesapce is incorrect.", function(done: Mocha.Done): void {
    host = EventProcessorHost.createFromConnectionString(
      hostName,
      storageConnString!,
      EventProcessorHost.createHostName("tc"),
      "Endpoint=sb://HelooFooo.servicebus.windows.net/;SharedAccessKeyName=Foo;SharedAccessKey=Bar",
      {
        eventHubPath: hubName!,
        initialOffset: EventPosition.fromEnqueuedTime(Date.now())
      }
    );
    const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
      debug("Test logs: [%s] Rx message from '%s': '%O'", hostName, context.partitionId, data);
    };
    const onError: OnReceivedError = (err) => {
      debug("An error occurred while receiving the message: %O", err);
      throw err;
    };
    host
      .start(onMessage, onError)
      .then(() => {
        return Promise.reject(new Error("This statement should not have executed."));
      })
      .catch((err) => {
        debug("Err action: %s", err.action);
        err.action.should.equal("Getting PartitionIds");
        done();
      });
  });

  it("should fail when the storage connection string is incorrect.", function(done: Mocha.Done): void {
    try {
      host = EventProcessorHost.createFromConnectionString(
        hostName,
        "Hello World"!,
        EventProcessorHost.createHostName("tc"),
        ehConnString!,
        {
          eventHubPath: hubName!,
          initialOffset: EventPosition.fromEnqueuedTime(Date.now()),
          consumerGroup: "HelloWorld"
        }
      );
      done(new Error("creating eph should have failed."));
    } catch (err) {
      should.exist(err);
      err.message.should.match(/Connection strings must be of the form/gi);
      done();
    }
  });
});
