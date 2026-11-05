// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import type {
  OnRecoveredArgs,
  OnRecoveringArgs,
  WebPubSubClientOptions,
  WebPubSubClientCredential,
} from "../src/index.js";
import { WebPubSubClient, WebPubSubJsonProtocol } from "../src/index.js";
import { ControlledWebSocketFactory } from "./controlledWebSocketClient.js";
import { getConnectedPayload, getGroupDataPayload } from "./utils.js";

describe("WebPubSubClient reliable recovery", () => {
  let client: WebPubSubClient;
  let transport: ControlledWebSocketFactory;
  let recoveryTimeout: AbortController;
  let events: string[];

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    recoveryTimeout = new AbortController();
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(recoveryTimeout.signal);
    await startClient();
  });

  async function startClient(
    options: WebPubSubClientOptions = {},
    connectedPayload: object = getConnectedPayload("A", "test-token"),
    credential: WebPubSubClientCredential = {
      getClientAccessUrl: "wss://example.com/client/hubs/test",
    },
  ): Promise<void> {
    client = new WebPubSubClient(credential, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
      messageRetryOptions: { maxRetries: 0 },
      ...options,
    });
    transport = new ControlledWebSocketFactory(client);
    events = [];
    client.on("connected", ({ connectionId }) => events.push(`connected(${connectionId})`));
    client.on("disconnected", ({ connectionId }) => events.push(`disconnected(${connectionId})`));
    client.on("stopped", () => events.push("stopped"));
    client.on("recovering", ({ connectionId }) => events.push(`recovering(${connectionId})`));
    client.on("recovered", ({ connectionId }) => events.push(`recovered(${connectionId})`));

    const starting = client.start();
    await vi.advanceTimersByTimeAsync(0);
    transport.socket(0).receiveOpen();
    await starting;
    transport.socket(0).receiveMessage(JSON.stringify(connectedPayload));
    await vi.advanceTimersByTimeAsync(0);
  }

  afterEach(async () => {
    try {
      recoveryTimeout.abort();
      client.stop();
      const socket = transport.sockets.at(-1);
      if (socket && !socket.isOpen()) {
        // Release a pending open so the real recovery loop can finish teardown.
        socket.receiveClose(1008);
      }
      await vi.advanceTimersByTimeAsync(1000);
    } finally {
      vi.clearAllTimers();
      vi.useRealTimers();
      vi.restoreAllMocks();
    }
  });

  it("does not emit recovery events for an intentional stop", async () => {
    client.stop();
    await vi.advanceTimersByTimeAsync(0);
    expect(events).toEqual(["connected(A)", "disconnected(A)", "stopped"]);
    expect(transport.sockets).toHaveLength(1);
  });

  it("retains subscriptions across stop/start and allows a listener to remove itself", async () => {
    const selfRemoving = vi.fn((_: OnRecoveredArgs) => client.off("recovered", selfRemoving));
    client.on("recovered", selfRemoving);
    transport.socket(0).receiveClose(1006);
    transport.socket(1).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);
    client.stop();
    const starting = client.start();
    transport.socket(2).receiveOpen();
    await starting;
    transport.socket(2).receiveMessage(JSON.stringify(getConnectedPayload("B", "new-token")));
    await vi.advanceTimersByTimeAsync(0);
    transport.socket(2).receiveClose(1006);
    transport.socket(3).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);

    expect(selfRemoving).toHaveBeenCalledTimes(1);
    expect(events).toEqual([
      "connected(A)",
      "recovering(A)",
      "recovered(A)",
      "disconnected(A)",
      "stopped",
      "connected(B)",
      "recovering(B)",
      "recovered(B)",
    ]);
  });

  it("supports typed listeners, ordered dispatch, minimal payloads, and removal", async () => {
    expectTypeOf<keyof OnRecoveringArgs>().toEqualTypeOf<"connectionId">();
    expectTypeOf<keyof OnRecoveredArgs>().toEqualTypeOf<"connectionId">();
    const calls: string[] = [];
    const payloads: unknown[] = [];
    const startSocketCounts: number[] = [];
    const recoveredSocketOpen: boolean[] = [];
    const recovering = (args: OnRecoveringArgs): void => {
      calls.push("start:first");
      payloads.push(args);
    };
    const recovered = (args: OnRecoveredArgs): void => {
      calls.push("success:first");
      payloads.push(args);
    };
    client.on("recovering", recovering);
    client.on("recovering", (args) => {
      expectTypeOf(args).toEqualTypeOf<OnRecoveringArgs>();
      calls.push("start:second");
      startSocketCounts.push(transport.sockets.length);
    });
    client.on("recovered", recovered);
    client.on("recovered", (args) => {
      expectTypeOf(args).toEqualTypeOf<OnRecoveredArgs>();
      calls.push("success:second");
      recoveredSocketOpen.push(transport.sockets.at(-1)!.isOpen());
    });

    transport.socket(0).receiveClose(1006);
    transport.socket(1).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);
    client.off("recovering", recovering);
    client.off("recovered", recovered);
    transport.socket(1).receiveClose(1006);
    transport.socket(2).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);

    expect(calls).toEqual([
      "start:first",
      "start:second",
      "success:first",
      "success:second",
      "start:second",
      "success:second",
    ]);
    expect(payloads).toEqual([{ connectionId: "A" }, { connectionId: "A" }]);
    expect(startSocketCounts).toEqual([1, 2]);
    expect(recoveredSocketOpen).toEqual([true, true]);
  });

  it.each([
    {
      name: "close code 1008",
      options: {},
      payload: getConnectedPayload("A", "test-token"),
      code: 1008,
    },
    {
      name: "non-reliable protocol",
      options: { protocol: WebPubSubJsonProtocol() },
      payload: getConnectedPayload("A", "test-token"),
      code: 1006,
    },
    { name: "missing token", options: {}, payload: getConnectedPayload("A"), code: 1006 },
    {
      name: "missing connection ID",
      options: {},
      payload: {
        type: "system",
        event: "connected",
        userId: "user",
        reconnectionToken: "test-token",
      },
      code: 1006,
    },
  ])("does not emit recovery events for $name", async ({ options, payload, code }) => {
    client.stop();
    await startClient(options, payload);
    transport.socket(0).receiveClose(code);
    await vi.advanceTimersByTimeAsync(0);

    expect(events.filter((event) => event.startsWith("recover"))).toEqual([]);
    expect(events.at(-1)).toBe("stopped");
    expect(transport.sockets).toHaveLength(1);
  });

  it.each([false, true])(
    "preserves exhaustion fallback with autoReconnect=%s",
    async (autoReconnect) => {
      client.stop();
      await startClient({ autoReconnect });
      transport.socket(0).receiveClose(1006);
      transport.socket(1).receiveClose(1006);
      recoveryTimeout.abort();
      await vi.advanceTimersByTimeAsync(1000);

      if (autoReconnect) {
        transport.socket(2).receiveOpen();
        transport.socket(2).receiveMessage(JSON.stringify(getConnectedPayload("B", "new-token")));
        await vi.advanceTimersByTimeAsync(0);
        expect(events).toEqual([
          "connected(A)",
          "recovering(A)",
          "disconnected(A)",
          "connected(B)",
        ]);
      } else {
        expect(events).toEqual(["connected(A)", "recovering(A)", "disconnected(A)", "stopped"]);
        expect(transport.sockets).toHaveLength(2);
      }
    },
  );

  it("emits one pair per episode rather than per retry", async () => {
    transport.socket(0).receiveClose(1006);
    transport.socket(1).receiveClose(1006);
    await vi.advanceTimersByTimeAsync(1000);
    transport.socket(2).receiveClose(1006);
    await vi.advanceTimersByTimeAsync(1000);
    expect(events).toEqual(["connected(A)", "recovering(A)"]);

    transport.socket(3).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);
    transport.socket(3).receiveClose(1006);
    transport.socket(4).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);

    expect(events).toEqual([
      "connected(A)",
      "recovering(A)",
      "recovered(A)",
      "recovering(A)",
      "recovered(A)",
    ]);
    expect(transport.sockets).toHaveLength(5);
  });

  it("does not attribute an old recovery success to a newly started connection", async () => {
    let restarting: Promise<void> | undefined;
    const restart = (): void => {
      client.off("stopped", restart);
      restarting = client.start();
      transport.socket(2).receiveOpen();
      transport.socket(2).receiveMessage(JSON.stringify(getConnectedPayload("B", "new-token")));
    };
    client.on("stopped", restart);

    transport.socket(0).receiveClose(1006);
    transport.socket(1).receiveOpen();
    transport.socket(1).receiveClose(1008);
    await restarting;
    await vi.advanceTimersByTimeAsync(0);

    expect(events).toEqual([
      "connected(A)",
      "recovering(A)",
      "disconnected(A)",
      "stopped",
      "connected(B)",
    ]);
  });

  it("does not announce success if the recovery socket closes before notification", async () => {
    transport.socket(0).receiveClose(1006);
    const recovery = transport.socket(1);
    recovery.receiveOpen();
    recovery.receiveClose(1008);
    await vi.advanceTimersByTimeAsync(0);

    expect(events).toEqual(["connected(A)", "recovering(A)", "disconnected(A)", "stopped"]);
  });

  it.each(["pending", "backoff", "open", "listener"] as const)(
    "does not announce recovery after stop during %s",
    async (timing) => {
      if (timing === "listener") {
        client.on("recovering", () => client.stop());
      }
      transport.socket(0).receiveClose(1006);
      let recovery = transport.socket(1);
      if (timing === "backoff") {
        recovery.receiveClose(1006);
        await vi.advanceTimersByTimeAsync(0);
        client.stop();
        await vi.advanceTimersByTimeAsync(1000);
        // Existing recovery may continue after stop; this PR changes only notifications.
        recovery = transport.sockets.at(-1)!;
        recovery.receiveOpen();
      } else if (timing === "open") {
        recovery.receiveOpen();
        client.stop();
      } else {
        client.stop();
        recovery.receiveOpen();
      }
      await vi.advanceTimersByTimeAsync(0);

      expect(events.filter((event) => event.startsWith("recover"))).toEqual(["recovering(A)"]);
    },
  );

  it("does not emit success from an episode superseded by another recovery", async () => {
    transport.socket(0).receiveClose(1006);
    transport.socket(1).receiveOpen();
    transport.socket(1).receiveClose(1006);
    await vi.advanceTimersByTimeAsync(0);
    expect(events).toEqual(["connected(A)", "recovering(A)", "recovering(A)"]);

    transport.socket(2).receiveOpen();
    await vi.advanceTimersByTimeAsync(0);
    expect(events).toEqual(["connected(A)", "recovering(A)", "recovering(A)", "recovered(A)"]);
  });

  it("does not retry when a recovered listener stops the client", async () => {
    client.on("recovered", () => client.stop());
    transport.socket(0).receiveClose(1006);
    transport.socket(1).receiveOpen();
    await vi.advanceTimersByTimeAsync(1000);
    expect(events).toEqual([
      "connected(A)",
      "recovering(A)",
      "recovered(A)",
      "disconnected(A)",
      "stopped",
    ]);
    expect(transport.sockets).toHaveLength(2);
  });

  it.each(["recovering", "recovered"] as const)(
    "does not let a throwing %s listener interrupt recovery or cause a retry",
    async (event) => {
      const listener = (): void => {
        throw new Error("Listener failure");
      };
      if (event === "recovering") {
        client.on("recovering", listener);
      } else {
        client.on("recovered", listener);
      }

      transport.socket(0).receiveClose(1006);
      expect(transport.sockets).toHaveLength(2);
      transport.socket(1).receiveOpen();
      await vi.advanceTimersByTimeAsync(1000);

      expect(events).toEqual(["connected(A)", "recovering(A)", "recovered(A)"]);
      expect(transport.sockets).toHaveLength(2);
    },
  );

  it.each([false, true])(
    "recovers without a second connected event with autoReconnect=%s",
    async (autoReconnect) => {
      client.stop();
      const getClientAccessUrl = vi.fn(async () => "wss://example.com/client/hubs/test");
      await startClient({ autoReconnect }, getConnectedPayload("A", "test-token"), {
        getClientAccessUrl,
      });
      expect(events).toEqual(["connected(A)"]);
      const messages: unknown[] = [];
      client.on("group-message", (args) => messages.push(args.message.data));
      transport.socket(0).receiveMessage(JSON.stringify(getGroupDataPayload("test", "before", 1)));
      transport.socket(0).receiveClose(1006);
      const recovery = transport.socket(1);
      expect(recovery.isOpen()).toBe(false);
      expect(transport.socket(0).isOpen()).toBe(false);
      expect(events).toEqual(["connected(A)", "recovering(A)"]);
      const recoveryUrl = new URL(transport.requests[1].uri);
      expect(recoveryUrl.searchParams.get("awps_connection_id")).toBe("A");
      expect(recoveryUrl.searchParams.get("awps_reconnection_token")).toBe("test-token");

      recovery.receiveOpen();
      await vi.advanceTimersByTimeAsync(0);
      await client.sendEvent("test", "after recovery", "text", { fireAndForget: true });

      expect(recovery.sent.map((data) => JSON.parse(String(data)))).toContainEqual({
        type: "event",
        event: "test",
        dataType: "text",
        data: "after recovery",
      });
      expect(events).toEqual(["connected(A)", "recovering(A)", "recovered(A)"]);
      recovery.receiveMessage(JSON.stringify(getConnectedPayload("A", "test-token")));
      recovery.receiveMessage(JSON.stringify(getGroupDataPayload("test", "before", 1)));
      recovery.receiveMessage(JSON.stringify(getGroupDataPayload("test", "after", 2)));
      await vi.advanceTimersByTimeAsync(0);
      expect(messages).toEqual(["before", "after"]);
      expect(events).toEqual(["connected(A)", "recovering(A)", "recovered(A)"]);
      expect(getClientAccessUrl).toHaveBeenCalledTimes(1);
      expect(transport.sockets).toHaveLength(2);
    },
  );
});
