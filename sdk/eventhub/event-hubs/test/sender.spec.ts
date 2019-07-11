// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:sender-spec");
import { EventHubClient, EventData, EventHubProducer } from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
const env = getEnvVars();

describe("EventHub Sender #RunnableInBrowser", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
  before("validate environment", function(): void {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  after("close the connection", async function(): Promise<void> {
    debug("Closing the client..");
    await client.close();
  });

  describe("Single message", function(): void {
    it("should be sent successfully.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      await client.createProducer().send(data);
    });

    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      await client.createProducer().send(data, { partitionKey: "1" });
    });

    it("with partition key as a number should be sent successfully.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      await client.createProducer().send(data, { partitionKey: 1 as any });
    });

    it("should be sent successfully to a specific partition.", async function(): Promise<void> {
      const data: EventData = { body: "Hello World 1" };
      await client.createProducer({ partitionId: "0" }).send(data);
    });

    it("should support being cancelled", async function(): Promise<void> {
      try {
        const data: EventData = { body: "Sender single message Cancellation Test - timeout 0" };
        const sender = client.createProducer();
        // call send() once to create a connection
        await sender.send(data);
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await sender.send(data, { abortSignal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<void> {
      const abortController = new AbortController();
      abortController.abort();

      try {
        const data: EventData = { body: "Sender single message Cancellation Test - immediate" };
        await client.createProducer().send(data, { abortSignal: abortController.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should throw when partitionId and partitionKey are provided", async function(): Promise<void> {
      try {
        const data: EventData = { body: "Sender paritition id and partition key" };
        await client.createProducer({ partitionId: "0" }).send(data, { partitionKey: "1" });
        throw new Error("Test Failure");
      } catch (err) {
        err.message.should.equal(
          "Partition key is not supported when using producers that were created using a partition id."
        );
      }
    });
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
      await client.createProducer().send(data);
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
      await client.createProducer().send(data, { partitionKey: 1 as any });
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
      await client.createProducer({ partitionId: "0" }).send(data);
    });

    it("should support being cancelled", async function(): Promise<void> {
      try {
        const data: EventData[] = [
          {
            body: "Sender Cancellation Test - timeout 0"
          }
        ];
        const sender = client.createProducer();
        // call send() once to create a connection
        await sender.send(data);
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await sender.send(data, { abortSignal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<void> {
      const abortController = new AbortController();
      abortController.abort();

      try {
        const data: EventData[] = [
          {
            body: "Sender Cancellation Test - immediate"
          }
        ];
        await client.createProducer().send(data, { abortSignal: abortController.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The send operation has been cancelled by the user.");
      }
    });

    it("should throw when partitionId and partitionKey are provided", async function(): Promise<void> {
      try {
        const data: EventData[] = [
          {
            body: "Sender paritition id and partition key"
          }
        ];
        await client.createProducer({ partitionId: "0" }).send(data, { partitionKey: "1" });
        throw new Error("Test Failure");
      } catch (err) {
        err.message.should.equal(
          "Partition key is not supported when using producers that were created using a partition id."
        );
      }
    });
  });

  describe("Create batch", function(): void {
    it.only("should be sent successfully", async function(): Promise<void> {
      const producer = client.createProducer({ partitionId: "0" });
      const totalMessages = 2;
      const eventDataBatch = await producer.createBatch();
      for (let i = 0; i < totalMessages; i++) {
       const messageStatus = eventDataBatch.tryAdd({ body: `${Buffer.from("Z".repeat(650000))}` });
       if(!messageStatus){
         break;
       }
      }
      console.log(`${eventDataBatch.events.length} messages sent in total.`);
      should.equal(eventDataBatch.events.length !== totalMessages, true, "Client was not able to send any messages");
      console.log("sending..");
      await producer.send(eventDataBatch);
    });
    it("with partition key should be sent successfully.", async function(): Promise<void> {
      const producer = client.createProducer({ partitionId: "0" });
      const eventDataBatch = await producer.createBatch({ partitionKey: 1 as any });
      for (let i = 0; i < 5; i++) {
        eventDataBatch.tryAdd({ body: `Hello World ${i}` });
      }
      await producer.send(eventDataBatch);
    });
    it("with max message size should be sent successfully.", async function(): Promise<void> {
      const producer = client.createProducer({ partitionId: "0" });
      const eventDataBatch = await producer.createBatch({ maxMessageSize: 4096 });
      for (let i = 0; i < 5; i++) {
        eventDataBatch.tryAdd({ body: `Hello World ${i}` });
      }
      await producer.send(eventDataBatch);
    });
    });

  describe("multiple producers", function(): void {
    it("should be isolated on same partitionId", async function(): Promise<void> {
      const producers: EventHubProducer[] = [];

      // create multiple producers with the same partition id
      for (let i = 0; i < 5; i++) {
        producers.push(client.createProducer({ partitionId: "0" }));
      }

      // ensure all producers can send a message
      for (const producer of producers) {
        await producer.send({ body: "foo" });
      }

      do {
        // close one of the producers and send messages with remaining senders
        // also closes all of the senders by the end of the test!
        await producers.pop()!.close();
        for (const producer of producers) {
          await producer.send({ body: "bar" });
        }
      } while (producers.length);
    });
  });

  describe("Multiple messages", function(): void {
    it("should be sent successfully in parallel", async function(): Promise<void> {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(client.createProducer().send([{ body: `Hello World ${i}` }]));
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
            promises.push(client.createProducer({ partitionId: "0" }).send([{ body: `Hello World ${i}` }]));
          } else if (i === 1) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(client.createProducer({ partitionId: "1" }).send([{ body: `Hello World ${i}` }]));
          } else {
            debug(">>>>> Sending a message to the hub when i == %d", i);
            promises.push(client.createProducer().send([{ body: `Hello World ${i}` }]));
          }
        }
        await Promise.all(promises);
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });

    it("should fail when a message greater than 1 MB is sent and succeed when a normal message is sent after that on the same link.", async function(): Promise<
      void
    > {
      const data: EventData = {
        body: Buffer.from("Z".repeat(1300000))
      };
      try {
        debug("Sending a message of 300KB...");
        await client.createProducer({ partitionId: "0" }).send([data]);
        throw new Error("Test failure");
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.name, "MessageTooLargeError");
        err.message.should.match(
          /.*The received message \(delivery-id:(\d+), size:(\d+) bytes\) exceeds the limit \((\d+) bytes\) currently allowed on the link\..*/gi
        );
      }
      await client.createProducer({ partitionId: "0" }).send([{ body: "Hello World EventHub!!" }]);
      debug("Sent the message successfully on the same link..");
    });
  });

  describe("Negative scenarios", function(): void {
    it("a message greater than 1 MB should fail.", async function(): Promise<void> {
      const data: EventData = {
        body: Buffer.from("Z".repeat(1300000))
      };
      try {
        await client.createProducer().send([data]);
        throw new Error("Test failure");
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.name, "MessageTooLargeError");
        err.message.should.match(
          /.*The received message \(delivery-id:(\d+), size:(\d+) bytes\) exceeds the limit \((\d+) bytes\) currently allowed on the link\..*/gi
        );
      }
    });

    describe("on invalid partition ids like", function(): void {
      // tslint:disable-next-line: no-null-keyword
      const invalidIds = ["XYZ", "-1", "1000", "-"];
      invalidIds.forEach(function(id: string | null): void {
        it(`"${id}" should throw an error`, async function(): Promise<void> {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);
            await client.createProducer({ partitionId: id as any }).send([{ body: "Hello world!" }]);
            debug("sent the message.");
            throw new Error("Test failure");
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
            await client.createProducer({ partitionId: id as any }).send([{ body: "Hello world!" }]);
            debug("sent the message.");
            throw new Error("Test failure");
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
