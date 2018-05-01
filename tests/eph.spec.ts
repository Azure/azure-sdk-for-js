// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
import * as uuid from "uuid/v4";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const should = chai.should();
const debug = debugModule("azure:event-hubs:eph-spec");
import { EventHubClient, EventProcessorHost, OnEphOpen, EventData, EventPosition, delay } from "../lib";
import * as dotenv from "dotenv";
import { BlobLeaseManager } from "../lib/eph/blobLeaseManager";
import { PartitionContext, OnEphMessage } from "../lib/eph";
import { executePromisesSequentially } from "../lib/util/utils";
dotenv.config();

describe("EPH", function () {
  this.timeout(60000);
  before("validate environment", function () {
    should.exist(process.env.STORAGE_CONNECTION_STRING,
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests.");
    should.exist(process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.");
    should.exist(process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests.");
  });
  const ehConnString = process.env.EVENTHUB_CONNECTION_STRING;
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const hubName = process.env.EVENTHUB_NAME;
  let host: EventProcessorHost;

  describe('start', function () {
    beforeEach('create the event processor host', function () {
      host = EventProcessorHost.createFromConnectionString(
        EventProcessorHost.createHostName(),
        storageConnString!,
        ehConnString!,
        {
          eventHubPath: hubName!
        }
      );
    });

    afterEach('stop the event processor host', async function () {
      if (host) {
        await host.stop();
      }
    });
    it('starts an Event Processor Host', function () {
      return host.start().should.be.fulfilled;
    });
  });

  describe("single", function () {
    it("should checkpoint a single received event.", function (done) {
      const partitions: { [x: string]: boolean } = {};
      const msgId = uuid();
      const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
      ehc.getPartitionIds().then((ids) => {
        debug(">>> Received partition ids: ", ids);
        ids.map((id) => { partitions[id] = false; });
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const onOpen: OnEphOpen = (context: PartitionContext) => {
          partitions[context.partitionId] = true;
          let allSet = true;
          for (const p in partitions) {
            if (!partitions.hasOwnProperty(p)) continue;
            if (!partitions[p]) allSet = false;
          }
          if (allSet) {
            debug(">>>>> Sending the test message...");
            ehc.send({ body: "Test Message", properties: { message_id: msgId } });
          }
        };
        const onMessage: OnEphMessage = (context: PartitionContext, data: EventData) => {
          debug(">>>>> Rx message from '%s': '%s'", context.partitionId, data.body.toString('utf8'));
          if (data.properties!.message_id === msgId) {
            debug(">>>> Checkpointing the received message...");
            context.checkpoint().then(function () {
              debug(">>>> Checkpoint succesful...");
              return context.lease.getContent();
            }).then(function (content) {
              debug(">>>> Seen expected message. New lease contents: %s", content);
              const parsed = JSON.parse(content);
              parsed.Offset.should.eql(data.offset);
            }).then(() => {
              return ehc.close();
            }).then(() => {
              return host.stop();
            }).then(() => {
              debug(">>>> closed the sender and the eph...");
              return done();
            }).catch((err) => {
              done(err);
            });
          }
        };
        host.on(EventProcessorHost.opened, onOpen);
        host.on(EventProcessorHost.message, onMessage);
        return host.start();
      });
    });
  });

  describe("multiple", function () {
    it("should be able to run multiple eph successfully.", function (done) {
      const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
      const containerName: string = `sharedhost-${uuid()}`;
      let host1: EventProcessorHost, host2: EventProcessorHost;
      const now = Date.now();
      const h1 = EventProcessorHost.createHostName("host1");
      const h2 = EventProcessorHost.createHostName("host2");
      let sends: any[] = [];
      host1 = EventProcessorHost.createFromConnectionString(
        h1,
        storageConnString!,
        ehConnString!,
        {
          eventHubPath: hubName!,
          initialOffset: EventPosition.fromEnqueuedTime(now),
          leasecontainerName: containerName,
          leaseManager: new BlobLeaseManager(h1, 20)
        }
      );
      let counter1 = 0;
      const onMessage1: OnEphMessage = (context: PartitionContext, data: EventData) => {
        counter1++;
        debug(">>>>>[host1] Rx message from '%s': '%s'", context.partitionId, data.body.toString('utf8'));
        debug("&&&&&&& counter1: %d", counter1);
        if (counter1 >= 90) {
          debug("#### host1 counter %d, now closing it.", counter1);
          host1.stop().catch((err) => { debug("an error occured while closing host2: %O", err); });
        }
      };
      host1.on(EventProcessorHost.message, onMessage1);
      host2 = EventProcessorHost.createFromConnectionString(
        h2,
        storageConnString!,
        ehConnString!,
        {
          eventHubPath: hubName!,
          initialOffset: EventPosition.fromEnqueuedTime(now),
          leasecontainerName: containerName,
          leaseManager: new BlobLeaseManager(h2, 18)
        }
      );
      let counter2 = 0;
      const onMessage2: OnEphMessage = (context: PartitionContext, data: EventData) => {
        counter2++;
        debug(">>>>>[host2] Rx message from '%s': '%s'", context.partitionId, data.body.toString('utf8'));
        debug("&&&&&&& counter2: %d", counter2);
        if (counter2 >= 3) {
          debug("#### host2 counter %d, now closing it.", counter2);
          host2.stop().then(() => {
            debug("#### closing the client created for sending messages...", counter2);
            return ehc.close();
          }).then(done).catch((err) => {
            debug("an error occured while closing host2: %O", err);
            done(err);
          });
        }
      };
      host2.on(EventProcessorHost.message, onMessage2);
      Promise.all([
        host1.start(),
        host2.start()
      ]).then(() => {
        debug("**************************Delaying for 4 seconds..*********************.");
        return delay(4000);
      }).then(() => {
        return ehc.getPartitionIds();
      }).then((ids) => {
        for (const id of ids) {
          for (let i = 1; i <= 30; i++) {
            const data: EventData = { body: `Sending message - ${i} to partition id: ${id}.` };
            sends.push(() => ehc.send(data, id));
          }
        }
        return executePromisesSequentially(sends);
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('stop', function () {
    beforeEach('create the event processor host', function () {
      host = EventProcessorHost.createFromConnectionString(
        EventProcessorHost.createHostName(),
        storageConnString!,
        ehConnString!,
        {
          eventHubPath: hubName!
        }
      );
    });

    afterEach('stop the event processor host', async function () {
      await host.stop();
    });
    it('is a no-op when the EPH has not been started', function () {
      return host.stop().should.be.fulfilled;
    });

    it('stops a started EPH', function () {
      return host.start()
        .then(function () {
          return host.stop().should.be.fulfilled;
        });
    });
  });
});