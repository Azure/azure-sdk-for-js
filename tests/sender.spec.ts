// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:sender-spec");
import { EventHubClient, EventHubSender, EventData } from "../lib";
import { delay } from "../lib/util/utils";
describe("EventHub Sender", function () {
  this.timeout(6000);
  const service = { connectionString: process.env.EVENTHUB_CONNECTION_STRING, path: process.env.EVENTHUB_NAME };
  let client: EventHubClient = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
  let sender: EventHubSender;
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

  afterEach("close the sender link", async function () {
    if (sender) {
      debug("Closing the sender..");
      await sender.close();
    }
  });
  describe("Single message", function () {
    it("should be sent successfully.", async function () {
      sender = client.createSender();
      sender.should.be.instanceof(EventHubSender);
      let data: EventData = {
        body: "Hello World"
      }
      const delivery = await sender.send(data);
      // debug(delivery);
      delivery.id.should.equal(0);
      delivery.format.should.equal(0);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
      delivery.tag.toString().should.equal("0");
    });
    it("with partition key should be sent successfully.", async function () {
      sender = client.createSender();
      sender.should.be.instanceof(EventHubSender);
      let data: EventData = {
        body: "Hello World with partition key"
      }
      const delivery = await sender.send(data, "p1234");
      // debug(delivery);
      delivery.id.should.equal(0);
      delivery.format.should.equal(0);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
      delivery.tag.toString().should.equal("0");
    });
    it("should be sent successfully to a specific partition.", async function () {
      sender = client.createSender("0");
      sender.should.be.instanceof(EventHubSender);
      let data: EventData = {
        body: "Hello World"
      }
      const delivery = await sender.send(data);
      // debug(delivery);
      delivery.id.should.equal(0);
      delivery.format.should.equal(0);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
      delivery.tag.toString().should.equal("0");
    });
    it("should be sent successfully and a new amqp sender link should be created while sending a message again after it is closed.", async function () {
      sender = client.createSender();
      sender.should.be.instanceof(EventHubSender);
      let data: EventData = {
        body: "Hello World"
      }
      await sender.send(data);
      debug("message sent successfully...");
      should.exist((sender as any)._context.senders[sender.name]);
      await sender.close();
      debug("Closed sender...");
      should.not.exist((sender as any)._context.senders[sender.name]);
      data.body = "Hello World12";
      await delay(2000);
      await sender.send(data);
      debug("Sent the message successfully again after closing previously...");
      should.exist((sender as any)._context.senders[sender.name]);
      await sender.close();
    });
  });

  describe("Batch message", function () {
    it("should be sent successfully.", async function () {
      sender = client.createSender();
      sender.should.be.instanceof(EventHubSender);
      let data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      const delivery = await sender.sendBatch(data);
      debug(delivery);
      delivery.id.should.equal(0);
      delivery.format.should.equal(0x80013700);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
      delivery.tag.toString().should.equal("0");
    });
    it("with partition key should be sent successfully.", async function () {
      sender = client.createSender();
      sender.should.be.instanceof(EventHubSender);
      let data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      const delivery = await sender.sendBatch(data, "p1234");
      debug(delivery);
      delivery.id.should.equal(0);
      delivery.format.should.equal(0x80013700);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
      delivery.tag.toString().should.equal("0");
    });
    it("should be sent successfully to a specific partition.", async function () {
      sender = client.createSender("0");
      sender.should.be.instanceof(EventHubSender);
      let data: EventData[] = [
        {
          body: "Hello World 1"
        },
        {
          body: "Hello World 2"
        }
      ];
      const delivery = await sender.sendBatch(data);
      debug(delivery);
      delivery.id.should.equal(0);
      delivery.format.should.equal(0x80013700);
      delivery.settled.should.equal(true);
      delivery.remote_settled.should.equal(true);
      delivery.tag.toString().should.equal("0");
    });
  });

  describe("Multiple messages", function () {
    it("should be sent successfully in parallel", async function () {
      sender = client.createSender();
      let promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(sender.send({ body: `Hello World ${i}` }));
      }
      const result = await Promise.all(promises);
      for (let i = 0; i < result.length; i++) {
        const delivery = result[i];
        // debug("delivery %d: %O", i, delivery);
        delivery.id.should.equal(0);
        delivery.format.should.equal(0);
        delivery.settled.should.equal(true);
        delivery.remote_settled.should.equal(true);
        delivery.tag.toString().should.equal(`0`);
      }
    });
    it("should be sent successfully in parallel by multiple senders", async function () {
      let senders: EventHubSender[] = [];
      const senderCount = 3;
      try {
        for (let i = 0; i < senderCount; i++) {
          senders.push(client.createSender());
        }
        let promises = [];
        for (let i = 0; i < senderCount; i++) {
          debug(">>>>> Sending a message with sender %d", i);
          promises.push(senders[i].send({ body: `Hello World ${i}` }));
        }
        const result = await Promise.all(promises);
        for (let i = 0; i < result.length; i++) {
          const delivery = result[i];
          // debug("delivery %d: %O", i, delivery);
          delivery.id.should.equal(0);
          delivery.format.should.equal(0);
          delivery.settled.should.equal(true);
          delivery.remote_settled.should.equal(true);
          delivery.tag.toString().should.equal(`0`);
        }
      } catch (err) {
        debug("An error occurred while running the test: ", err);
        throw err;
      } finally {
        for (let i = 0; i < senderCount; i++) {
          await senders[i].close();
        }
      }
    });
  });

  describe("Negative scenarios", function () {
    it("a message greater than 256 KB should fail.", async function () {
      sender = client.createSender();
      sender.should.be.instanceof(EventHubSender);
      let data: EventData = {
        body: Buffer.from("Z".repeat(300000))
      }
      try {
        await sender.send(data);
      } catch (err) {
        debug(err);
        should.exist(err);
        should.equal(err.name, "MessageTooLargeError");
        err.message.should.match(/.*The received message \(delivery-id:0, size:300016 bytes\) exceeds the limit \(262144 bytes\) currently allowed on the link\..*/ig);
      }
    });

    describe("on invalid partition ids like", function () {
      const invalidIds = ["XYZ", "-1", "1000", "-", "", " ", null];
      invalidIds.forEach(function (id) {
        //const id = invalidIds[5];
        it(`"${id}" should throw an error`, async function () {
          try {
            sender = client.createSender(id);
            debug("Created sender and will be sending a message to partition id ...", id);
            await sender.send({ body: "Hello world!" });
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