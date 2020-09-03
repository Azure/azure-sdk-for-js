// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  parseConnectionString,
  ServiceBusConnectionStringModel,
  SharedKeyCredential
} from "@azure/core-amqp";
import { EventHubConsumerClient } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { EventHubProducerClient } from "../src";

const should = chai.should();
const env = getEnvVars();

describe("Authentication via SAS", () => {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME],
    fqdn: parseConnectionString<ServiceBusConnectionStringModel>(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING]
    ).Endpoint.replace(/\/+$/, "")
  };

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

  it("EventHubConsumerClient", async () => {
    const sasConnectionString = getSasConnectionString();

    const consumerClient = new EventHubConsumerClient(
      "$Default",
      sasConnectionString,
      service.path
    );

    const properties = await consumerClient.getEventHubProperties();
    should.exist(properties);

    await consumerClient.close();
  });

  it("EventHubProducerClient", async () => {
    const sasConnectionString = getSasConnectionString();

    const producerClient = new EventHubProducerClient(sasConnectionString, service.path);

    const properties = await producerClient.getEventHubProperties();
    should.exist(properties);

    await producerClient.close();
  });

  function getSasConnectionString(): string {
    const sas = SharedKeyCredential.fromConnectionString(service.connectionString).getToken(
      `${service.fqdn}/${service.path}`
    ).token;

    return `Endpoint=${service.fqdn}/;SharedAccessSignature=${sas}`;
  }
});
