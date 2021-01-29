// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { ServiceBusAdministrationClient, ServiceBusClient } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = getEnvVar("SERVICEBUS_CONNECTION_STRING");
const sbClient = new ServiceBusClient(connectionString);

export abstract class ServiceBusTest<TOptions> extends PerfStressTest<TOptions> {
  sbClient: ServiceBusClient;
  static sbAdminClient = new ServiceBusAdministrationClient(connectionString);
  static queueName = `newqueue-${Math.ceil(Math.random() * 1000)}`;

  constructor() {
    super();
    this.sbClient = sbClient;
  }

  public async globalSetup() {
    await ServiceBusTest.sbAdminClient.createQueue(ServiceBusTest.queueName);
  }

  public async globalCleanup() {
    await ServiceBusTest.sbAdminClient.deleteQueue(ServiceBusTest.queueName);
    await this.sbClient.close();
  }
}
