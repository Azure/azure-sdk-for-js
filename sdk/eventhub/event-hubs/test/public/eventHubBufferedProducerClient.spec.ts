// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";
import { createMockServer } from "./utils/mockService";
import { EventHubBufferedProducerClient } from "@azure/event-hubs";

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

  describe.skip("EventHubBufferedProducerClient", () => {
    const connectionString = env[EnvVarKeys.EVENTHUB_CONNECTION_STRING];
    const eventHubName = env[EnvVarKeys.EVENTHUB_NAME];
    let client: EventHubBufferedProducerClient | undefined;

    before(() => {
      assert.exists(
        connectionString,
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      assert.exists(
        eventHubName,
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    afterEach("Ensure client is closed between tests.", async () => {
      if (client) {
        await client.close();
        client = undefined;
      }
    });
  });
});
