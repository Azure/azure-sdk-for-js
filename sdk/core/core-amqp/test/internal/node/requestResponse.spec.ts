// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { RequestResponseLink } from "../../../src/index.js";
import type { DeferredPromiseWithCallback } from "../../../src/requestResponseLink.js";
import { createFullConnectionStub } from "../../utils/createConnectionStub.js";

type RequestResponseLinkPrivate = {
  _responsesMap: Map<string, DeferredPromiseWithCallback>;
};

/** Accessor to reach the private responses map. */
function getResponsesMap(link: RequestResponseLink): Map<string, DeferredPromiseWithCallback> {
  return (link as unknown as RequestResponseLinkPrivate)._responsesMap;
}

describe("RequestResponseLink - remove", () => {
  it("remove() calls remove on sender, receiver, and session", async () => {
    const connectionStub = createFullConnectionStub();
    const link = await RequestResponseLink.create(connectionStub, {}, {});

    link.remove();

    // Verify the remove methods were called (they're vi.fn() from createFullConnectionStub)
    assert.isTrue(
      vi.mocked(link.sender.remove).mock.calls.length > 0,
      "sender.remove should be called",
    );
    assert.isTrue(
      vi.mocked(link.receiver.remove).mock.calls.length > 0,
      "receiver.remove should be called",
    );
    assert.isTrue(
      vi.mocked(link.session.remove).mock.calls.length > 0,
      "session.remove should be called",
    );
  });
});

describe("RequestResponseLink - onSenderError", () => {
  it("rejects all pending responses when sender errors", async () => {
    const connectionStub = createFullConnectionStub();
    const link = await RequestResponseLink.create(connectionStub, {}, {});
    const responsesMap = getResponsesMap(link);

    let rejected1 = false;
    let rejected2 = false;
    let cleanup1 = false;
    let cleanup2 = false;

    responsesMap.set("id1", {
      resolve: () => {},
      reject: () => {
        rejected1 = true;
      },
      cleanupBeforeResolveOrReject: () => {
        cleanup1 = true;
      },
    });
    responsesMap.set("id2", {
      resolve: () => {},
      reject: () => {
        rejected2 = true;
      },
      cleanupBeforeResolveOrReject: () => {
        cleanup2 = true;
      },
    });

    // Trigger the sender error event
    link.sender.emit("sender_error", {
      sender: {
        error: new Error("sender error"),
      },
    });

    assert.isTrue(rejected1, "First promise should be rejected");
    assert.isTrue(rejected2, "Second promise should be rejected");
    assert.isTrue(cleanup1, "First cleanup should be called");
    assert.isTrue(cleanup2, "Second cleanup should be called");
    assert.equal(responsesMap.size, 0, "Map should be cleared");
  });

  it("does nothing when sender is undefined", async () => {
    const connectionStub = createFullConnectionStub();
    const link = await RequestResponseLink.create(connectionStub, {}, {});
    const responsesMap = getResponsesMap(link);

    responsesMap.set("id1", {
      resolve: () => {},
      reject: () => {
        assert.fail("Should not be called");
      },
      cleanupBeforeResolveOrReject: () => {},
    });

    // Trigger sender error without a sender object
    link.sender.emit("sender_error", {});

    assert.equal(responsesMap.size, 1, "Map should not be affected");
  });
});

describe("RequestResponseLink - timeout with abortSignal cleans up abort listener", () => {
  it("removes abort listener when timeout fires", async () => {
    const connectionStub = createFullConnectionStub();
    const link = await RequestResponseLink.create(connectionStub, {}, {});
    const request = { body: "test", message_id: "test-timeout-abort" };

    const controller = new AbortController();
    const removeSpy = vi.spyOn(controller.signal, "removeEventListener");
    await expect(
      link.sendRequest(request, {
        timeoutInMs: 10,
        abortSignal: controller.signal,
        requestName: "test",
      }),
    ).rejects.toThrow(/timed out/);
    expect(removeSpy).toHaveBeenCalled();
  });
});
