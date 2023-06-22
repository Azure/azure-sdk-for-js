// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

import { JsonSerializer, MessageAdapter } from "../../src";
import { EventData, createEventDataAdapter } from "@azure/event-hubs";
import { MessagingTestClient } from "./clients/models";
import { assert } from "chai";
import { createEventHubsClient } from "./clients/eventHubs";
import { createMockedMessagingClient } from "./clients/mocked";
import { createTestSerializer } from "./utils/mockedSerializer";
import { matrix } from "@azure/test-utils";
import { testGroup } from "./utils/dummies";
import { Recorder, env } from "@azure-tools/test-recorder";

/**
 * An interface to group different bits needed by the tests for each messaging service
 */
interface ScenariosTestInfo<T> {
  messageAdapter: MessageAdapter<T>;
  messagingServiceName: string;
  /**
   * Each unit test correspond to one of the scenarios below
   */
  createScenario1Client: () => MessagingTestClient<T>;
}

describe("With messaging clients", function () {
  const eventHubsConnectionString = env.EVENTHUB_JSON_CONNECTION_STRING || "";
  const eventHubName = env.EVENTHUB_NAME || "";
  const alreadyEnqueued = env.CROSS_LANGUAGE !== undefined;

  function createEventHubsTestClient(settings: {
    eventHubName: string;
  }): MessagingTestClient<EventData> {
    const { eventHubName: inputEventHubName } = settings;
    const client = createMockedMessagingClient(() =>
      createEventHubsClient({
        alreadyEnqueued,
        eventHubName: alreadyEnqueued ? inputEventHubName : eventHubName,
        eventHubsConnectionString,
      })
    );
    client.initialize();
    return client;
  }

  const eventDataTestInfo: ScenariosTestInfo<EventData> = {
    messageAdapter: createEventDataAdapter({
      properties: {
        language: "js",
      },
    }),
    messagingServiceName: "Event Hub",
    createScenario1Client: () =>
      createEventHubsTestClient({
        eventHubName: "scenario_1",
      }),
  };
  matrix([[eventDataTestInfo]] as const, async (testInfo: ScenariosTestInfo<any>) => {
    const { messageAdapter, messagingServiceName, createScenario1Client } = testInfo;
    describe(messagingServiceName, async function () {
      let recorder: Recorder;
      let serializer: JsonSerializer<any>;

      async function roundtrip(settings: {
        client: MessagingTestClient<any>;
        value: unknown;
        writerSchema: string;
        processMessage: (p: Promise<unknown>) => Promise<void>;
        eventCount?: number;
      }): Promise<void> {
        const {
          client,
          value,
          processMessage,
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
            await processMessage(serializer.deserialize(receivedMessage));
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
              errors.map(({ error, language }) => `${language}:\t${error.message}`).join("\n")
          );
        }
      }

      beforeEach(async function () {
        recorder = new Recorder(this.currentTest);
        serializer = await createTestSerializer({
          serializerOptions: {
            autoRegisterSchemas: true,
            groupName: testGroup,
            messageAdapter,
          },
          recorder,
        });
      });

      it("Test schema with fields of type string/boolean/number/array/object", async () => {
        const writerSchema = JSON.stringify({
          $schema: "http://json-schema.org/draft-04/schema#",
          $id: "1",
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
        const value = {
          name: "Ben",
          age: 3,
          sibling: false,
          friend: ["Bob", "Anne"],
          class: { subject: "math", type: "morning" },
        };
        await roundtrip({
          client: createScenario1Client(),
          value,
          writerSchema,
          processMessage: async (p: Promise<unknown>) => assert.deepStrictEqual(await p, value),
        });
      });
    });
  });
});
