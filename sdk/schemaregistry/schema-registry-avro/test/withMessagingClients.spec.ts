// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData, createEventDataAdapter } from "@azure/event-hubs";
import { AvroSerializer } from "../src/avroSerializer";
import { MessageAdapter } from "../src/models";
import { MessagingTestClient } from "./clients/models";
import { assert } from "chai";
import { createEventHubsClient } from "./clients/eventHubs";
import { createMockedMessagingClient } from "./clients/mocked";
import { createTestSerializer } from "./utils/mockedSerializer";
import { env } from "./utils/env";
import { matrix } from "@azure/test-utils";
import { testGroup } from "./utils/dummies";

/**
 * An interface to group different bits needed by the tests for each messaging service
 */
interface ScenariosTestInfo<T> {
  adapterFactory: MessageAdapter<T>;
  messagingServiceName: string;
  client: MessagingTestClient<T>;
}

describe("With messaging clients", function () {
  const eventHubsConnectionString = env.EVENTHUB_CONNECTION_STRING || "";
  const eventHubName = env.EVENTHUB_NAME || "";
  const eventDataTestInfo: ScenariosTestInfo<EventData> = {
    adapterFactory: createEventDataAdapter({
      properties: {
        language: "js",
      },
    }),
    messagingServiceName: "Event Hub",
    client: createMockedMessagingClient(() =>
      createEventHubsClient(eventHubsConnectionString, eventHubName)
    ),
  };
  matrix([[eventDataTestInfo]] as const, async (testInfo: ScenariosTestInfo<any>) => {
    describe(testInfo.messagingServiceName, async function () {
      let serializer: AvroSerializer<any>;
      before(async function () {
        serializer = await createTestSerializer({
          serializerOptions: {
            autoRegisterSchemas: true,
            groupName: testGroup,
            messageAdapter: testInfo.adapterFactory,
          },
        });
        await testInfo.client.initialize();
      });

      after(async function () {
        await testInfo.client.cleanup();
      });

      it("Test schema with fields of type int/string/boolean/float/bytes", async () => {
        const schema = JSON.stringify({
          name: "RecordWithFieldTypes",
          namespace: "interop.avro",
          type: "record",
          fields: [
            { name: "name", type: "string" },
            { name: "age", type: "int" },
            { name: "married", type: "boolean" },
            { name: "height", type: "float" },
            { name: "randb", type: "bytes" },
          ],
        });
        const value = {
          name: "Ben",
          age: 3,
          married: false,
          height: 13.5,
          randb: Buffer.from("\u00FF"),
        };
        const message = await serializer.serializeMessageData(value, schema);
        await testInfo.client.send(message);
        const receivedMessage = await testInfo.client.receive();
        const deserializedValue = await serializer.deserializeMessageData(receivedMessage);
        assert.deepStrictEqual(deserializedValue, value);
      });

      it("Serialize with `Schema`. Deserialize with `Reader Schema`, which is the original schema with a field removed.", async () => {
        const writerSchema = JSON.stringify({
          namespace: "interop.avro",
          type: "record",
          name: "ReaderSchema",
          fields: [
            { name: "name", type: "string" },
            { name: "favorite_number", type: ["int", "null"] },
            { name: "favorite_color", type: ["string", "null"] },
          ],
        });
        const readerSchema = JSON.stringify({
          namespace: "interop.avro",
          type: "record",
          name: "ReaderSchema",
          fields: [
            { name: "name", type: "string" },
            { name: "favorite_number", type: ["int", "null"] },
          ],
        });
        const value = { name: "Ben", favorite_number: 7, favorite_color: "red" };
        const message = await serializer.serializeMessageData(value, writerSchema);
        await testInfo.client.send(message);
        const receivedMessage = await testInfo.client.receive();
        const deserializedValue = await serializer.deserializeMessageData(receivedMessage, {
          schema: readerSchema,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        assert.deepStrictEqual(deserializedValue, (({ favorite_color, ...rest }) => rest)(value));
      });

      it("Serialize with `Schema`. Deserialize with `Reader Schema`, which is the original schema with a field added.", async () => {
        const writerSchema = JSON.stringify({
          namespace: "interop.avro",
          type: "record",
          name: "ReaderSchema",
          fields: [
            { name: "name", type: "string" },
            { name: "favorite_number", type: ["int", "null"] },
            { name: "favorite_color", type: ["string", "null"] },
          ],
        });
        const readerSchema = JSON.stringify({
          namespace: "interop.avro",
          type: "record",
          name: "ReaderSchema",
          fields: [
            { name: "name", type: "string" },
            { name: "favorite_number", type: ["int", "null"] },
            { name: "favorite_color", type: ["string", "null"] },
            { name: "favorite_city", type: ["string", "null"], default: "Redmond" },
          ],
        });
        const value = { name: "Ben", favorite_number: 7, favorite_color: "red" };
        const message = await serializer.serializeMessageData(value, writerSchema);
        await testInfo.client.send(message);
        const receivedMessage = await testInfo.client.receive();
        const deserializedValue = await serializer.deserializeMessageData(receivedMessage, {
          schema: readerSchema,
        });
        assert.deepStrictEqual(deserializedValue, { ...value, favorite_city: "Redmond" });
      });

      it("Serialize with `Schema`. Deserialize with `Reader Schema`, which is the original schema with a field (with no default value) added.", async () => {
        const writerSchema = JSON.stringify({
          namespace: "interop.avro",
          type: "record",
          name: "ReaderSchema",
          fields: [
            { name: "name", type: "string" },
            { name: "favorite_number", type: ["int", "null"] },
            { name: "favorite_color", type: ["string", "null"] },
          ],
        });
        const readerSchema = JSON.stringify({
          namespace: "interop.avro",
          type: "record",
          name: "ReaderSchema",
          fields: [
            { name: "name", type: "string" },
            { name: "favorite_number", type: ["int", "null"] },
            { name: "favorite_color", type: ["string", "null"] },
            { name: "favorite_city", type: ["string", "null"] },
          ],
        });
        const value = { name: "Ben", favorite_number: 7, favorite_color: "red" };
        const message = await serializer.serializeMessageData(value, writerSchema);
        await testInfo.client.send(message);
        const receivedMessage = await testInfo.client.receive();
        await assert.isRejected(
          serializer.deserializeMessageData(receivedMessage, {
            schema: readerSchema,
          }),
          /no matching field for default-less/
        );
      });
    });
  });
});
