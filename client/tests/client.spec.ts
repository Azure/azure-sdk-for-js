// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:client-spec");
import { EventHubClient } from "../lib";

function testFalsyValues(testFn: Function) {
  [null, undefined, "", 0].forEach(function (value) {
    testFn(value);
  });
}

describe("EventHubClient", function () {
  describe("#constructor", function () {
    ["endpoint", "entityPath", "sharedAccessKeyName", "sharedAccessKey"].forEach(function (prop) {
      it("throws if config." + prop + " is falsy", function () {
        testFalsyValues(function (falsyVal: any) {
          const test = function () {
            let config: any = { endpoint: "a", entityPath: "b", sharedAccessKey: "c", sharedAccessKeyName: "d" };
            config[prop] = falsyVal;
            return new EventHubClient(config as any);
          };
          test.should.throw(Error, `'${prop}' is a required property of ConnectionConfig.`);
        });
      });
    });
  });

  describe(".fromConnectionString", function () {
    it("throws when there is no connection string", function () {
      testFalsyValues(function (value: any) {
        const test = function () {
          return EventHubClient.createFromConnectionString(value);
        };
        test.should.throw(Error, "'connectionString' is a required parameter and must be of type: 'string'.");
      });
    });

    it("throws when it cannot find the Event Hub path", function () {
      const test = function () {
        return EventHubClient.createFromConnectionString("abc");
      };
      test.should.throw(Error, `Either provide "path" or the "connectionString": "abc", must contain EntityPath="<path-to-the-entity>".`);
    });

    it("creates an EventHubClient from a connection string", function () {
      const client = EventHubClient.createFromConnectionString("Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d");
      client.should.be.an.instanceof(EventHubClient);
    });

    it("creates an EventHubClient from a connection string and an Event Hub path", function () {
      const client = EventHubClient.createFromConnectionString("Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c", "path");
      client.should.be.an.instanceof(EventHubClient);
    });
  });
});

function arrayOfIncreasingNumbersFromZero(length: any) {
  return Array.apply(null, new Array(length)).map((x: any, i: any) => { return `${i}`; });
}

before("validate environment", function () {
  should.exist(process.env.EVENTHUB_CONNECTION_STRING,
    "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.");
  should.exist(process.env.EVENTHUB_NAME,
    "define EVENTHUB_NAME in your environment before running integration tests.");
});

const service = { connectionString: process.env.EVENTHUB_CONNECTION_STRING, path: process.env.EVENTHUB_NAME }

describe("EventHubClient on ", function () {
  this.timeout(60000);
  let client: EventHubClient;

  afterEach('close the connection', async function () {
    debug(">>>>>>>> afterEach: closing the client.");
    if (client) await client.close();
  });

  describe("#close", function () {
    it("is a no-op when the connection is already closed", function () {
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
      return client.close().should.be.fulfilled;
    });
  });

  describe("getPartitionIds", function () {
    it("returns an array of partition IDs", async function () {
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
      const ids = await client.getPartitionIds();
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
    });
  });

  describe("non existent eventhub", function () {
    it("should throw MessagingEntityNotFoundError while getting hub runtime info", async function () {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.getHubRuntimeInformation();
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while getting partition runtime info", async function () {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.getPartitionInformation("0");
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while creating a sender", async function () {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.send({ body: "Hello World" }, "0");
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while creating a receiver", async function () {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.receiveBatch("0", 10, 5);
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });
  });

  describe("non existent consumer group", function () {
    it("should throw MessagingEntityNotFoundError while creating a receiver", function (done) {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
        debug(">>>>>>>> client created.");
        const onMessage = (data: any) => {
          debug(">>>>> data: ", data);
        };
        const onError = (error: any) => {
          debug(">>>>>>>> error occurred", error);
          done(should.equal(error.name, "MessagingEntityNotFoundError"));
        }
        client.receive("0", onMessage, onError, { consumerGroup: "some-randome-name" });
        debug(">>>>>>>> attached the error handler on the receiver...");
      } catch (err) {
        debug(">>> Some error", err);
        throw new Error("This code path must not have hit.. " + JSON.stringify(err));
      }
    });
  });

  describe("on invalid partition ids like", function () {
    const invalidIds = ["XYZ", "-1", "1000", "-", " "];
    invalidIds.forEach(function (id) {
      it(`"${id}" should throw an error`, async function () {
        try {
          client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
          await client.getPartitionInformation(id);
        } catch (err) {
          debug(`>>>> Received error - `, err);
          should.exist(err);
          should.equal(err.name, "InvalidOperationError");
        }
      });
    });

    const invalidIds2 = ["", null];
    invalidIds2.forEach(function (id) {
      it(`"${id}" should throw an error`, async function () {
        try {
          client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
          await client.getPartitionInformation(id as any);
        } catch (err) {
          debug(`>>>> Received error - `, err);
          should.exist(err);
        }
      });
    });
  });
});