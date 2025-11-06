// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { SendMessageError } from "../src/errors/index.js";
import { AckManager } from "../src/ackManager.js";
import type { WebPubSubResult } from "../src/models/index.js";

describe("AckManager", () => {
  it("auto generates monotonically increasing ack ids when not provided", () => {
    const manager = new AckManager();
    const first = manager.registerAck();
    const second = manager.registerAck();

    expect(first.ackId).toBe(1);
    expect(second.ackId).toBe(2);
    expect(first.wait()).not.toBe(second.wait());
  });

  it("reuses the same entry when the ack id is provided", () => {
    const manager = new AckManager();
    const first = manager.registerAck(42);
    const second = manager.registerAck(42);

    expect(first.ackId).toBe(42);
    expect(second.wait()).toBe(first.wait());
  });

  it("resolves pending acks", async () => {
    const manager = new AckManager();
    const registration = manager.registerAck();
    const result: WebPubSubResult = { ackId: registration.ackId, isDuplicated: false };

    expect(manager.resolveAck(registration.ackId, result)).toBe(true);
    await expect(registration.wait()).resolves.toEqual(result);
    expect(manager.resolveAck(registration.ackId, result)).toBe(false);
  });

  it("rejects pending acks", async () => {
    const manager = new AckManager();
    const registration = manager.registerAck();
    const error = new Error("boom");

    expect(manager.rejectAck(registration.ackId, error)).toBe(true);
    await expect(registration.wait()).rejects.toBe(error);
    expect(manager.rejectAck(registration.ackId, error)).toBe(false);
  });

  it("discards pending entries without settling them", () => {
    const manager = new AckManager();
    const registration = manager.registerAck();

    manager.discard(registration.ackId);
    // Ensure the promise never rejects as an unhandled rejection.
    void registration.wait();
    expect(manager.rejectAck(registration.ackId, new Error("should not exist"))).toBe(false);
  });

  it("rejects all pending entries with a provided reason", async () => {
    const manager = new AckManager();
    const first = manager.registerAck();
    const second = manager.registerAck();

    manager.rejectAll((ackId) => new Error(`ack ${ackId}`));

    await expect(first.wait()).rejects.toThrow("ack 1");
    await expect(second.wait()).rejects.toThrow("ack 2");
  });

  it("translates aborts into SendMessageError instances", async () => {
    const manager = new AckManager();
    const registration = manager.registerAck();
    const controller = new AbortController();

    controller.abort();
    await expect(registration.wait(controller.signal)).rejects.toBeInstanceOf(SendMessageError);
  });
});
