// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { ServiceBusClient } from "@azure/service-bus";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

const connectionString = getEnvVar("SERVICEBUS_CONNECTION_STRING");
const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

export abstract class ServiceBusTest<TOptions> extends PerfStressTest<TOptions> {
  sbClient: ServiceBusClient;
  static queueName = getEnvVar("QUEUE_NAME");

  constructor() {
    super();
    this.sbClient = sbClient;
  }

  public async globalCleanup() {
    await this.sbClient.close();
  }
}
