// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusClient } from "../../../src/index.js";
import type { ServiceBusReceiverImpl } from "../../../src/receivers/receiver.js";
import { ServiceBusSessionReceiverImpl } from "../../../src/receivers/sessionReceiver.js";
import type { MessageSession } from "../../../src/session/messageSession.js";
import { describe, it } from "vitest";
import { assert } from "../../public/utils/chai.js";
import type { Message as RheaMessage } from "rhea-promise";
import type { Delivery, Receiver, Sender, Session } from "rhea-promise";
import { RequestResponseLink } from "@azure/core-amqp";
import { EventEmitter } from "events";

describe("Batch delete messages", function (): void {
  const connectionString = "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=q";

  function stubDeleteMessages(
    context: any,
    results: Array<number | Error>,
    calls: Array<{ messageCount: number; cutoff?: Date; sessionId?: string }> = [],
  ): () => number {
    let call = 0;
    const managementClient = {
      deleteMessages: async (
        messageCount: number,
        cutoff?: Date,
        sessionId?: string,
      ): Promise<number> => {
        calls.push({ messageCount, cutoff, sessionId });
        const value = results[call] ?? 0;
        call++;
        if (value instanceof Error) {
          throw value;
        }
        return value;
      },
    };
    context.getManagementClient = (): any => managementClient;
    return () => call;
  }

  describe("management request", function (): void {
    it("uses the batch-delete wire contract and returns the actual count", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient: any = client["_connectionContext"].getManagementClient("q");
        const cutoff = new Date("2026-08-27T12:30:00.000Z");
        let capturedRequest: RheaMessage | undefined;
        managementClient.initWithUniqueReplyTo = async (options: any): Promise<any> => options;
        managementClient._waitForManagementRequestSendable = async (
          _logger: any,
          options: any,
        ): Promise<any> => options;
        managementClient._sendManagementRequest = async (request: RheaMessage): Promise<any> => {
          capturedRequest = request;
          return { application_properties: { statusCode: 200 }, body: { "message-count": 2 } };
        };

        const result = await managementClient.deleteMessages(500, cutoff, "session-1", {
          associatedLinkName: "link-1",
        });

        assert.equal(result, 2);
        assert.equal(
          capturedRequest!.application_properties!.operation,
          "com.microsoft:batch-delete-messages",
        );
        assert.equal(capturedRequest!.application_properties!["associated-link-name"], "link-1");
        assert.equal(capturedRequest!.body["message-count"].value, 500);
        assert.deepEqual(capturedRequest!.body["enqueued-time-utc"], cutoff);
        assert.equal(capturedRequest!.body["session-id"], "session-1");
      } finally {
        await client.close();
      }
    });

    it("rejects a bodyless 204 response", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient: any = client["_connectionContext"].getManagementClient("q");
        managementClient.initWithUniqueReplyTo = async (options: any): Promise<any> => options;
        managementClient._waitForManagementRequestSendable = async (
          _logger: any,
          options: any,
        ): Promise<any> => options;
        managementClient._sendManagementRequest = async (): Promise<any> => ({
          application_properties: { statusCode: 204 },
        });

        await assert.isRejected(managementClient.deleteMessages(1), /Unexpected response/);
      } finally {
        await client.close();
      }
    });

    it("snapshots the cutoff before asynchronous preparation", async () => {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient = client["_connectionContext"].getManagementClient("q");
        const cutoff = new Date("2026-08-27T12:30:00.000Z");
        const timestamp = cutoff.getTime();
        managementClient["initWithUniqueReplyTo"] = async (options = {}) => {
          cutoff.setTime(timestamp + 60000);
          return options;
        };
        managementClient["_waitForManagementRequestSendable"] = async (_, options = {}) => options;
        managementClient["_sendManagementRequest"] = async (request) => {
          assert.equal(request.body["enqueued-time-utc"].getTime(), timestamp);
          return { application_properties: { statusCode: 200 }, body: { "message-count": 0 } };
        };
        await managementClient.deleteMessages(1, cutoff);
      } finally {
        await client.close();
      }
    });

    it("retries an exhausted preparation budget without retrying dispatch", async () => {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient = client["_connectionContext"].getManagementClient("q");
        let attempts = 0;
        let dispatches = 0;
        managementClient["initWithUniqueReplyTo"] = async (options = {}) => options;
        managementClient["_waitForManagementRequestSendable"] = async (_, options = {}) => ({
          ...options,
          timeoutInMs: ++attempts === 1 ? 0 : 1000,
        });
        managementClient["_sendManagementRequest"] = async () => {
          dispatches++;
          return { application_properties: { statusCode: 200 }, body: { "message-count": 0 } };
        };
        await managementClient.deleteMessages(1, undefined, undefined, {
          retryOptions: { maxRetries: 1, retryDelayInMs: 0 },
        });
        assert.equal(attempts, 2);
        assert.equal(dispatches, 1);
      } finally {
        await client.close();
      }
    });

    it.each(["preparation", "pending"] as const)(
      "cancels during %s without retrying a delete",
      async (phase) => {
        const client = new ServiceBusClient(connectionString);
        try {
          const managementClient = client["_connectionContext"].getManagementClient("q");
          const controller = new AbortController();
          let preparations = 0;
          let dispatches = 0;
          const sender: Partial<Sender> = {
            on: () => sender as Sender,
            send: () => {
              dispatches++;
              controller.abort();
              return {} as Delivery;
            },
          };
          const receiver = Object.assign(new EventEmitter(), {
            address: "$management",
          }) as Receiver;
          const session = { connection: client["_connectionContext"].connection } as Session;
          const link = new RequestResponseLink(session, sender as Sender, receiver);
          managementClient["_link"] = link;
          managementClient["initWithUniqueReplyTo"] = async (options = {}) => options;
          managementClient["_waitForManagementRequestSendable"] = async (_, options = {}) => {
            preparations++;
            if (phase === "preparation") controller.abort();
            return options;
          };
          await assert.isRejected(
            managementClient.deleteMessages(1, undefined, undefined, {
              abortSignal: controller.signal,
              retryOptions: { maxRetries: 2, retryDelayInMs: 0 },
            }),
            /aborted|cancelled/i,
          );
          assert.equal(preparations, 1);
          assert.equal(dispatches, phase === "pending" ? 1 : 0);
          assert.equal(link["_responsesMap"].size, 0);
          managementClient["_link"] = undefined;
        } finally {
          await client.close();
        }
      },
    );

    it("supports the Premium count range", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient: any = client["_connectionContext"].getManagementClient("q");
        let capturedRequest: RheaMessage | undefined;
        managementClient.initWithUniqueReplyTo = async (options: any): Promise<any> => options;
        managementClient._waitForManagementRequestSendable = async (
          _logger: any,
          options: any,
        ): Promise<any> => options;
        managementClient._sendManagementRequest = async (request: RheaMessage): Promise<any> => {
          capturedRequest = request;
          return { application_properties: { statusCode: 200 }, body: { "message-count": 4000 } };
        };

        assert.equal(await managementClient.deleteMessages(4000), 4000);
        assert.equal(capturedRequest!.body["message-count"].value, 4000);
      } finally {
        await client.close();
      }
    });

    it("retries management-link setup but dispatches once", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient: any = client["_connectionContext"].getManagementClient("q");
        let initializationCount = 0;
        let dispatchCount = 0;
        managementClient.initWithUniqueReplyTo = async (options: any): Promise<any> => {
          initializationCount++;
          if (initializationCount === 1) {
            throw retryableError();
          }
          return options;
        };
        managementClient._waitForManagementRequestSendable = async (
          _logger: any,
          options: any,
        ): Promise<any> => options;
        managementClient._sendManagementRequest = async (): Promise<any> => {
          dispatchCount++;
          return { application_properties: { statusCode: 200 }, body: { "message-count": 1 } };
        };

        assert.equal(
          await managementClient.deleteMessages(1, undefined, undefined, {
            retryOptions: { maxRetries: 1, retryDelayInMs: 0 },
          }),
          1,
        );
        assert.equal(initializationCount, 2);
        assert.equal(dispatchCount, 1);
      } finally {
        await client.close();
      }
    });

    it("rejects malformed response counts", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient: any = client["_connectionContext"].getManagementClient("q");
        managementClient.initWithUniqueReplyTo = async (options: any): Promise<any> => options;
        managementClient._waitForManagementRequestSendable = async (
          _logger: any,
          options: any,
        ): Promise<any> => options;
        for (const deletedCount of [-1, 1.5, 11, undefined]) {
          managementClient._sendManagementRequest = async (): Promise<any> => ({
            application_properties: { statusCode: 200 },
            body: { "message-count": deletedCount },
          });
          await assert.isRejected(managementClient.deleteMessages(10), /valid message-count/);
        }
      } finally {
        await client.close();
      }
    });

    it("rejects invalid inputs before link initialization", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const managementClient: any = client["_connectionContext"].getManagementClient("q");
        let initializationCount = 0;
        managementClient.initWithUniqueReplyTo = async (): Promise<any> => {
          initializationCount++;
          return {};
        };

        for (const messageCount of [0, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 0x80000000]) {
          await assert.isRejected(managementClient.deleteMessages(messageCount), /integer between/);
        }
        await assert.isRejected(
          managementClient.deleteMessages(1, new Date(Number.NaN)),
          /valid Date/,
        );
        assert.equal(initializationCount, 0);
      } finally {
        await client.close();
      }
    });
  });

  function retryableError(): Error {
    const error = new Error("The delete outcome is unknown.");
    (error as any).retryable = true;
    return error;
  }

  describe("non-session receiver", function (): void {
    it("deleteMessages returns a DeleteMessagesResult with the deleted count", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        stubDeleteMessages(unitReceiver["_context"], [7]);

        const result = await unitReceiver.deleteMessages(10);

        assert.deepEqual(result, { deletedCount: 7 });
      } finally {
        await client.close();
      }
    });

    it("deleteMessages validates public option names before management dispatch", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;

        await assert.isRejected(
          unitReceiver.deleteMessages(0),
          /'maxMessageCount' must be an integer between/,
        );
        await assert.isRejected(
          unitReceiver.deleteMessages(1, {
            beforeEnqueueTime: new Date(Number.NaN),
          }),
          /'beforeEnqueueTime' must be a valid Date/,
        );
      } finally {
        await client.close();
      }
    });

    it("purgeMessages accumulates the deleted count across batches", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        const calls: Array<{ messageCount: number; cutoff?: Date }> = [];
        stubDeleteMessages(unitReceiver["_context"], [500, 2, 0], calls);

        const result = await unitReceiver.purgeMessages();

        assert.deepEqual(result, { deletedCount: 502 });
        assert.deepEqual(
          calls.map(({ messageCount }) => messageCount),
          [500, 500, 500],
        );
        assert.strictEqual(calls[0].cutoff, calls[1].cutoff);
        assert.strictEqual(calls[0].cutoff, calls[2].cutoff);
      } finally {
        await client.close();
      }
    });

    it("purgeMessages supports a Premium batch-size override", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        const calls: Array<{ messageCount: number; cutoff?: Date }> = [];
        stubDeleteMessages(unitReceiver["_context"], [4000, 2, 0], calls);

        const result = await unitReceiver.purgeMessages({ maxMessagesPerBatch: 4000 });

        assert.deepEqual(result, { deletedCount: 4002 });
        assert.deepEqual(
          calls.map(({ messageCount }) => messageCount),
          [4000, 4000, 4000],
        );
        assert.strictEqual(calls[0].cutoff, calls[1].cutoff);
        assert.strictEqual(calls[0].cutoff, calls[2].cutoff);
      } finally {
        await client.close();
      }
    });

    it("purgeMessages snapshots a caller-owned cutoff across batches", async () => {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        const cutoff = new Date("2026-08-27T12:30:00.000Z");
        const timestamp = cutoff.getTime();
        let calls = 0;
        unitReceiver.deleteMessages = async (_, options = {}) => {
          await Promise.resolve();
          cutoff.setTime(timestamp + 60000);
          assert.equal(options.beforeEnqueueTime!.getTime(), timestamp);
          return { deletedCount: calls++ === 0 ? 1 : 0 };
        };
        assert.deepEqual(await unitReceiver.purgeMessages({ beforeEnqueueTime: cutoff }), {
          deletedCount: 1,
        });
        assert.equal(calls, 2);
      } finally {
        await client.close();
      }
    });

    it("purgeMessages allows the service to enforce its batch-size limit", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        const calls: Array<{ messageCount: number }> = [];
        stubDeleteMessages(unitReceiver["_context"], [0], calls);

        await unitReceiver.purgeMessages({ maxMessagesPerBatch: 4001 });

        assert.equal(calls[0].messageCount, 4001);
      } finally {
        await client.close();
      }
    });

    it("purgeMessages rejects batch sizes outside the positive int32 range before dispatch", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        const getCallCount = stubDeleteMessages(unitReceiver["_context"], [1]);

        for (const maxMessagesPerBatch of [0, 1.5, 0x80000000]) {
          await assert.isRejected(
            unitReceiver.purgeMessages({ maxMessagesPerBatch }),
            /integer between 1 and 2147483647/,
          );
        }
        assert.equal(getCallCount(), 0);
      } finally {
        await client.close();
      }
    });

    it("deleteMessages does not retry after an uncertain failure", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = client.createReceiver("q") as ServiceBusReceiverImpl;
        unitReceiver["_retryOptions"] = { maxRetries: 1, retryDelayInMs: 0 };
        const getCallCount = stubDeleteMessages(unitReceiver["_context"], [retryableError(), 7]);

        await assert.isRejected(unitReceiver.deleteMessages(10));

        assert.equal(getCallCount(), 1);
      } finally {
        await client.close();
      }
    });
  });

  describe("session receiver", function (): void {
    function createSessionReceiver(client: ServiceBusClient): ServiceBusSessionReceiverImpl {
      const context = client["_connectionContext"];
      const messageSession = {
        sessionId: "session-1",
        identifier: "id-1",
        name: "link-1",
        isOpen: () => true,
        close: async (): Promise<void> => {},
      } as unknown as MessageSession;
      context.messageSessions[messageSession.name] = messageSession as any;
      return new ServiceBusSessionReceiverImpl(
        messageSession,
        context,
        "q",
        "peekLock",
        false,
        false,
        {},
      );
    }

    it("deleteMessages returns a DeleteMessagesResult with the deleted count", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = createSessionReceiver(client);
        stubDeleteMessages(unitReceiver["_context"], [4]);

        const result = await unitReceiver.deleteMessages(10);

        assert.deepEqual(result, { deletedCount: 4 });
      } finally {
        await client.close();
      }
    });

    it("purgeMessages accumulates the deleted count across batches", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = createSessionReceiver(client);
        const calls: Array<{ messageCount: number; cutoff?: Date; sessionId?: string }> = [];
        stubDeleteMessages(unitReceiver["_context"], [500, 2, 0], calls);

        const result = await unitReceiver.purgeMessages();

        assert.deepEqual(result, { deletedCount: 502 });
        assert.deepEqual(
          calls.map(({ messageCount }) => messageCount),
          [500, 500, 500],
        );
        assert.strictEqual(calls[0].cutoff, calls[1].cutoff);
        assert.strictEqual(calls[0].cutoff, calls[2].cutoff);
        assert.deepEqual(
          calls.map(({ sessionId }) => sessionId),
          ["session-1", "session-1", "session-1"],
        );
      } finally {
        await client.close();
      }
    });

    it("purgeMessages snapshots a caller-owned cutoff across session batches", async () => {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = createSessionReceiver(client);
        const cutoff = new Date("2026-08-27T12:30:00.000Z");
        const timestamp = cutoff.getTime();
        let calls = 0;
        unitReceiver.deleteMessages = async (_, options = {}) => {
          await Promise.resolve();
          cutoff.setTime(timestamp + 60000);
          assert.equal(options.beforeEnqueueTime!.getTime(), timestamp);
          return { deletedCount: calls++ === 0 ? 1 : 0 };
        };
        assert.deepEqual(await unitReceiver.purgeMessages({ beforeEnqueueTime: cutoff }), {
          deletedCount: 1,
        });
        assert.equal(calls, 2);
      } finally {
        await client.close();
      }
    });

    it("deleteMessages does not retry after an uncertain failure", async function (): Promise<void> {
      const client = new ServiceBusClient(connectionString);
      try {
        const unitReceiver = createSessionReceiver(client);
        unitReceiver["_retryOptions"] = { maxRetries: 1, retryDelayInMs: 0 };
        const getCallCount = stubDeleteMessages(unitReceiver["_context"], [retryableError(), 4]);

        await assert.isRejected(unitReceiver.deleteMessages(10));

        assert.equal(getCallCount(), 1);
      } finally {
        await client.close();
      }
    });
  });
});
