// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import os from "os";
import { v4 as uuid } from "uuid";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import debugModule from "debug";
const should = chai.should();
const debug = debugModule("azure:eph:eph-spec");
import { EventHubClient, EventData, EventPosition, delay, Dictionary } from "@azure/event-hubs";
import dotenv from "dotenv";
import { PartitionContext, OnReceivedMessage, EventProcessorHost, OnReceivedError } from "../src";
import { packageInfo } from "../src/util/constants";
dotenv.config();

describe("EPH", function(): void {
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
  let host: EventProcessorHost;

  describe("user-agent", function(): void {
    it("should be populated correctly as a part of the connection property", function(done: Mocha.Done): void {
      host = EventProcessorHost.createFromConnectionString(
        EventProcessorHost.createHostName(),
        storageConnString!,
        "test-container",
        ehConnString!,
        {
          eventHubPath: hubName!
        }
      );
      const context = host["_context"];
      const uaPrefix = `azsdk-js-azureeventprocessorhost/${packageInfo.version} `;
      context.userAgent.should.include(uaPrefix);
      context.userAgent.should.include(
        `NODE-VERSION ${process.version}; ${os.type()} ${os.release()}`
      );
      const ehc: EventHubClient = context.getEventHubClient();
      const properties = ehc["_context"].connection.options.properties;
      properties["user-agent"].should.include(uaPrefix);
      should.equal(properties.product, "MSJSClient");
      done();
    });

    it("should support appending custom user-agent", function(done: Mocha.Done): void {
      const customua = "my-custom-string";
      host = EventProcessorHost.createFromConnectionString(
        EventProcessorHost.createHostName(),
        storageConnString!,
        "test-container",
        ehConnString!,
        {
          eventHubPath: hubName!,
          userAgent: customua
        }
      );
      const context = host["_context"];
      const uaPrefix = `azsdk-js-azureeventprocessorhost/${packageInfo.version} `;
      context.userAgent.should.startWith(uaPrefix);
      context.userAgent.should.endWith(customua);
      const ehc: EventHubClient = context.getEventHubClient();
      const properties = ehc["_context"].connection.options.properties;
      properties["user-agent"].should.include(uaPrefix);
      properties["user-agent"].should.endWith(customua);
      should.equal(properties.product, "MSJSClient");
      done();
    });
  });

  describe("single", function(): void {
    it("should checkpoint messages in order", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const messageCount = 100;
        const datas: EventData[] = [];
        for (let i = 0; i < messageCount; i++) {
          const obj: EventData = { body: `Hello foo ${i}` };
          datas.push(obj);
        }
        const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
        await ehc.sendBatch(datas, "0");
        await ehc.close();
        debug("Sent batch message successfully");
        let num = 0;
        let offset = "0";
        let sequence = 0;
        let doneCheckpointing = false;
        const onMessage = async (context: PartitionContext, data: EventData) => {
          ++num;
          debug("num: %d", num);
          if (num % 10 === 0) {
            const cpointNum = num;
            try {
              await context.checkpoint();
              debug("Done checkpointing: %d", cpointNum);
              if (num === 100) {
                offset = data.offset as string;
                sequence = data.sequenceNumber as number;
                doneCheckpointing = true;
              }
            } catch (err) {
              debug("An error occurred while checkpointing msg number %d: %O", num, err);
            }
          }
        };
        const onError: OnReceivedError = (err) => {
          debug("An error occurred while receiving the message: %O", err);
          throw err;
        };
        await host.start(onMessage, onError);
        while (!doneCheckpointing) {
          debug("Not done checkpointing -> %s, sleeping for 10 more seconds.", doneCheckpointing);
          await delay(10000);
        }
        debug("sleeping for 10 more seconds..");
        await delay(10000);
        const stringContent = await host["_context"].blobReferenceByPartition["0"].getContent();
        const content = JSON.parse(stringContent);
        debug("Fetched content from blob is: %o", content);
        content.offset.should.equal(offset);
        content.sequenceNumber.should.equal(sequence);
        await host.stop();
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should checkpoint a single received event.", function(done: Mocha.Done): void {
      const msgId = uuid();
      const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
      ehc
        .getPartitionIds()
        .then((ids) => {
          debug("Test logs: Received partition ids: ", ids);
          host = EventProcessorHost.createFromConnectionString(
            EventProcessorHost.createHostName(),
            storageConnString!,
            EventProcessorHost.createHostName("single"),
            ehConnString!,
            {
              eventHubPath: hubName!,
              initialOffset: EventPosition.fromEnqueuedTime(Date.now())
            }
          );
          debug("Test logs: Sending the test message...");
          ehc
            .send({ body: "Test Message", properties: { message_id: msgId } })
            .then(() => {
              const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
                debug("Test logs: Rx message from '%s': '%s'", context.partitionId, data);
                if (data.properties!.message_id === msgId) {
                  debug("Test logs: Checkpointing the received message...");
                  context
                    .checkpoint()
                    .then(() => {
                      debug("Test logs: Checkpoint succesful...");
                      return context["_context"].blobReferenceByPartition[
                        context.partitionId
                      ].getContent();
                    })
                    .then((content) => {
                      debug("Test logs: Seen expected message. New lease contents: %s", content);
                      const parsed = JSON.parse(content);
                      parsed.offset.should.eql(data.offset);
                    })
                    .then(() => {
                      return ehc.close();
                    })
                    .then(() => {
                      return host.stop();
                    })
                    .then(() => {
                      debug("Test logs: closed the sender and the eph...");
                      return done();
                    })
                    .catch((err) => {
                      done(err);
                    });
                }
              };
              const onError: OnReceivedError = (err) => {
                debug("An error occurred while receiving the message: %O", err);
                done(err);
              };
              return host.start(onMessage, onError);
            })
            .catch((err) => {
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should be able to receive messages from the checkpointed offset.", function(done: Mocha.Done): void {
      const test = async () => {
        const msgId = uuid();
        const ehc = EventHubClient.createFromConnectionString(ehConnString!, hubName!);
        const leasecontainerName = EventProcessorHost.createHostName("tc");
        debug("Test logs: Lease container name: %s", leasecontainerName);
        async function sendAcrossAllPartitions(
          ehc: EventHubClient,
          ids: string[]
        ): Promise<Dictionary<EventData>> {
          const result: Promise<any>[] = [];
          const idMessage: Dictionary<EventData> = {};
          for (const id of ids) {
            const data = { body: "Test Message - " + id, properties: { message_id: msgId } };
            idMessage[id] = data;
            result.push(ehc.send(data, id));
          }
          await Promise.all(result);
          debug("Test logs: Successfully finished sending messages.. %O", idMessage);
          return idMessage;
        }

        const ids = await ehc.getPartitionIds();
        debug("Test logs: Received partition ids: ", ids);
        host = EventProcessorHost.createFromConnectionString(
          "my-eph-1",
          storageConnString!,
          leasecontainerName,
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now()),
            startupScanDelay: 15,
            leaseRenewInterval: 5,
            leaseDuration: 15
          }
        );
        await delay(1000);
        debug("Test logs: Sending the first set of test messages...");
        const firstSend = await sendAcrossAllPartitions(ehc, ids);
        let count = 0;
        const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
          const partitionId = context.partitionId;
          debug("Test logs: Rx message from '%s': '%o'", partitionId, data);
          if (data.properties!.message_id === firstSend[partitionId].properties!.message_id) {
            debug("Test logs: Checkpointing the received message...");
            await context.checkpoint();
            count++;
          } else {
            const msg =
              `Sent message id '${data.properties!.message_id}' did not match the ` +
              `received message id '${firstSend[partitionId].properties!.message_id}' for ` +
              `partitionId '${partitionId}'.`;
            throw new Error(msg);
          }
        };
        const onError: OnReceivedError = (err) => {
          debug("An error occurred while receiving the message: %O", err);
          throw err;
        };
        debug("Test logs: Starting my-eph-1");
        await host.start(onMessage, onError);
        while (count < ids.length) {
          await delay(10000);
          debug("Test logs: number of partitionIds: %d, count: %d", ids.length, count);
        }
        await host.stop();

        debug(
          "Test logs: Restarting the same host. This time the initial offset should be ignored, and " +
            "the EventPosition should be from the checkpointed offset.."
        );
        debug("Test logs: Sending the second set of test messages...");
        const secondSend = await sendAcrossAllPartitions(ehc, ids);
        let count2 = 0;
        const onMessage2: OnReceivedMessage = async (
          context: PartitionContext,
          data: EventData
        ) => {
          const partitionId = context.partitionId;
          debug("Test logs: Rx message from '%s': '%s'", partitionId, data);
          if (data.properties!.message_id === secondSend[partitionId].properties!.message_id) {
            debug("Test logs: Checkpointing the received message...");
            await context.checkpoint();
            count2++;
          } else {
            const msg =
              `Sent message id '${data.properties!.message_id}' did not match the ` +
              `received message id '${secondSend[partitionId].properties!.message_id}' for ` +
              `partitionId '${partitionId}'.`;
            throw new Error(msg);
          }
        };
        const onError2: OnReceivedError = (err) => {
          debug("An error occurred while receiving the message: %O", err);
          throw err;
        };
        debug("Test logs: Starting my-eph-2");
        await host.start(onMessage2, onError2);
        while (count2 < ids.length) {
          await delay(10000);
          debug("Test logs: number of partitionIds: %d, count: %d", ids.length, count);
        }
        debug("Test logs: sleeping for 10 more seconds....");
        await delay(10000);
        await host.stop();
        await ehc.close();
        if (count2 > ids.length) {
          throw new Error("We received more messages than we were expecting...");
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
  });

  describe("multiple", function(): void {
    it("should be able to run multiple eph successfully.", function(done: Mocha.Done): void {
      const test = async () => {
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
          debug("Test logs: EPH -> Partitions: \n%O", receivingPartitionsByHost);
          return receivingPartitionsByHost;
        };

        const sendEvents = async (ids: string[]) => {
          for (let i = 0; i < ids.length; i++) {
            const data: EventData = {
              body: `Hello World - ${ids[i]}!!`
            };
            sendDataByPartition[ids[i]] = data;
            await ehc.send(data, ids[i]);
            debug("Test logs: Sent data to partition: %s", ids[i]);
          }
        };

        const ids = await ehc.getPartitionIds();
        for (let i = 0; i < ids.length; i++) {
          const hostName = `host-${i}`;
          hostByName[hostName] = EventProcessorHost.createFromConnectionString(
            hostName,
            storageConnString!,
            containerName,
            ehConnString!,
            {
              eventHubPath: hubName!,
              initialOffset: EventPosition.fromEnqueuedTime(now)
            }
          );

          const onError: OnReceivedError = (error: Error) => {
            debug(`Test logs: [%s] Received error: %O`, hostName, error);
            throw error;
          };
          const onMessage: OnReceivedMessage = (context: PartitionContext, data: EventData) => {
            debug(
              "Test logs: [%s] Rx message from '%s': '%O'",
              hostName,
              context.partitionId,
              data
            );
            should.equal(sendDataByPartition[context.partitionId].body, data.body);
          };
          await hostByName[hostName].start(onMessage, onError);
          debug("Test logs: Sleeping for 8 seconds after starting %s.", hostName);
          await delay(8000);
          debug(
            "Test logs: [%s] currently receiving messages from partitions : %o",
            hostName,
            hostByName[hostName].receivingFromPartitions
          );
        }
        debug("Test logs: Sleeping for another 15 seconds.");
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
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("runtimeInfo", function(): void {
    it("should get hub runtime info correctly", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const hubRuntimeInfo = await host.getHubRuntimeInformation();
        should.equal(Array.isArray(hubRuntimeInfo.partitionIds), true);
        should.equal(typeof hubRuntimeInfo.partitionCount, "number");
        await host.stop();
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should get partition runtime info correctly with partitionId as string", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const partitionInfo = await host.getPartitionInformation("0");
        debug("Test logs: partitionInfo: %o", partitionInfo);
        partitionInfo.partitionId.should.equal("0");
        partitionInfo.type.should.equal("com.microsoft:partition");
        partitionInfo.hubPath.should.equal(hubName);
        partitionInfo.lastEnqueuedTimeUtc.should.be.instanceof(Date);
        should.exist(partitionInfo.lastSequenceNumber);
        should.exist(partitionInfo.lastEnqueuedOffset);
        await host.stop();
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should get partition runtime info correctly with partitionId as number", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const partitionInfo = await host.getPartitionInformation(0);
        partitionInfo.partitionId.should.equal("0");
        partitionInfo.type.should.equal("com.microsoft:partition");
        partitionInfo.hubPath.should.equal(hubName);
        partitionInfo.lastEnqueuedTimeUtc.should.be.instanceof(Date);
        should.exist(partitionInfo.lastSequenceNumber);
        should.exist(partitionInfo.lastEnqueuedOffset);
        await host.stop();
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should fail getting partition information when partitionId is not a string or number", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        try {
          await host.getPartitionInformation(false as any);
        } catch (err) {
          err.message.should.equal(
            "'partitionId' is a required parameter and must be of type: 'string' | 'number'."
          );
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

    it("should fail getting partition information when partitionId is empty string", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        try {
          await host.getPartitionInformation("");
        } catch (err) {
          err.message.should.match(
            /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
          );
        } finally {
          await host.stop();
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

    it("should fail getting partition information when partitionId is a negative number", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehConnString!,
          {
            eventHubPath: hubName!,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        try {
          await host.getPartitionInformation(-1);
        } catch (err) {
          err.message.should.match(
            /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
          );
        } finally {
          await host.stop();
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
  });

  describe("options", function(): void {
    it("should throw an error if the event hub name is neither provided in the connection string and nor in the options object", function(done: Mocha.Done): void {
      try {
        const ehc =
          "Endpoint=sb://foo.bar.baz.net/;SharedAccessKeyName=somekey;SharedAccessKey=somesecret";
        EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          ehc,
          {
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
      } catch (err) {
        should.exist(err);
        err.message.match(
          /.*Either provide "path" or the "connectionString": "Endpoint=sb:\/\/foo\.bar\.baz\.net\/;SharedAccessKeyName=somekey;SharedAccessKey=somesecret", must contain EntityPath="<path-to-the-entity>.*"/gi
        );
        done();
      }
    });

    it("should get hub runtime info correctly when eventhub name is present in connection string but not as an option in the options object.", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          `${ehConnString!};EntityPath=${hubName!}`,
          {
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const hubRuntimeInfo = await host.getHubRuntimeInformation();
        hubRuntimeInfo.path.should.equal(hubName);
        should.equal(Array.isArray(hubRuntimeInfo.partitionIds), true);
        should.equal(typeof hubRuntimeInfo.partitionCount, "number");
        await host.stop();
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("when eventhub name is present in connection string and in the options object, the one in options object is selected.", function(done: Mocha.Done): void {
      const test = async () => {
        host = EventProcessorHost.createFromConnectionString(
          EventProcessorHost.createHostName(),
          storageConnString!,
          EventProcessorHost.createHostName("single"),
          `${ehConnString!};EntityPath=foo`,
          {
            eventHubPath: hubName,
            initialOffset: EventPosition.fromEnqueuedTime(Date.now())
          }
        );
        const hubRuntimeInfo = await host.getHubRuntimeInformation();
        hubRuntimeInfo.path.should.equal(hubName);
        should.equal(Array.isArray(hubRuntimeInfo.partitionIds), true);
        should.equal(typeof hubRuntimeInfo.partitionCount, "number");
        await host.stop();
      };
      test()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
}).timeout(1200000);
