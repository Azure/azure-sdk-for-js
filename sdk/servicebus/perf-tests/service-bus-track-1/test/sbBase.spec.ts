// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getEnvVar, BatchPerfTest } from "@azure/test-utils-perf";
import { ServiceBusClient } from "@azure/service-bus";
import { ServiceBusAdministrationClient } from "@azure/service-bus-v7";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = getEnvVar("SERVICEBUS_CONNECTION_STRING");

export abstract class ServiceBusTest<TOptions> extends BatchPerfTest<TOptions> {
  static sbClient: ServiceBusClient = ServiceBusClient.createFromConnectionString(connectionString);
  static sbAdminClient = new ServiceBusAdministrationClient(connectionString);
  static queueName = `newqueue-${Math.ceil(Math.random() * 1000)}`;

  constructor() {
    super();
  }

  public async globalSetup(): Promise<void> {
    await ServiceBusTest.sbAdminClient.createQueue(ServiceBusTest.queueName);
  }

  public async globalCleanup(): Promise<void> {
    await ServiceBusTest.sbClient.close();
    await ServiceBusTest.sbAdminClient.deleteQueue(ServiceBusTest.queueName);
  }
}
