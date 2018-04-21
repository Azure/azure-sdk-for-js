// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:sender-spec");
import { EventHubClient, EventData, delay } from "../lib";
describe("EventHub Sender", function () {
  this.timeout(6000);
  const service = { connectionString: process.env.EVENTHUB_CONNECTION_STRING, path: process.env.EVENTHUB_NAME };
  let client: EventHubClient = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
  before("validate environment", function () {
    should.exist(process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.");
    should.exist(process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests.");
  });

  after("close the connection", async function () {
    debug("Closing the client..");
    await client.close();
  });

  describe("Single message", function () {
    it("should be sent successfully.", async function () {
      let data: EventData = {
        body: "Hello World"
      }
      const delivery = await client.send(data);
      // debug(delivery);
      delivery.format.should.equal(0);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
    });
    it("with partition key should be sent successfully.", async function () {
      let data: EventData = {
        body: "Hello World with partition key",
        partitionKey: "p1234"
      }
      const delivery = await client.send(data);
      // debug(delivery);
      delivery.format.should.equal(0);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
    });
    it("should be sent successfully to a specific partition.", async function () {
      let data: EventData = {
        body: "Hello World"
      }
      const delivery = await client.send(data, "0");
      // debug(delivery);
      delivery.format.should.equal(0);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
    });
  });

  describe("Batch message", function () {
    it("should be sent successfully.", async function () {
      let data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      const delivery = await client.sendBatch(data);
      // debug(delivery);
      delivery.format.should.equal(0x80013700);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
    });
    it("with partition key should be sent successfully.", async function () {
      let data: EventData[] = [
        {
          body: "Hello World 1",
          partitionKey: "p1234"
        },
        {
          body: "Hello World 2"
        }
      ];
      const delivery = await client.sendBatch(data);
      // debug(delivery);
      delivery.format.should.equal(0x80013700);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
    });
    it("should be sent successfully to a specific partition.", async function () {
      let data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      const delivery = await client.sendBatch(data, "0");
      // debug(delivery);
      delivery.format.should.equal(0x80013700);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
    });
  });

  describe("Multiple messages", function () {
    it("should be sent successfully in parallel", async function () {
      let promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(client.send({ body: `Hello World ${i}` }));
      }
      const result = await Promise.all(promises);
      for (let i = 0; i < result.length; i++) {
        const delivery = result[i];
        // debug("delivery %d: %O", i, delivery);
        delivery.format.should.equal(0);
        delivery.settled.should.equal(true);
        delivery.remote_settled.should.equal(true);
      }
    });
    it("should be sent successfully in parallel by multiple senders", async function () {
      const senderCount = 3;
      try {
        let promises = [];
        for (let i = 0; i < senderCount; i++) {
          if (i == 0) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(client.send({ body: `Hello World ${i}` }, i));
          } else if (i == 1) {
            debug(">>>>> Sending a message to partition %d", i);
            promises.push(client.send({ body: `Hello World ${i}` }, i));
          } else {
            debug(">>>>> Sending a message to the hub when i == %d", i);
            promises.push(client.send({ body: `Hello World ${i}` }));
          }
        }
        const result = await Promise.all(promises);
        for (let i = 0; i < result.length; i++) {
          const delivery = result[i];
          // debug("delivery %d: %O", i, delivery);
          delivery.format.should.equal(0);
          delivery.settled.should.equal(true);
          delivery.remote_settled.should.equal(true);
        }
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      }
    });
  });

  describe("Negative scenarios", function () {
    it("a message greater than 256 KB should fail.", async function () {
      let data: EventData = {
        body: Buffer.from("Z".repeat(300000))
      }
      try {
        await client.send(data);
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.name, "MessageTooLargeError");
        err.message.should.match(/.*The received message \(delivery-id:(\d+), size:3000\d\d bytes\) exceeds the limit \(262144 bytes\) currently allowed on the link\..*/ig);
      }
    });

    describe("on invalid partition ids like", function () {
      const invalidIds = ["XYZ", "-1", "1000", "-", "", " ", null];
      invalidIds.forEach(function (id) {
        //const id = invalidIds[5];
        it(`"${id}" should throw an error`, async function () {
          try {
            debug("Created sender and will be sending a message to partition id ...", id);
            await client.send({ body: "Hello world!" }, id);
            debug("sent the message.");
          } catch (err) {
            debug(`>>>> Received error for invalid partition id "${id}" - `, err);
            should.exist(err);
            should.equal(true, err.name === "ArgumentOutOfRangeError" || err.name === "InvalidOperationError");
          }
        });
      });
    });
  });
});