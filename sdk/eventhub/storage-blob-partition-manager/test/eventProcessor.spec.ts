// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
import { EventHubClient } from "@azure/event-hubs"
const debug = debugModule("azure:event-hubs:partitionPump");
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

describe("Event Processor", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.STORAGE_CONNECTION_STRING],
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests."
    );
  });

  after("close the connection", async function(): Promise<void> {
    await client.close();
  });

  it("should expose an id", async function(): Promise<void> {
  
  });

}).timeout(90000);
