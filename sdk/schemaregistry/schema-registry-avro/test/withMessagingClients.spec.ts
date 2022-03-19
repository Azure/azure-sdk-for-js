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
  messageAdapter: MessageAdapter<T>;
  messagingServiceName: string;
  client: MessagingTestClient<T>;
}

describe.only("With messaging clients", function () {
  const eventHubsConnectionString = env.EVENTHUB_CONNECTION_STRING || "";
  const eventHubName = env.EVENTHUB_NAME || "";
  const eventDataTestInfo: ScenariosTestInfo<EventData> = {
    messageAdapter: createEventDataAdapter({
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
    const { messageAdapter, client, messagingServiceName } = testInfo;
    describe(messagingServiceName, async function () {
      let serializer: AvroSerializer<any>;

      async function roundtrip(settings: {
        value: unknown;
        writerSchema: string;
        processMessage: (p: Promise<unknown>) => Promise<void>;
        readerSchema?: string;
        eventCount?: number;
      }): Promise<void> {
        const { value, readerSchema, processMessage, writerSchema, eventCount = 1 } = settings;
        const message = await serializer.serializeMessageData(value, writerSchema);
        await client.send(message);
        for await (const receivedMessage of client.receive({
          eventCount,
        })) {
          await processMessage(
            serializer.deserializeMessageData(receivedMessage, {
              schema: readerSchema,
            })
          );
        }
      }

      before(async function () {
        serializer = await createTestSerializer({
          serializerOptions: {
            autoRegisterSchemas: true,
            groupName: testGroup,
            messageAdapter,
          },
        });
        await client.initialize();
      });

      after(async function () {
        await client.cleanup();
      });

      it("Test schema with fields of type int/string/boolean/float/bytes", async () => {
        const writerSchema = JSON.stringify({
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
        await roundtrip({
          value,
          writerSchema,
          processMessage: async (p: Promise<unknown>) => assert.deepStrictEqual(await p, value),
        });
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
        await roundtrip({
          value,
          writerSchema,
          readerSchema,
          processMessage: async (p: Promise<unknown>) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            assert.deepStrictEqual(await p, (({ favorite_color, ...rest }) => rest)(value)),
        });
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
        await roundtrip({
          value,
          writerSchema,
          readerSchema,
          processMessage: async (p: Promise<unknown>) =>
            assert.deepStrictEqual(await p, { ...value, favorite_city: "Redmond" }),
        });
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
        await roundtrip({
          value,
          writerSchema,
          readerSchema,
          processMessage: async (p: Promise<unknown>) =>
            assert.isRejected(p, /no matching field for default-less/),
        });
      });
    });
  });
});
