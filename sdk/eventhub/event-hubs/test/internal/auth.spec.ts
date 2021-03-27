// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventHubConnectionStringProperties,
  EventHubConsumerClient,
  EventHubProducerClient,
  parseEventHubConnectionString
} from "../../src";
import { EnvVarKeys, getEnvVars, getEnvVarValue, isNode } from "../public/utils/testUtils";
import chai from "chai";
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { createSasTokenProvider } from "@azure/core-amqp";
import { versionsToTest } from "@azure/test-utils-multi-version";
import { createMockServer } from "../public/utils/mockService";

const should = chai.should();

const serviceVersions = ["mock", "live"] as const;
const testTarget = getEnvVarValue("TEST_TARGET") || "live";

describe("internal/auth.spec.ts", function() {
  versionsToTest(serviceVersions, { versionForRecording: testTarget }, (serviceVersion) => {
    const env = getEnvVars(serviceVersion as "live" | "mock");
    if (isNode) {
      if (serviceVersion === "mock") {
        let service: ReturnType<typeof createMockServer>;
        before("Starting mock server", async () => {
          service = createMockServer();

          return service.start();
        });
        after("Stopping mock server", async () => {
          return service?.stop();
        });
      }
    }

    describe("Authentication via", () => {
      const service = {
        connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        path: env[EnvVarKeys.EVENTHUB_NAME],
        endpoint: parseEventHubConnectionString(
          env[EnvVarKeys.EVENTHUB_CONNECTION_STRING]
        ).endpoint.replace(/\/+$/, "")
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

      describe("Keys", () => {
        describe("using connection string", () => {
          it("EventHubConsumerClient", async () => {
            const consumerClient = new EventHubConsumerClient(
              "$Default",
              service.connectionString,
              service.path
            );

            const properties = await consumerClient.getEventHubProperties();
            should.exist(properties);

            await consumerClient.close();
          });

          it("EventHubProducerClient", async () => {
            const producerClient = new EventHubProducerClient(
              service.connectionString,
              service.path
            );

            const properties = await producerClient.getEventHubProperties();
            should.exist(properties);

            await producerClient.close();
          });
        });

        describe("using NamedKeyCredential", () => {
          it("EventHubConsumerClient", async () => {
            const namedKeyCredential = new AzureNamedKeyCredential(
              sharedAccessKeyName!,
              sharedAccessKey!
            );

            const consumerClient = new EventHubConsumerClient(
              "$Default",
              fullyQualifiedNamespace,
              service.path,
              namedKeyCredential
            );

            const properties = await consumerClient.getEventHubProperties();
            should.exist(properties);

            await consumerClient.close();
          });

          it("EventHubProducerClient", async () => {
            const namedKeyCredential = new AzureNamedKeyCredential(
              sharedAccessKeyName!,
              sharedAccessKey!
            );

            const producerClient = new EventHubProducerClient(
              fullyQualifiedNamespace,
              service.path,
              namedKeyCredential
            );

            const properties = await producerClient.getEventHubProperties();
            should.exist(properties);

            await producerClient.close();
          });
        });
      });

      describe("SAS", () => {
        function getSas(): string {
          const parsed = parseEventHubConnectionString(service.connectionString) as Required<
            | Pick<EventHubConnectionStringProperties, "sharedAccessKey" | "sharedAccessKeyName">
            | Pick<EventHubConnectionStringProperties, "sharedAccessSignature">
          >;
          return createSasTokenProvider(parsed).getToken(`${service.endpoint}/${service.path}`)
            .token;
        }

        describe("using connection string", () => {
          function getSasConnectionString(): string {
            const sas = getSas();

            return `Endpoint=${service.endpoint}/;SharedAccessSignature=${sas}`;
          }

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
        });
      });

      describe("using SASCredential", () => {
        it("EventHubConsumerClient", async () => {
          const sasCredential = new AzureSASCredential(getSas());

          const consumerClient = new EventHubConsumerClient(
            "$Default",
            fullyQualifiedNamespace,
            service.path,
            sasCredential
          );

          const properties = await consumerClient.getEventHubProperties();
          should.exist(properties);

          await consumerClient.close();
        });

        it("EventHubProducerClient", async () => {
          const sasCredential = new AzureSASCredential(getSas());

          const producerClient = new EventHubProducerClient(
            fullyQualifiedNamespace,
            service.path,
            sasCredential
          );

          const properties = await producerClient.getEventHubProperties();
          should.exist(properties);

          await producerClient.close();
        });
      });
    });
  });
});
