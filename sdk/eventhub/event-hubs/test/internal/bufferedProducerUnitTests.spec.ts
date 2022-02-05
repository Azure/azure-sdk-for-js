// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubBufferedProducerClient } from "../../src";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import chai from "chai";
import { createMockServer } from "../public/utils/mockService";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";
import { delay } from "@azure/core-amqp";
import { BatchingPartitionChannel } from "../../src/batchingPartitionChannel";
import { PartitionAssigner } from "../../src/impl/partitionAssigner";

const should = chai.should();
const assert = chai.assert;

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }

  describe("EventHubBufferedProducerClient unit tests", () => {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME]!,
    };
    let client: EventHubBufferedProducerClient | undefined;

    before(() => {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    afterEach("Ensure client is closed between tests.", async () => {
      if (client) {
        await client.close();
        client = undefined;
      }
    });

    it("should update partition ids periodically", async function () {
      const fakeGetPartitionIds = stub();
      fakeGetPartitionIds.onCall(0).resolves(["0", "1"]);
      fakeGetPartitionIds.onCall(1).resolves(["0", "1", "2"]);
      fakeGetPartitionIds.onCall(2).resolves(["0"]);
      const fakeGetPartitionChannel = (
        _id: string
      ): SinonStubbedInstance<BatchingPartitionChannel> => {
        return createStubInstance(BatchingPartitionChannel);
      };
      const fakePartitionAssigner = createStubInstance(PartitionAssigner);

      client = new EventHubBufferedProducerClient(service.connectionString, service.path, {
        async onSendEventsErrorHandler(_context) {
          /* no-op */
        },
      });

      (client as any)["getPartitionIds"] = fakeGetPartitionIds;
      (client as any)["_getPartitionChannel"] = fakeGetPartitionChannel;
      (client as any)["_partitionAssigner"] = fakePartitionAssigner;
      (client as any)["_backgroundManagementInterval"] = 100; // shorten the interval for testing

      await client.enqueueEvent({ body: 1 });
      assert.deepStrictEqual((client as any)["_partitionIds"] as string[], ["0", "1"]);
      assert.ok(fakePartitionAssigner.setPartitionIds.calledWith(["0", "1"]));

      await delay(150);
      assert.deepStrictEqual((client as any)["_partitionIds"] as string[], ["0", "1", "2"]);
      assert.ok(fakePartitionAssigner.setPartitionIds.calledWith(["0", "1", "2"]));

      await delay(270);
      assert.deepStrictEqual((client as any)["_partitionIds"] as string[], ["0"]);
      assert.ok(fakePartitionAssigner.setPartitionIds.calledWith(["0"]));
    });
  });
});
