// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:hubruntime-spec");
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

import { EventHubClient } from "../src";
import { AbortController } from "@azure/abort-controller";
describe("RuntimeInformation #RunnableInBrowser", function(): void {
  let client: EventHubClient;
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
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

  afterEach("close the connection", async function(): Promise<void> {
    await client.close();
  });

  function arrayOfIncreasingNumbersFromZero(length: any): Array<string> {
    return Array.apply(undefined, new Array(length)).map((x: any, i: any) => {
      return `${i}`;
    });
  }

  describe("getPartitionIds", function(): void {
    it("returns an array of partition IDs", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      const ids = await client.getPartitionIds();
      ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
    });

    it("respects cancellationTokens", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
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

  describe("hub runtime information", function(): void {
    it("gets the hub runtime information", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path, {
        userAgent: "/js-event-processor-host=0.2.0"
      });
      const hubRuntimeInfo = await client.getProperties();
      debug(hubRuntimeInfo);
      hubRuntimeInfo.path.should.equal(service.path);

      hubRuntimeInfo.partitionIds.should.have.members(
        arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length)
      );
      hubRuntimeInfo.createdAt.should.be.instanceof(Date);
    });

    it("can cancel a request for hub runtime information", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path, {
        userAgent: "/js-event-processor-host=0.2.0"
      });
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await client.getProperties(controller.signal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });
  });

  describe("partition runtime information", function(): void {
    it("should throw an error if partitionId is missing", async function(): Promise<void> {
      try {
        client = new EventHubClient(service.connectionString, service.path);
        await client.getPartitionProperties(undefined as any);
        throw new Error("Test failure");
      } catch (err) {
        err.name.should.equal("TypeError");
        err.message.should.equal(`Missing parameter "partitionId"`);
      }
    });

    it("gets the partition runtime information with partitionId as a string", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      const partitionRuntimeInfo = await client.getPartitionProperties("0");
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubPath.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedTimeUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    it("gets the partition runtime information with partitionId as a number", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      const partitionRuntimeInfo = await client.getPartitionProperties(0 as any);
      debug(partitionRuntimeInfo);
      partitionRuntimeInfo.partitionId.should.equal("0");
      partitionRuntimeInfo.eventHubPath.should.equal(service.path);
      partitionRuntimeInfo.lastEnqueuedTimeUtc.should.be.instanceof(Date);
      should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
      should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
    });

    const invalidIds = ["XYZ", -1, 1000, "-", " ", ""];
    invalidIds.forEach(function(id: any): void {
      it(`should fail the partition runtime information when partitionId is "${id}"`, async function(): Promise<void> {
        try {
          client = new EventHubClient(service.connectionString, service.path);
          await client.getPartitionProperties(id as any);
          throw new Error("Test failure");
        } catch (err) {
          debug(`>>>> Received error - `, err);
          should.exist(err);
          err.message.should.match(
            /.*The specified partition is invalid for an EventHub partition sender or receiver.*/gi
          );
        }
      });
    });

    it("can cancel a request for getPartitionInformation", async function(): Promise<void> {
      client = new EventHubClient(service.connectionString, service.path);
      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        await client.getPartitionProperties("0", controller.signal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.match(/The [\w]+ operation has been cancelled by the user.$/gi);
      }
    });
  });
}).timeout(60000);
