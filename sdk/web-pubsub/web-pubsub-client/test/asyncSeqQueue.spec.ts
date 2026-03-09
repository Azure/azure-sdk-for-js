// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { AsyncSeqQueue } from "../src/asyncSeqQueue.js";

describe("AsyncSeqQueue", () => {
  it("dequeue waits until enqueue has data", async () => {
    const queue = new AsyncSeqQueue<string>();
    let settled = false;

    const pending = queue.dequeue().then((item) => {
      settled = true;
      return item;
    });

    await Promise.resolve();
    expect(settled).toBe(false);

    await expect(queue.enqueue("A")).resolves.toBe(1);
    await expect(pending).resolves.toEqual({ sequenceId: 1, value: "A" });
  });

  it("keeps sequence ids and dequeue order", async () => {
    const queue = new AsyncSeqQueue<string>();
    await expect(queue.enqueue("A")).resolves.toBe(1);
    await expect(queue.enqueue("B")).resolves.toBe(2);
    await expect(queue.enqueue("C")).resolves.toBe(3);

    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 1, value: "A" });
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 2, value: "B" });
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 3, value: "C" });
  });

  it("ack removes acknowledged data", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");
    await queue.enqueue("C");

    expect(queue.size).toBe(3);
    expect(queue.ack(3)).toBe(2);
    expect(queue.size).toBe(1);
    expect(queue.oldestUnackedSequenceId).toBe(3);
    expect(queue.nextDequeueSequenceId).toBe(3);

    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 3, value: "C" });
  });

  it("reset can replay unacked data from a sequence id", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");
    await queue.enqueue("C");

    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 1, value: "A" });
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 2, value: "B" });

    queue.reset(2);
    expect(queue.nextDequeueSequenceId).toBe(2);
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 2, value: "B" });
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 3, value: "C" });
  });

  it("clamps reset to unacked range", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");
    await queue.enqueue("C");
    queue.ack(3);

    queue.reset(1);
    expect(queue.nextDequeueSequenceId).toBe(3);
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 3, value: "C" });
  });

  it("clamps ack to latestEnqueued + 1", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");

    expect(queue.ack(100)).toBe(2);
    expect(queue.size).toBe(0);
    expect(queue.oldestUnackedSequenceId).toBe(3);
    expect(queue.nextDequeueSequenceId).toBe(3);
  });

  it("supports custom initial sequence ids", async () => {
    const queue = new AsyncSeqQueue<string>(10);

    await expect(queue.enqueue("A")).resolves.toBe(10);
    await expect(queue.enqueue("B")).resolves.toBe(11);
    expect(queue.oldestUnackedSequenceId).toBe(10);
    expect(queue.latestEnqueuedSequenceId).toBe(11);
    expect(queue.nextDequeueSequenceId).toBe(10);

    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 10, value: "A" });
    expect(queue.ack(11)).toBe(1);
    expect(queue.oldestUnackedSequenceId).toBe(11);
    expect(queue.nextDequeueSequenceId).toBe(11);
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 11, value: "B" });
  });

  it("ignores ack that is older than the oldest unacked sequence id", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");

    expect(queue.ack(2)).toBe(1);
    expect(queue.ack(1)).toBe(0);
    expect(queue.size).toBe(1);
    expect(queue.oldestUnackedSequenceId).toBe(2);
    expect(queue.nextDequeueSequenceId).toBe(2);
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 2, value: "B" });
  });

  it("clamps reset above the latest enqueued sequence id to the next enqueue sequence id", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");

    queue.reset(100);
    expect(queue.nextDequeueSequenceId).toBe(3);

    const pending = queue.dequeue();
    await expect(queue.enqueue("C")).resolves.toBe(3);
    await expect(pending).resolves.toEqual({ sequenceId: 3, value: "C" });
  });

  it("serves multiple pending dequeue waiters in order", async () => {
    const queue = new AsyncSeqQueue<string>();
    const first = queue.dequeue();
    const second = queue.dequeue();

    await queue.enqueue("A");
    await queue.enqueue("B");

    await expect(first).resolves.toEqual({ sequenceId: 1, value: "A" });
    await expect(second).resolves.toEqual({ sequenceId: 2, value: "B" });
  });

  it("reset can wake pending dequeue waiters", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");

    await queue.dequeue();
    await queue.dequeue();
    const pending = queue.dequeue();

    queue.reset(2);
    await expect(pending).resolves.toEqual({ sequenceId: 2, value: "B" });
  });

  it("reset wins over a later enqueue for an already pending dequeue waiter", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    await queue.enqueue("B");
    await queue.enqueue("C");

    expect(queue.ack(2)).toBe(1);
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 2, value: "B" });
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 3, value: "C" });

    const pending = queue.dequeue();

    queue.reset(3);
    await expect(queue.enqueue("D")).resolves.toBe(4);

    await expect(pending).resolves.toEqual({ sequenceId: 3, value: "C" });
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 4, value: "D" });
  });

  it("close rejects pending dequeue and future operations", async () => {
    const queue = new AsyncSeqQueue<string>();
    const pending = queue.dequeue();
    const error = new Error("closed");

    queue.close(error);

    await expect(pending).rejects.toBe(error);
    await expect(queue.dequeue()).rejects.toBe(error);
    await expect(queue.enqueue("A")).rejects.toBe(error);
  });

  it("close is idempotent and keeps the first close reason", async () => {
    const queue = new AsyncSeqQueue<string>();
    const firstError = new Error("first");
    const secondError = new Error("second");

    queue.close(firstError);
    queue.close(secondError);

    await expect(queue.dequeue()).rejects.toBe(firstError);
    await expect(queue.enqueue("A")).rejects.toBe(firstError);
  });

  it("pause blocks dequeue until resume", async () => {
    const queue = new AsyncSeqQueue<string>();
    await queue.enqueue("A");
    queue.pause();

    let settled = false;
    const pending = queue.dequeue().then((item) => {
      settled = true;
      return item;
    });

    await Promise.resolve();
    expect(settled).toBe(false);

    queue.resume();
    await expect(pending).resolves.toEqual({ sequenceId: 1, value: "A" });
  });

  it("close interrupts pending dequeue while paused", async () => {
    const queue = new AsyncSeqQueue<string>();
    queue.pause();
    const pending = queue.dequeue();
    const error = new Error("closed");

    queue.close(error);

    await expect(pending).rejects.toBe(error);
  });

  it("dequeue abort signal rejects pending dequeue", async () => {
    const queue = new AsyncSeqQueue<string>();
    const controller = new AbortController();
    const pending = queue.dequeue(controller.signal);

    controller.abort();
    await expect(pending).rejects.toThrow("aborted");
  });

  it("dequeue abort signal does not consume queued data", async () => {
    const queue = new AsyncSeqQueue<string>();
    const controller = new AbortController();
    queue.pause();

    await queue.enqueue("A");
    const pending = queue.dequeue(controller.signal);
    controller.abort();

    await expect(pending).rejects.toThrow("aborted");

    queue.resume();
    await expect(queue.dequeue()).resolves.toEqual({ sequenceId: 1, value: "A" });
  });
});
