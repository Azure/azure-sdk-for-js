// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { extractReceiverArguments, ServiceBusClient } from "../../src/serviceBusClient";
import chai from "chai";
import { CreateSessionReceiverOptions } from "../../src/models";
import { entityPathMisMatchError } from "../../src/util/errors";
import {
  createConnectionContextForConnectionString,
  createConnectionContextForTokenCredential
} from "../../src/constructorHelpers";
import { TokenCredential } from "@azure/core-http";
import { ConnectionContext } from "../../src/connectionContext";
const assert = chai.assert;

const allLockModes: ("peekLock" | "receiveAndDelete")[] = ["peekLock", "receiveAndDelete"];

describe("serviceBusClient unit tests", () => {
  // the options type is used for our tests but it's not _hugely_ important, only
  // that it can and does get returned verbatim from whatever options slot
  // we pass.
  // So if we add other options types there's no need to generate a whole
  // new set of tests for it. :)
  const sessionReceiverOptions:
    | CreateSessionReceiverOptions<"peekLock">
    | CreateSessionReceiverOptions<"receiveAndDelete"> = {
    sessionId: "session-id"
  };

  describe("extractReceiverArguments", () => {
    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", { receiveMode: lockMode });
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: {}
        });
      });
    });

    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", {
          ...sessionReceiverOptions,
          receiveMode: lockMode
        });
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: sessionReceiverOptions
        });
      });
    });

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("topic", "subscription", { receiveMode: lockMode });

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: {}
        });
      });
    });

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments("topic", "subscription", {
          ...sessionReceiverOptions,
          receiveMode: lockMode
        });

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: sessionReceiverOptions
        });
      });
    });

    it("failures", () => {
      const badReceiveMode = "WOW THIS ISN'T A RECEIVE MODE";
      assert.throws(
        () =>
          extractReceiverArguments("topic", "subscription", {
            ...sessionReceiverOptions,
            receiveMode: badReceiveMode as "peekLock"
          }),
        `Invalid receiveMode '${badReceiveMode}' provided. Valid values are 'peekLock' and 'receiveAndDelete'`
      );
    });
  });

  describe("entityPath in connection string", () => {
    const connectionString =
      "Endpoint=sb://testnamespace/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=testKey;EntityPath=testEntityPath";

    it("mismatch with queue in createReceiver", () => {
      try {
        const client = new ServiceBusClient(connectionString);
        client.createReceiver("my-queue");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with topic and subscription in createReceiver", () => {
      try {
        const client = new ServiceBusClient(connectionString);
        client.createReceiver("my-topic", "my-subscription");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with queue in createSessionReceiver", async () => {
      try {
        const client = new ServiceBusClient(connectionString);
        await client.createSessionReceiver("my-queue");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with topic and subscription in createSessionReceiver", async () => {
      try {
        const client = new ServiceBusClient(connectionString);
        await client.createSessionReceiver("my-topic", "my-subscription");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with queue in createSender", () => {
      try {
        const client = new ServiceBusClient(connectionString);
        client.createSender("my-queue");
        throw new Error("Sender should not have been created successfully.");
      } catch (error) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });
  });

  describe("Create ConnectionContext helpers", () => {
    function validateWebsocketInfo(
      connectionContext: ConnectionContext,
      providedWebsocketConstructorOptions: any
    ) {
      assert.equal(
        connectionContext.config.webSocketEndpointPath,
        "$servicebus/websocket",
        "Unexpected webSocketEndpointPath in the connection config"
      );
      assert.equal(
        connectionContext.config.webSocketConstructorOptions,
        providedWebsocketConstructorOptions,
        "Unexpected webSocketEndpointPath in the connection config"
      );
    }

    describe("createConnectionContextForConnectionString", () => {
      it("Websocket endpoint and constructor options are populated in the config", () => {
        const connString =
          "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=some-queue";
        const options = { randomOption: 123 };
        const connectionContext = createConnectionContextForConnectionString(connString, {
          webSocketOptions: { webSocketConstructorOptions: options }
        });
        validateWebsocketInfo(connectionContext, options);
      });

      it("undefined entity path is translated to ''", () => {
        const connString = "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;";
        const connectionContext = createConnectionContextForConnectionString(connString, {});
        assert.equal(
          connectionContext.config.entityPath,
          "",
          "Unexpected entityPath in the connection config"
        );
      });
    });

    describe("createConnectionContextForTokenCredential", () => {
      const pseudoTokenCred: TokenCredential = {
        async getToken() {
          return { expiresOnTimestamp: 0, token: "" };
        }
      };
      const endpoint = "endpoint";
      it("Websocket endpoint and constructor options are populated in the config", () => {
        const options = { randomOption: 123 };
        const connectionContext = createConnectionContextForTokenCredential(
          pseudoTokenCred,
          endpoint,
          { webSocketOptions: { webSocketConstructorOptions: options } }
        );
        validateWebsocketInfo(connectionContext, options);
      });

      it("undefined entity path is translated to ''", () => {
        const connectionContext = createConnectionContextForTokenCredential(
          pseudoTokenCred,
          endpoint,
          {}
        );
        assert.equal(
          connectionContext.config.entityPath,
          "",
          "Unexpected entityPath in the connection config"
        );
      });
    });
  });
});
