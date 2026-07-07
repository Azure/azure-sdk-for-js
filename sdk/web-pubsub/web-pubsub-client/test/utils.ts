// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "@azure/core-util";
import { vi } from "vitest";
import type { MockInstance } from "vitest";
import type { WebPubSubResult } from "../src/models/index.js";
import type { WebPubSubClient } from "../src/webPubSubClient.js";
import type { TestWebSocketClient } from "./testWebSocketClient.js";

export function getAckMessagePayload(
  ackId: number,
  success: boolean = true,
  reason: string = "",
): object {
  return {
    type: "ack",
    ackId: ackId,
    success: success,
    error: { name: reason, message: "message" },
  };
}

export function getGroupDataPayload(groupName: string, data: string, sequenceId?: number): object {
  return {
    sequenceId: sequenceId,
    type: "message",
    from: "group",
    group: groupName,
    dataType: "text",
    data: data,
    fromUserId: "user",
  };
}

export function getConnectedPayload(connectionId: string, reconnectionToken?: string): object {
  return {
    type: "system",
    event: "connected",
    userId: "user",
    connectionId: connectionId,
    reconnectionToken: reconnectionToken,
  };
}

export function mockSendAndResolveAck(client: WebPubSubClient): ReturnType<typeof vi.spyOn> {
  return vi.spyOn(client as any, "_sendMessage").mockImplementation((message: any) => {
    if (message.ackId != null) {
      queueMicrotask(() => {
        client["_ackManager"].resolveAck(message.ackId, {
          ackId: message.ackId,
          isDuplicated: false,
        } as WebPubSubResult);
      });
    }

    return Promise.resolve();
  });
}

export function makeStartable(ws: TestWebSocketClient): MockInstance<(fn: () => void) => void> {
  const onOpen = ws.onopen.bind(ws);
  const stub = vi.spyOn(ws, "onopen");
  stub.mockImplementation((...args) => {
    setTimeout(() => {
      onOpen(...args);
      ws.invokeopen.call(ws);
    });
  });
  return stub;
}

export async function spinCheck(
  fn: () => void,
  intervalInMs?: number,
  maxTry?: number,
): Promise<void> {
  const effectiveIntervalInMs = intervalInMs ?? 10;
  const effectiveMaxTry = maxTry ?? 100;

  let tryCount = 0;
  while (tryCount < effectiveMaxTry) {
    try {
      fn();
      return;
    } catch (err) {
      tryCount++;
      if (tryCount >= effectiveMaxTry) {
        throw err;
      }
      await delay(effectiveIntervalInMs);
    }
  }
}
