// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Cross-language testing makes sure payloads serialized in other languages are
 * still deserializable by the JavaScript serializer.
 *
 * By default, the test will send and receive messages with serialized payload.
 * To enable cross-language testing mode:
 * 1. make sure the Event Hubs resource has one event hub corresponding to each
 *    scenario below (corresponding to individual unit tests)
 * 2. separately send messages to those hubs from each language
 * 3. set environment variable CROSS_LANGUAGE to true to instruct the tests
 *    to read from corresponding event hubs
 */

import { JsonSchemaSerializer } from "../../src";
import { EventData, createEventDataAdapter } from "@azure/event-hubs";
import { MessagingTestClient } from "./clients/models";
import { assert, matrix } from "@azure-tools/test-utils";
import { createEventHubsClient } from "./clients/eventHubs";
import { createMockedMessagingClient } from "./clients/mocked";
import { createTestSerializer } from "./utils/mockedSerializer";
import { testGroup } from "./utils/dummies";
import { Recorder, env } from "@azure-tools/test-recorder";
import { SchemaRegistry } from "@azure/schema-registry";
import { createTestRegistry } from "./utils/mockedRegistryClient";

matrix([[true, false]] as const, async (skipParsingJson: boolean) => {
  const eventHubHostName = env.EVENTHUB_JSON_HOST_NAME || "";
  const eventHubName = env.EVENTHUB_NAME || "";
  const alreadyEnqueued = env.CROSS_LANGUAGE !== undefined;
  let registry: SchemaRegistry;

  function createEventHubsTestClient(settings: {
    eventHubName: string;
    skipParsingBodyAsJson?: boolean;
  }): MessagingTestClient<EventData> {
    const { eventHubName: inputEventHubName, skipParsingBodyAsJson } = settings;
    const client = createMockedMessagingClient(() =>
      createEventHubsClient({
        alreadyEnqueued,
        eventHubName: alreadyEnqueued ? inputEventHubName : eventHubName,
        eventHubHostName,
      }),
    );
    client.initialize({
      skipParsingBodyAsJson,
    });
    return client;
  }

  describe(`Event Hub Test With Messaging Client with skipParsingBodyAsJson=${skipParsingJson}`, async function () {
    let recorder: Recorder;
    let serializer: JsonSchemaSerializer<any>;

    async function roundtrip(settings: {
      client: MessagingTestClient<any>;
      value: unknown;
      writerSchema: string;
      skipParsingBodyAsJson: boolean;
      eventCount?: number;
    }): Promise<void> {
      const {
        client,
        value,
        skipParsingBodyAsJson,
        writerSchema,
        /**
         * if messages are already enqueued, then we can expect they have been
         * sent from all four languages and we would like receive from all four
         * of them.
         */
        eventCount = alreadyEnqueued ? 4 : 1,
      } = settings;
      if (!alreadyEnqueued) {
        try {
          const message = await serializer.serialize(value, writerSchema);
          await client.send(message);
        } catch (e: any) {
          await client.cleanup();
          throw e;
        }
      }
      const errors: {
        error: Error;
        language: string;
      }[] = [];
      for await (const receivedMessage of client.receive({
        eventCount,
      })) {
        try {
          if (skipParsingBodyAsJson) {
            assert.deepEqual(await serializer.deserialize(receivedMessage), value);
          } else {
            assert.deepEqual(receivedMessage.body, value);
          }
        } catch (e: any) {
          errors.push({
            error: e as Error,
            language: receivedMessage.properties.language,
          });
        }
      }
      await client.cleanup();
      if (errors.length > 0) {
        throw new Error(
          "The following error(s) occurred:\n" +
            errors.map(({ error, language }) => `${language}:\t${error.message}`).join("\n"),
        );
      }
    }

    const messageAdapter = createEventDataAdapter({
      properties: {
        language: "js",
      },
    });

    let client: MessagingTestClient<EventData>;
    let writerSchema: string;
    let value: object;

    beforeEach(async function () {
      recorder = new Recorder(this.currentTest);
      client = createEventHubsTestClient({
        eventHubName: "scenario_1",
        skipParsingBodyAsJson: skipParsingJson,
      });
      registry = createTestRegistry({ recorder });

      serializer = await createTestSerializer({
        registry,
        serializerOptions: {
          groupName: testGroup,
          messageAdapter,
        },
        recorder,
      });
      writerSchema = JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "product",
        title: "Product",
        description: "A product from Acme's catalog",
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the student",
          },
          age: {
            type: "integer",
            description: "The age of the student",
          },
          sibling: {
            type: "boolean",
            description: "Whether the student has any sibling",
          },
          friend: {
            type: "array",
            description: "The names of friends the student plays with",
          },
          class: {
            type: "object",
            description: "The subject the student studies",
          },
        },
        required: ["name", "age", "sibling", "friend", "class"],
      });
      value = {
        name: "Ben",
        age: 3,
        sibling: false,
        friend: ["Bob", "Anne"],
        class: { subject: "math", type: "morning" },
      };
    });

    it("Test schema with fields of type string/boolean/number/array/object", async () => {
      await registry.registerSchema({
        definition: writerSchema,
        format: "json",
        groupName: testGroup,
        name: "product",
      });
      await roundtrip({
        client,
        value,
        writerSchema,
        skipParsingBodyAsJson: skipParsingJson,
      });
    });
  });
});
