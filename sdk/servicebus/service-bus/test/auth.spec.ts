// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceBusConnectionStringModel, SharedKeyCredential } from "@azure/core-amqp";
import chai from "chai";
import { parseConnectionString } from "rhea-promise";
import { ServiceBusReceiver } from "../src/receivers/receiver";
import { ServiceBusClient } from "../src/serviceBusClient";
import { ReceivedMessage } from "../src/serviceBusMessage";
import { getEnvVars } from "./utils/envVarUtils";
import { TestClientType } from "./utils/testUtils";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests,
  ServiceBusTestHelpers
} from "./utils/testutils2";
const assert = chai.assert;

type UnpackReturnType<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer U>
  ? U
  : never;

[TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedSubscription].forEach(
  (entityType) => {
    describe(`Authentication via SAS to ${TestClientType[entityType]}`, () => {
      let tempClient: ServiceBusClientForTests;
      let entities: UnpackReturnType<ServiceBusTestHelpers["createTestEntities"]>;
      let sasConnectionString: string;

      before(async () => {
        tempClient = await createServiceBusClientForTests();
        entities = await tempClient.test.createTestEntities(entityType);

        const { SERVICEBUS_CONNECTION_STRING: serviceBusConnectionString } = getEnvVars();

        const { Endpoint: fqdn } = parseConnectionString<ServiceBusConnectionStringModel>(
          serviceBusConnectionString
        );

        sasConnectionString = getSasConnectionString(
          serviceBusConnectionString,
          entities.queue ?? `${entities.topic!}`,
          fqdn.replace(/\/+$/, "")
        );
      });

      after(async () => {
        await tempClient.test.afterEach();
        await tempClient.test.after();
      });

      it("ServiceBusClient", async () => {
        const client = new ServiceBusClient(sasConnectionString);

        const sender = await tempClient.createSender(entities.queue ?? entities.topic!);

        await sender.sendMessages({
          body: "Hello"
        });

        await sender.close();

        let receiver: ServiceBusReceiver<ReceivedMessage>;

        if (entities.queue) {
          receiver = client.createReceiver(entities.queue!, {
            receiveMode: "receiveAndDelete"
          });
        } else {
          receiver = client.createReceiver(entities.topic!, entities.subscription!, {
            receiveMode: "receiveAndDelete"
          });
        }

        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 10 * 1000
        });

        await receiver.close();

        assert.equal(messages.length, 1, "Should have received at least one message");
        await client.close();
      });

      function getSasConnectionString(
        connectionString: string,
        path: string,
        fqdn: string
      ): string {
        const sas = SharedKeyCredential.fromConnectionString(connectionString).getToken(
          `${fqdn}/${path}`
        ).token;

        return `Endpoint=${fqdn};SharedAccessSignature=${sas}`;
      }
    });
  }
);
