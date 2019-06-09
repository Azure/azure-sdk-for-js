// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:sender-spec");
import { EventHubClient, EventData } from "../src";
import dotenv from "dotenv";
dotenv.config();

describe("EventHub Sender", function(): void {
  const service = { connectionString: process.env.EVENTHUB_CONNECTION_STRING, path: process.env.EVENTHUB_NAME };
  const client: EventHubClient = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
  before("validate environment", function(): void {
    should.exist(
      process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  after("close the connection", async function(): Promise<void> {
    debug("Closing the client..");
    await client.close();
  });

  describe("Batch message", function(): void {
    it("should be sent successfully.", async function(): Promise<void> {
      const data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      await client.createSender().send(data);
    });
    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      await client.createSender().send(data, { partitionKey: 1 as any });
    });
    it("should be sent successfully to a specific partition.", async function(): Promise<void> {
      const data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      await client.createSender({ partitionId: "0" }).send(data);
    });
  });

  describe("Multiple messages", function(): void {
    it("should be sent successfully in parallel", async function(): Promise<void> {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(client.createSender().send([{ body: `Hello World ${i}` }]));
      }
      await Promise.all(promises);
    });
    it("should be sent successfully in parallel by multiple senders", async function(): Promise<void> {
      const senderCount = 3;
      try {
        const promises = [];
        for (let i = 0; i < senderCount; i++) {
          if (i === 0) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(client.createSender({ partitionId: "0" }).send([{ body: `Hello World ${i}` }]));
          } else if (i === 1) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(client.createSender({ partitionId: "1" }).send([{ body: `Hello World ${i}` }]));
          } else {
            debug(">>>>> Sending a message to the hub when i == %d", i);
            promises.push(client.createSender().send([{ body: `Hello World ${i}` }]));
          }
        }
        await Promise.all(promises);
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });

    it("should fail when a message greater than 256 KB is sent and succeed when a normal message is sent after that on the same link.", async function(): Promise<
      void
    > {
      const data: EventData = {
        body: Buffer.from("Z".repeat(300000))
      };
      try {
        debug("Sendina message of 300KB...");
        await client.createSender({ partitionId: "0" }).send([data]);
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.name, "MessageTooLargeError");
        err.message.should.match(
          /.*The received message \(delivery-id:(\d+), size:3000\d\d bytes\) exceeds the limit \(262144 bytes\) currently allowed on the link\..*/gi
        );
      }
      await client.createSender({ partitionId: "0" }).send([{ body: "Hello World EventHub!!" }]);
      debug("Sent the message successfully on the same link..");
    });
  });

  describe("Negative scenarios", function(): void {
    it("a message greater than 256 KB should fail.", async function(): Promise<void> {
      const data: EventData = {
        body: Buffer.from("Z".repeat(300000))
      };
      try {
        await client.createSender().send([data]);
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.name, "MessageTooLargeError");
        err.message.should.match(
          /.*The received message \(delivery-id:(\d+), size:3000\d\d bytes\) exceeds the limit \(262144 bytes\) currently allowed on the link\..*/gi
        );
      }
    });

    it("Error thrown when the 'partitionKey' is not of type 'string'", async function(): Promise<void> {
      const data: EventData = {
        body: "Hello World"
      };
      try {
        await client.createSender({ partitionId: "0" }).send([data], { partitionKey: 1 as any });
      } catch (err) {
        debug(err);
        should.exist(err);
        err.message.should.match(/.*'partitionKey' must be of type 'string'.*/gi);
      }
    });

    describe("on invalid partition ids like", function(): void {
      // tslint:disable-next-line: no-null-keyword
      const invalidIds = ["XYZ", "-1", "1000", "-", null];
      invalidIds.forEach(function(id: string | null): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);
            await client.createSender().send([{ body: "Hello world!" }], id as any);
            debug("sent the message.");
          } catch (err) {
            debug(`>>>> Received error for invalid partition id "${id}" - `, err);
            should.exist(err);
            err.message.should.match(
              /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
            );
          }
        });
      });

      const invalidIds2 = ["", " "];
      invalidIds2.forEach(function(id: string): void {
        it(`"${id}" should throw an invalid EventHub address error`, async function(): Promise<void> {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);
            await client.createSender().send([{ body: "Hello world!" }], id as any);
            debug("sent the message.");
          } catch (err) {
            debug(`>>>> Received invalid EventHub address error for partition id "${id}" - `, err);
            should.exist(err);
            err.message.should.match(/.*Invalid EventHub address. It must be either of the following.*/gi);
          }
        });
      });
    });
  });
}).timeout(20000);
