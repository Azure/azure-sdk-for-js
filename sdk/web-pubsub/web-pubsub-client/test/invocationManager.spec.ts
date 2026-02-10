// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { InvocationManager } from "../src/invocationManager.js";
import { InvocationError } from "../src/errors/index.js";
import type { InvokeResponseMessage } from "../src/models/messages.js";

const createResponse = (invocationId: string): InvokeResponseMessage => ({
  kind: "invokeResponse",
  invocationId,
  success: true,
  dataType: "json",
  data: { message: "ok" },
});

describe("InvocationManager", () => {
  it("resolves registered invocations when responses arrive", async () => {
    const manager = new InvocationManager();
    const registration = manager.registerInvocation();
    const waitPromise = registration.wait();

    const response = createResponse(registration.invocationId);
    expect(manager.resolveInvocation(response)).toBe(true);
    await expect(waitPromise).resolves.toBe(response);
  });

  it("throws when registering duplicate invocation ids", () => {
    const manager = new InvocationManager();
    const existing = manager.registerInvocation("same-id");
    expect(existing.invocationId).toBe("same-id");
    expect(() => manager.registerInvocation("same-id")).toThrow(InvocationError);
  });

  it("rejects waiters when rejectInvocation is called", async () => {
    const manager = new InvocationManager();
    const registration = manager.registerInvocation();
    const waitPromise = registration.wait();

    expect(manager.rejectInvocation(registration.invocationId, new Error("boom"))).toBe(true);
    await expect(waitPromise).rejects.toThrow("boom");
  });

  it("propagates abort signals and removes pending registrations", async () => {
    const manager = new InvocationManager();
    const registration = manager.registerInvocation();
    const abortController = new AbortController();
    const waitPromise = registration.wait({ abortSignal: abortController.signal });

    abortController.abort();

    await expect(waitPromise).rejects.toBeInstanceOf(InvocationError);
    const response = createResponse(registration.invocationId);
    expect(manager.resolveInvocation(response)).toBe(false);
  });

  it("rejects all pending registrations with rejectAll", async () => {
    const manager = new InvocationManager();
    const registration = manager.registerInvocation();
    const waitPromise = registration.wait();

    manager.rejectAll((id) => new Error(`failure:${id}`));
    await expect(waitPromise).rejects.toThrow(`failure:${registration.invocationId}`);
  });
});
