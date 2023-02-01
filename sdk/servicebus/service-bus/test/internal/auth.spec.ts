// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSasTokenProvider } from "@azure/core-amqp";
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import chai from "chai";
import { ServiceBusClient, ServiceBusReceiver, parseServiceBusConnectionString } from "../../src";
import { getEnvVars } from "../public/utils/envVarUtils";
import { TestClientType } from "../public/utils/testUtils";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests,
  ServiceBusTestHelpers,
} from "../public/utils/testutils2";
const assert = chai.assert;

type UnpackReturnType<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer U>
  ? U
  : never;

const { SERVICEBUS_CONNECTION_STRING: serviceBusConnectionString } = getEnvVars();

[TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedSubscription].forEach(
  (entityType) => {
    describe(`Authentication via SAK to ${TestClientType[entityType]}`, () => {
      let tempClient: ServiceBusClientForTests;
      let entities: UnpackReturnType<ServiceBusTestHelpers["createTestEntities"]>;

      before(async () => {
        tempClient = createServiceBusClientForTests();
        entities = await tempClient.test.createTestEntities(entityType);
      });

      after(async () => {
        await tempClient.test.afterEach();
        await tempClient.test.after();
      });

      it("ServiceBusClient with connection string", async () => {
        const client = new ServiceBusClient(serviceBusConnectionString);

        const sender = tempClient.createSender(entities.queue ?? entities.topic!);

        await sender.sendMessages({
          body: "Hello",
        });

        await sender.close();

        let receiver: ServiceBusReceiver;

        if (entities.queue) {
          receiver = client.createReceiver(entities.queue!, {
            receiveMode: "receiveAndDelete",
          });
        } else {
          receiver = client.createReceiver(entities.topic!, entities.subscription!, {
            receiveMode: "receiveAndDelete",
          });
        }

        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 10 * 1000,
        });

        await receiver.close();

        assert.equal(messages.length, 1, "Should have received at least one message");
        await client.close();
      });

      it("ServiceBusClient with NamedKeyCredential", async () => {
        const parsed = parseServiceBusConnectionString(serviceBusConnectionString);
        const client = new ServiceBusClient(
          parsed.fullyQualifiedNamespace,
          new AzureNamedKeyCredential(parsed.sharedAccessKeyName!, parsed.sharedAccessKey!)
        );

        const sender = tempClient.createSender(entities.queue ?? entities.topic!);

        await sender.sendMessages({
          body: "Hello",
        });

        await sender.close();

        let receiver: ServiceBusReceiver;

        if (entities.queue) {
          receiver = client.createReceiver(entities.queue!, {
            receiveMode: "receiveAndDelete",
          });
        } else {
          receiver = client.createReceiver(entities.topic!, entities.subscription!, {
            receiveMode: "receiveAndDelete",
          });
        }

        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 10 * 1000,
        });

        await receiver.close();

        assert.equal(messages.length, 1, "Should have received at least one message");
        await client.close();
      });
    });

    describe(`Authentication via SAS to ${TestClientType[entityType]}`, () => {
      let tempClient: ServiceBusClientForTests;
      let entities: UnpackReturnType<ServiceBusTestHelpers["createTestEntities"]>;
      let sasConnectionString: string;
      let sharedAccessSignature: string;

      before(async () => {
        tempClient = createServiceBusClientForTests();
        entities = await tempClient.test.createTestEntities(entityType);

        const endpoint = parseServiceBusConnectionString(serviceBusConnectionString).endpoint;

        sharedAccessSignature = getSharedAccessSignature(
          serviceBusConnectionString,
          entities.queue ?? `${entities.topic!}`,
          endpoint.replace(/\/+$/, "")
        );
        sasConnectionString = getSasConnectionString(
          serviceBusConnectionString,
          entities.queue ?? `${entities.topic!}`,
          endpoint.replace(/\/+$/, "")
        );
      });

      after(async () => {
        await tempClient.test.afterEach();
        await tempClient.test.after();
      });

      it("ServiceBusClient with connection string", async () => {
        const client = new ServiceBusClient(sasConnectionString);

        const sender = tempClient.createSender(entities.queue ?? entities.topic!);

        await sender.sendMessages({
          body: "Hello",
        });

        await sender.close();

        let receiver: ServiceBusReceiver;

        if (entities.queue) {
          receiver = client.createReceiver(entities.queue!, {
            receiveMode: "receiveAndDelete",
          });
        } else {
          receiver = client.createReceiver(entities.topic!, entities.subscription!, {
            receiveMode: "receiveAndDelete",
          });
        }

        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 10 * 1000,
        });

        await receiver.close();

        assert.equal(messages.length, 1, "Should have received at least one message");
        await client.close();
      });

      it("ServiceBusClient with SASCredential", async () => {
        const parsed = parseServiceBusConnectionString(sasConnectionString);
        const client = new ServiceBusClient(
          parsed.fullyQualifiedNamespace,
          new AzureSASCredential(sharedAccessSignature)
        );

        const sender = tempClient.createSender(entities.queue ?? entities.topic!);

        await sender.sendMessages({
          body: "Hello",
        });

        await sender.close();

        let receiver: ServiceBusReceiver;

        if (entities.queue) {
          receiver = client.createReceiver(entities.queue!, {
            receiveMode: "receiveAndDelete",
          });
        } else {
          receiver = client.createReceiver(entities.topic!, entities.subscription!, {
            receiveMode: "receiveAndDelete",
          });
        }

        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 10 * 1000,
        });

        await receiver.close();

        assert.equal(messages.length, 1, "Should have received at least one message");
        await client.close();
      });

      function getSharedAccessSignature(
        connectionString: string,
        path: string,
        fqdn: string
      ): string {
        const parsed = parseServiceBusConnectionString(connectionString) as {
          sharedAccessKeyName: string;
          sharedAccessKey: string;
        };
        return createSasTokenProvider(parsed).getToken(`${fqdn}/${path}`).token;
      }

      function getSasConnectionString(
        connectionString: string,
        path: string,
        fqdn: string
      ): string {
        const sas = getSharedAccessSignature(connectionString, path, fqdn);

        return `Endpoint=${fqdn};SharedAccessSignature=${sas}`;
      }
    });
  }
);
