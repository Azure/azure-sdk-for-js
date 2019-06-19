// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import * as os from "os";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:client-spec");
import { EventHubClient, EventPosition } from "../src";
import { packageJsonInfo } from "../src/util/constants";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { AbortController } from "@azure/abort-controller";
// import { EnvironmentCredential } from "@azure/identity";
const env = getEnvVars();

describe("EventHubClient #RunnableInBrowser", function(): void {
  describe(".fromConnectionString", function(): void {
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
    env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
  );
  should.exist(
    env[EnvVarKeys.EVENTHUB_NAME],
    "define EVENTHUB_NAME in your environment before running integration tests."
  );
});

const service = {
  connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
  path: env[EnvVarKeys.EVENTHUB_NAME]
};

describe("EventHubClient on #RunnableInBrowser", function(): void {
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
      properties!["user-agent"].should.startWith(`azsdk-js-azureeventhubs/${packageVersion}`);
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
      properties!["user-agent"].should.startWith(`azsdk-js-azureeventhubs/${packageVersion}`);
      properties!["user-agent"].should.endWith(customua);
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

    it("respects cancellationTokens", async function(): Promise<void> {
      client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await client.getPartitionIds(controller.signal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });
  });

  describe("non existent eventhub", function(): void {
    it("should throw MessagingEntityNotFoundError while getting hub runtime info", async function(): Promise<void> {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        await client.getProperties();
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
        const sender = client.createProducer({ partitionId: "0" });
        await sender.send([{ body: "Hello World" }]);
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });

    it("should throw MessagingEntityNotFoundError while creating a receiver", async function(): Promise<void> {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, "bad" + Math.random());
        const receiver = client.createConsumer(EventHubClient.defaultConsumerGroup, "0", EventPosition.earliest());
        await receiver.receiveBatch(10, 5);
      } catch (err) {
        debug(err);
        should.equal(err.name, "MessagingEntityNotFoundError");
      }
    });
  });

  describe("createConsumer", function(): void {
    it("should throw an error if EventPosition is missing", function() {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
        client.createConsumer(EventHubClient.defaultConsumerGroup, "0", undefined as any);
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(`Missing parameter "eventPosition"`);
      }
    });

    it("should throw an error if consumerGroup is missing", function() {
      try {
        client = EventHubClient.createFromConnectionString(service.connectionString!, service.path);
        client.createConsumer(undefined as any, "0", EventPosition.earliest());
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(`Missing parameter "consumerGroup"`);
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
        const receiver = client.createConsumer("some-random-name", "0", EventPosition.earliest());
        receiver.receive(onMessage, onError);
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

// describe("Test AadTokenCredentials", function(): void {
//   let errorWasThrown: boolean = false;
//   before("validate environment", function(): void {
//     should.exist(
//       env[EnvVarKeys.AZURE_CLIENT_ID],
//       "define AZURE_CLIENT_ID in your environment before running integration tests."
//     );
//     should.exist(
//       env[EnvVarKeys.AZURE_TENANT_ID],
//       "define AZURE_TENANT_ID in your environment before running integration tests."
//     );
//     should.exist(
//       env[EnvVarKeys.AZURE_CLIENT_SECRET],
//       "define AZURE_CLIENT_SECRET in your environment before running integration tests."
//     );
//     should.exist(env[EnvVarKeys.ENDPOINT], "define ENDPOINT in your environment before running integration tests.");
//   });

//   async function testAadTokenCredentials(client: EventHubClient): Promise<void> {
//     const sender = client.createProducer();
//     const partitionIds = await client.getPartitionIds();
//     const receiver = await client.createConsumer(partitionIds[0]);
//     await sender.send({ body: "Hello world" });
//     const msgs = await receiver.receiveBatch(1);

//     should.equal(msgs.length, 1, "Unexpected number of messages");
//   }

//   it("throws error for invalid tokenCredentials", async function(): Promise<void> {
//     const client = new EventHubClient(env.ENDPOINT, env.EVENTHUB_NAME);
//     await testAadTokenCredentials(client).catch((err: any) => {
//       errorWasThrown = true;
//       should.equal(
//         err.message,
//         "Please provide a token credentials interface or a valid object of SharedKeyCredential."
//       );
//     });
//     should.equal(errorWasThrown, true, "Error thrown flag must be true");
//   });

//   it("sends a message to the Event Hub entity", async function(): Promise<void> {
//     const credential = new EnvironmentCredential();
//     const client = new EventHubClient(env.ENDPOINT, env.EVENTHUB_NAME, credential);
//     await testAadTokenCredentials(client);
//     await client.close();
//   });
// });
