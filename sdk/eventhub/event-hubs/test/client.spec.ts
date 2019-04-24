// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import os from "os";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import debugModule from "debug";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
const debug = debugModule("azure:event-hubs:client-spec");
import { EventHubClient } from "../src";
import { packageJsonInfo } from "../src/util/constants";

function testFalsyValues(testFn: Function): void {
  // tslint:disable-next-line: no-null-keyword
  [null, undefined, "", 0].forEach(function(value: string | number | null | undefined): void {
    testFn(value);
  });
}

describe("EventHubClient", function(): void {
  describe(".fromConnectionString", function(): void {
    it("throws when there is no connection string", function(): void {
      testFalsyValues(function(value: any): void {
        const test = function(): EventHubClient {
          return EventHubClient.createFromConnectionString(value);
        };
        test.should.throw(Error, "'connectionString' is a required parameter and must be of type: 'string'.");
      });
    });

    it("throws when it cannot find the Event Hub path", function(): void {
      const endpoint = "Endpoint=sb://abc";
      const test = function(): EventHubClient {
        return EventHubClient.createFromConnectionString(endpoint);
      };
      test.should.throw(
        Error,
        `Either provide "path" or the "connectionString": "${endpoint}", must contain EntityPath="<path-to-the-entity>".`
      );
    });

    it("creates an EventHubClient from a connection string", function(): void {
      const client = EventHubClient.createFromConnectionString(
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
      );
      client.should.be.an.instanceof(EventHubClient);
    });

    it("creates an EventHubClient from a connection string and an Event Hub path", function(): void {
      const client = EventHubClient.createFromConnectionString(
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c",
        "path"
      );
      client.should.be.an.instanceof(EventHubClient);
    });
  });
});

function arrayOfIncreasingNumbersFromZero(length: any): Array<string> {
  // tslint:disable-next-line: no-null-keyword
  return Array.apply(null, new Array(length)).map((x: any, i: any) => {
    return `${i}`;
  });
}

before("validate environment", function(): void {
  should.exist(
    process.env.EVENTHUB_CONNECTION_STRING,
    "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
  );
  should.exist(process.env.EVENTHUB_NAME, "define EVENTHUB_NAME in your environment before running integration tests.");
});

const service = { connectionString: process.env.EVENTHUB_CONNECTION_STRING, path: process.env.EVENTHUB_NAME };

describe("EventHubClient on ", function(): void {
  let client: EventHubClient;

  afterEach("close the connection", async function(): Promise<void> {
    if (client) {
      debug(">>>>>>>> afterEach: closing the client.");
      await client.close();
    }
  });

  describe("user-agent", function(): void {
    it("should correctly populate the default user agent", function(done: Mocha.Done): void {
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
      const packageVersion = packageJsonInfo.version;
      const properties = client["_context"].connection.options.properties;
      should.equal(properties!["user-agent"], "/js-event-hubs");
      should.equal(properties!.product, "MSJSClient");
      should.equal(properties!.version, packageVersion);
      should.equal(properties!.framework, `Node/${process.version}`);
      should.equal(properties!.platform, `(${os.arch()}-${os.type()}-${os.release()})`);
      done();
    });

    it("should correctly populate the custom user agent", function(done: Mocha.Done): void {
      const customua = "/js-event-processor-host=0.2.0";
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path, {
        userAgent: customua
      });
      const packageVersion = packageJsonInfo.version;
      const properties = client["_context"].connection.options.properties;
      should.equal(properties!["user-agent"], `/js-event-hubs,${customua}`);
      should.equal(properties!.product, "MSJSClient");
      should.equal(properties!.version, packageVersion);
      should.equal(properties!.framework, `Node/${process.version}`);
      should.equal(properties!.platform, `(${os.arch()}-${os.type()}-${os.release()})`);
      done();
    });
  });

  describe("#close", function(): void {
    it("is a no-op when the connection is already closed", function(): Chai.PromisedAssertion {
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
      return client.close().should.be.fulfilled;
    });
  });

  describe("getPartitionIds", function(): void {
    it("returns an array of partition IDs", async function(): Promise<void> {
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
      const ids = await client.getPartitionIds();
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
    });
  });

  describe("non existent eventhub", function(): void {
    it("should throw MessagingEntityNotFoundError while getting hub runtime info", async function(): Promise<void> {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.getHubRuntimeInformation();
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while getting partition runtime info", async function(): Promise<
      void
    > {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.getPartitionInformation("0");
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while creating a sender", async function(): Promise<void> {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.send({ body: "Hello World" }, "0");
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while creating a receiver", async function(): Promise<void> {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.receiveBatch("0", 10, 5);
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });
  });

  describe("non existent consumer group", function(): void {
    it("should throw MessagingEntityNotFoundError while creating a receiver", function(done: Mocha.Done): void {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
        debug(">>>>>>>> client created.");
        const onMessage = (data: any) => {
          debug(">>>>> data: ", data);
        };
        const onError = (error: any) => {
          debug(">>>>>>>> error occurred", error);
          // sleep for 3 seconds so that receiver link and the session can be closed properly then
          // in aftereach the connection can be closed. closing the connection while the receiver
          // link and it's session are being closed (and the session being removed from rhea's
          // internal map) can create havoc.
          setTimeout(() => {
            done(should.equal(error.name, "MessagingEntityNotFoundError"));
          }, 3000);
        };
        client.receive("0", onMessage, onError, { consumerGroup: "some-randome-name" });
        debug(">>>>>>>> attached the error handler on the receiver...");
      } catch (err) {
        debug(">>> Some error", err);
        throw new Error("This code path must not have hit.. " + JSON.stringify(err));
      }
    });
  });

  describe("on invalid partition ids like", function(): void {
    const invalidIds = ["XYZ", "-1", "1000", "-", " "];
    invalidIds.forEach(function(id: string): void {
      it(`"${id}" should throw an error`, async function(): Promise<void> {
        try {
          client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
          await client.getPartitionInformation(id);
        } catch (err) {
          debug(`>>>> Received error - `, err);
          should.exist(err);
          err.message.should.match(
            /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
          );
        }
      });
    });

    // tslint:disable-next-line: no-null-keyword
    const invalidIds2 = ["", null];
    invalidIds2.forEach(function(id: string | null): void {
      it(`"${id}" should throw an error`, async function(): Promise<void> {
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
}).timeout(60000);
