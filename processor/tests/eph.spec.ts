// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
import * as uuid from "uuid/v4";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const should = chai.should();
const debug = debugModule("azure:eph:eph-spec");
import { EventHubClient, EventData, EventPosition, delay } from "azure-event-hubs";
import * as dotenv from "dotenv";
import { PartitionContext, OnReceivedMessage, EventProcessorHost, OnReceivedError } from "../lib";
import { Dictionary } from "../lib/util/utils";
dotenv.config();

describe("EPH", function () {
  this.timeout(1200000);
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

  describe("single", function () {
    it("should checkpoint a single received event.", function (done) {
      const msgId = uuid();
      const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
      ehc.getPartitionIds().then((ids) => {
        debug(">>> Received partition ids: ", ids);
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        debug(">>>>> Sending the test message...");
        ehc.send({ body: "Test Message", properties: { message_id: msgId } }).then(() => {
          const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
            debug(">>>>> Rx message from '%s': '%s'", context.partitionId, data);
            if (data.properties!.message_id === msgId) {
              debug(">>>> Checkpointing the received message...");
              context.checkpoint().then(() => {
                debug(">>>> Checkpoint succesful...");
                return context["_context"].blobReferenceByPartition[context.partitionId].getContent();
              }).then((content) => {
                debug(">>>> Seen expected message. New lease contents: %s", content);
                const parsed = JSON.parse(content);
                parsed.offset.should.eql(data.offset);
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
          const onError: OnReceivedError = (err) => {
            debug("An error occurred while receiving the message: %O", err);
            done(err);
          };
          return host.start(onMessage, onError);
        });
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe("multiple", function () {
    it("should be able to run multiple eph successfully.", async function () {
      const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
      const containerName: string = `sharedhost-${uuid()}`;
      const now = Date.now();
      const hostByName: Dictionary<EventProcessorHost> = {};
      const sendDataByPartition: Dictionary<EventData> = {};
      const getReceivingFromPartitionsForAllEph = (): Dictionary<string[]> => {
        const receivingPartitionsByHost: Dictionary<string[]> = {};
        for (const hostName in hostByName) {
          receivingPartitionsByHost[hostName] = hostByName[hostName].receivingFromPartitions;
        }
        debug(">>> EPH -> Partitions: \n%O", receivingPartitionsByHost);
        return receivingPartitionsByHost;
      };

      const sendEvents = async (ids: string[]) => {
        for (let i = 0; i < ids.length; i++) {
          const data: EventData = {
            body: `Hello World - ${ids[i]}!!`
          }
          sendDataByPartition[ids[i]] = data;
          await ehc.send(data, ids[i]);
          debug(">>> Sent data to partition: %s", ids[i]);
        }
      };

      const ids = await ehc.getPartitionIds();
      for (let i = 0; i < ids.length; i++) {
        const hostName = `host-${i}`;
        hostByName[hostName] = EventProcessorHost.createFromConnectionString(
          hostName,
          storageConnString!,
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(now),
            leasecontainerName: containerName
          }
        );

        const onError: OnReceivedError = (error: Error) => {
          debug(`>>> [%s] Received error: %O`, hostName, error);
          throw error;
        };
        const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
          debug(">>> [%s] Rx message from '%s': '%O'", hostName, context.partitionId, data);
          should.equal(sendDataByPartition[context.partitionId].body, data.body);
        };
        hostByName[hostName].start(onMessage, onError);
        debug(">>> Sleeping for 8 seconds after starting %s.", hostName);
        await delay(8000);
        debug(">>> [%s] currently receiving messages from partitions : %o", hostName,
          hostByName[hostName].receivingFromPartitions);
      }
      debug(">>> Sleeping for another 15 seconds.")
      await delay(15000);
      const hostToPartition = getReceivingFromPartitionsForAllEph();
      for (const host in hostToPartition) {
        should.equal(Array.isArray(hostToPartition[host]), true);
        hostToPartition[host].length.should.eql(1);
      }
      await sendEvents(ids);
      await delay(5000);
      await ehc.close();
      for (const host in hostByName) {
        await hostByName[host].stop();
      }
    });
  });
});