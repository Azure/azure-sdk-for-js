// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { extractReceiverArguments, ServiceBusClient } from "../../../src/serviceBusClient";
import chai from "chai";
import { ServiceBusSessionReceiverOptions } from "../../../src/models";
import { entityPathMisMatchError } from "../../../src/util/errors";
import {
  createConnectionContextForConnectionString,
  createConnectionContextForCredential,
} from "../../../src/constructorHelpers";
import { TokenCredential } from "@azure/core-auth";
import { ConnectionContext } from "../../../src/connectionContext";
import { createConnectionContextForTestsWithSessionId } from "./unittestUtils";
import {
  ServiceBusSessionReceiver,
  ServiceBusSessionReceiverImpl,
} from "../../../src/receivers/sessionReceiver";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusSenderImpl } from "../../../src/sender";
import { MessageReceiver } from "../../../src/core/messageReceiver";
const assert = chai.assert;

const allLockModes: ("peekLock" | "receiveAndDelete")[] = ["peekLock", "receiveAndDelete"];

describe("serviceBusClient unit tests", () => {
  // the options type is used for our tests but it's not _hugely_ important, only
  // that it can and does get returned verbatim from whatever options slot
  // we pass.
  // So if we add other options types there's no need to generate a whole
  // new set of tests for it. :)
  const sessionReceiverOptions: ServiceBusSessionReceiverOptions = {};

  const testEntities = [
    { queue: "thequeue", entityPath: "thequeue" },
    {
      topic: "thetopic",
      subscription: "thesubscription",
      entityPath: "thetopic/Subscriptions/thesubscription",
    },
  ];

  testEntities.forEach((testEntity) => {
    it(`acceptSession argument extraction with ${testEntity.entityPath}`, async () => {
      const connectionString =
        "Endpoint=sb://testnamespace/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=testKey";
      const client = new ServiceBusClient(connectionString);

      try {
        const abortSignalStuff = createAbortSignal();

        const origConnectionContext = client["_connectionContext"];

        client["_connectionContext"] = createConnectionContextForTestsWithSessionId(
          "a session id",
          {
            ...origConnectionContext.config,
            entityPath: testEntity.topic ? testEntity.topic : testEntity.queue,
          }
        );

        let sessionReceiver: ServiceBusSessionReceiver;

        if (testEntity.queue) {
          sessionReceiver = await client.acceptSession(testEntity.queue, "a session id", {
            abortSignal: abortSignalStuff.signal,
            maxAutoLockRenewalDurationInMs: 101,
            tracingOptions: {},
            receiveMode: "receiveAndDelete",
          });
        } else {
          sessionReceiver = await client.acceptSession(
            testEntity.topic!,
            testEntity.subscription!,
            "a session id",
            {
              abortSignal: abortSignalStuff.signal,
              maxAutoLockRenewalDurationInMs: 101,
              tracingOptions: {},
              receiveMode: "receiveAndDelete",
            }
          );
        }

        assert.equal(sessionReceiver.receiveMode, "receiveAndDelete");
        assert.equal(sessionReceiver.entityPath, testEntity.entityPath);
        assert.equal(sessionReceiver.sessionId, "a session id");

        const impl = sessionReceiver as ServiceBusSessionReceiverImpl;
        assert.equal(impl["_messageSession"]["maxAutoRenewDurationInMs"], 101);

        assert.isTrue(abortSignalStuff.abortedPropertyWasChecked);
      } finally {
        await client.close();
      }
    });
  });

  testEntities.forEach((testEntity) => {
    it(`acceptNextSession argument extraction with ${testEntity.entityPath}`, async () => {
      const connectionString =
        "Endpoint=sb://testnamespace/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=testKey";
      const client = new ServiceBusClient(connectionString);

      try {
        const abortSignalStuff = createAbortSignal();

        const origConnectionContext = client["_connectionContext"];

        client["_connectionContext"] = createConnectionContextForTestsWithSessionId("session id", {
          ...origConnectionContext.config,
          entityPath: testEntity.topic ? testEntity.topic : testEntity.queue,
        });

        let sessionReceiver: ServiceBusSessionReceiver;

        if (testEntity.queue) {
          sessionReceiver = await client.acceptNextSession(testEntity.queue, {
            abortSignal: abortSignalStuff.signal,
            maxAutoLockRenewalDurationInMs: 101,
            tracingOptions: {},
            receiveMode: "receiveAndDelete",
          });
        } else {
          sessionReceiver = await client.acceptNextSession(
            testEntity.topic!,
            testEntity.subscription!,
            {
              abortSignal: abortSignalStuff.signal,
              maxAutoLockRenewalDurationInMs: 101,
              tracingOptions: {},
              receiveMode: "receiveAndDelete",
            }
          );
        }

        assert.equal(sessionReceiver.receiveMode, "receiveAndDelete");
        assert.equal(sessionReceiver.entityPath, testEntity.entityPath);
        assert.equal(sessionReceiver.sessionId, "session id");

        const impl = sessionReceiver as ServiceBusSessionReceiverImpl;
        assert.equal(impl["_messageSession"]["maxAutoRenewDurationInMs"], 101);

        assert.isTrue(abortSignalStuff.abortedPropertyWasChecked);
      } finally {
        await client.close();
      }
    });
  });

  describe("extractReceiverArguments", () => {
    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", { receiveMode: lockMode });
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: {},
        });
      });
    });

    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", {
          ...sessionReceiverOptions,
          receiveMode: lockMode,
        });
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: sessionReceiverOptions,
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
          options: {},
        });
      });
    });

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments("topic", "subscription", {
          ...sessionReceiverOptions,
          receiveMode: lockMode,
        });

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: sessionReceiverOptions,
        });
      });
    });

    it("failures", () => {
      const badReceiveMode = "WOW THIS ISN'T A RECEIVE MODE";
      assert.throws(
        () =>
          extractReceiverArguments("topic", "subscription", {
            ...sessionReceiverOptions,
            receiveMode: badReceiveMode as "peekLock",
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
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with topic and subscription in createReceiver", () => {
      try {
        const client = new ServiceBusClient(connectionString);
        client.createReceiver("my-topic", "my-subscription");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with queue in acceptSession", async () => {
      try {
        const client = new ServiceBusClient(connectionString);
        await client.acceptSession("my-queue", "session-id");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with queue in acceptNextSession", async () => {
      try {
        const client = new ServiceBusClient(connectionString);
        await client.acceptNextSession("my-queue");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with topic and subscription in acceptSession", async () => {
      try {
        const client = new ServiceBusClient(connectionString);
        await client.acceptSession("my-topic", "my-subscription");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with topic and subscription in acceptNextSession", async () => {
      try {
        const client = new ServiceBusClient(connectionString);
        await client.acceptNextSession("my-topic", "my-subscription");
        throw new Error("Receiver should not have been created successfully.");
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });

    it("mismatch with queue in createSender", () => {
      try {
        const client = new ServiceBusClient(connectionString);
        client.createSender("my-queue");
        throw new Error("Sender should not have been created successfully.");
      } catch (error: any) {
        assert.equal(error.message, entityPathMisMatchError);
      }
    });
  });

  describe("client identifier option", () => {
    const connectionString =
      "Endpoint=sb://testnamespace/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=testKey;EntityPath=testEntityPath";
    it("message sender created with specified identifier", () => {
      const client = new ServiceBusClient(connectionString, { identifier: "sbClientIdentifier" });
      const sender = client.createSender("testEntityPath", { identifier: "sbSenderId" });

      assert.equal((sender as ServiceBusSenderImpl)["_sender"]["identifier"], "sbSenderId");
    });

    it("message receiver created with specified identifier", () => {
      const client = new ServiceBusClient(connectionString, { identifier: "sbClientIdentifier" });
      const receiver = client.createReceiver("testEntityPath", { identifier: "sbReceiverId" });

      assert.equal((receiver as unknown as MessageReceiver)["identifier"], "sbReceiverId");
    });

    it("unique client identifier is created if not specified via options", () => {
      const client1 = new ServiceBusClient(connectionString);
      const client2 = new ServiceBusClient(connectionString);
      assert.ok(client1.identifier, "expect valid identifier for client1");
      assert.ok(client2.identifier, "expect valid identifier for client2");
      assert.notEqual(client1.identifier, client2.identifier, "client identifier should be unique");
      const uuidRegex =
        /^testnamespace-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      assert.ok(uuidRegex.test(client1.identifier), "expect random identifier for client1");
      assert.ok(uuidRegex.test(client2.identifier), "expect random identifier for client2");
    });

    it("unique sender identifier is created if not specified via options", () => {
      const client = new ServiceBusClient(connectionString, { identifier: "sbClientIdentifier" });
      const sender = client.createSender("testEntityPath");

      const uuidRegex =
        /^testEntityPath-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

      assert.ok(
        uuidRegex.test((sender as ServiceBusSenderImpl)["_sender"]["identifier"]),
        "expect random receiver identifier"
      );
    });

    it("unique receiver identifier is created if not specified via options", () => {
      const client = new ServiceBusClient(connectionString);
      const receiver = client.createReceiver("testEntityPath");
      const uuidRegex =
        /^testEntityPath-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

      assert.ok(
        uuidRegex.test((receiver as unknown as MessageReceiver)["identifier"]),
        "expect random receiver identifier"
      );
    });

    testEntities.forEach(async (testEntity) => {
      const connectionStr =
        "Endpoint=sb://testnamespace/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=testKey";

      it("acceptSession receiver created with specified identifier", async () => {
        const client = new ServiceBusClient(connectionStr);
        const origConnectionContext = client["_connectionContext"];
        client["_connectionContext"] = createConnectionContextForTestsWithSessionId("sessionId", {
          ...origConnectionContext.config,
          entityPath: testEntity.topic ? testEntity.topic : testEntity.queue,
        });
        try {
          let receiver: ServiceBusSessionReceiver;
          if (testEntity.queue) {
            receiver = await client.acceptSession(testEntity.queue, "sessionId", {
              identifier: "sbSessionReceiverId",
            });
          } else {
            receiver = await client.acceptSession(
              testEntity.topic!,
              testEntity.subscription!,
              "sessionId",
              { identifier: "sbSessionReceiverId" }
            );
          }

          assert.equal(
            (receiver as unknown as MessageReceiver)["identifier"],
            "sbSessionReceiverId"
          );
        } finally {
          await client.close();
        }
      });

      it("acceptNextSession receiver created with specified identifier", async () => {
        const client = new ServiceBusClient(connectionStr);
        const origConnectionContext = client["_connectionContext"];
        client["_connectionContext"] = createConnectionContextForTestsWithSessionId("sessionId", {
          ...origConnectionContext.config,
          entityPath: testEntity.topic ? testEntity.topic : testEntity.queue,
        });
        try {
          let receiver: ServiceBusSessionReceiver;
          if (testEntity.queue) {
            receiver = await client.acceptNextSession(testEntity.queue, {
              identifier: "sbSessionReceiverId",
            });
          } else {
            receiver = await client.acceptNextSession(testEntity.topic!, testEntity.subscription!, {
              identifier: "sbSessionReceiverId",
            });
          }

          assert.equal(
            (receiver as unknown as MessageReceiver)["identifier"],
            "sbSessionReceiverId"
          );
        } finally {
          await client.close();
        }
      });

      it("unique session receiver identifier is created if not specified via options", async () => {
        const client = new ServiceBusClient(connectionStr);
        const origConnectionContext = client["_connectionContext"];
        client["_connectionContext"] = createConnectionContextForTestsWithSessionId("sessionId", {
          ...origConnectionContext.config,
          entityPath: testEntity.topic ? testEntity.topic : testEntity.queue,
        });
        try {
          let receiver: ServiceBusSessionReceiver;
          let uuidRegex: RegExp;
          if (testEntity.queue) {
            receiver = await client.acceptNextSession(testEntity.queue);
            uuidRegex =
              /^thequeue-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
          } else {
            receiver = await client.acceptNextSession(testEntity.topic!, testEntity.subscription!);
            uuidRegex =
              /^thetopic\/Subscriptions\/thesubscription-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
          }

          assert.ok(
            uuidRegex.test((receiver as unknown as ServiceBusSessionReceiver)["identifier"]),
            "expect random session receiver identifier"
          );
        } finally {
          await client.close();
        }
      });
    });
  });

  describe("Create ConnectionContext helpers", () => {
    function validateWebsocketInfo(
      connectionContext: ConnectionContext,
      providedWebsocketConstructorOptions: any
    ): void {
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
          webSocketOptions: { webSocketConstructorOptions: options },
        });
        validateWebsocketInfo(connectionContext, options);
      });
    });

    describe("createConnectionContextForTokenCredential", () => {
      const pseudoTokenCred: TokenCredential = {
        async getToken() {
          return { expiresOnTimestamp: 0, token: "" };
        },
      };
      const endpoint = "endpoint";
      it("Websocket endpoint and constructor options are populated in the config", () => {
        const options = { randomOption: 123 };
        const connectionContext = createConnectionContextForCredential(pseudoTokenCred, endpoint, {
          webSocketOptions: { webSocketConstructorOptions: options },
        });
        validateWebsocketInfo(connectionContext, options);
      });
    });
  });
});
function createAbortSignal(): {
  signal: AbortSignalLike;
  abortedPropertyWasChecked: boolean;
} {
  const abortSignal = new AbortController().signal;
  const result = {
    signal: abortSignal,
    abortedPropertyWasChecked: false,
  };

  Object.defineProperty(abortSignal, "aborted", {
    get: () => {
      result.abortedPropertyWasChecked = true;
      return false;
    },
  });

  return result;
}
