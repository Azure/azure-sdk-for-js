// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CosmosClient } from "../../../src/CosmosClient.js";
import type { CosmosClientOptions } from "../../../src/CosmosClientOptions.js";
import { ItemResponse } from "../../../src/client/Item/ItemResponse.js";
import { ErrorResponse } from "../../../src/request/ErrorResponse.js";
import type { NativeReadResponse } from "../../../src/rust/NativeReadClient.js";
import { ClientContext } from "../../../src/ClientContext.js";

const native = vi.hoisted(() => ({
  create: vi.fn(),
  readItem: vi.fn(),
  close: vi.fn(),
}));
vi.mock("../../../src/utils/nativeReadClient.js", () => ({
  getNativeReadClientFactory: () => native.create,
}));

const order = { id: "order-17", customerId: "customer-17", status: "submitted" };
const requests = {
  requestCount: 1,
  retainedRequestCount: 1,
  requests: [{ pipeline: "data_plane", transport: "gateway_v2", statusCode: 200 }],
} satisfies NativeReadResponse["diagnostics"];

function response(): NativeReadResponse {
  return {
    body: new TextEncoder().encode(JSON.stringify(order)),
    statusCode: 200,
    requestCharge: 1.25,
    etag: '"version-17"',
    activityId: "activity-17",
    sessionToken: "0:17",
    diagnostics: structuredClone(requests),
  };
}

function failure(statusCode: number): Error {
  const result = response();
  result.statusCode = statusCode;
  result.diagnostics.requests[0].statusCode = statusCode;
  result.retryAfterMs = "25";
  return Object.assign(new Error("Native service error"), {
    statusCode,
    subStatusCode: 1002,
    stage: "readItem",
    fromWire: true,
    response: result,
    diagnostics: result.diagnostics,
  });
}

describe("public experimental Rust item reads", () => {
  const clients: CosmosClient[] = [];
  let legacyRead: ReturnType<typeof vi.spyOn>;
  function client(extra: Partial<CosmosClientOptions> = {}): CosmosClient {
    const result = new CosmosClient({
      endpoint: "https://example.documents.azure.com",
      key: "dGVzdC1rZXk=",
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      ...extra,
    });
    clients.push(result);
    return result;
  }
  function item(owner = client()) {
    return owner.database("sales").container("orders").item(order.id, order.customerId);
  }

  beforeEach(() => {
    vi.stubEnv("AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION", "rust");
    native.create.mockReset().mockResolvedValue(native);
    native.readItem.mockReset().mockImplementation(async () => response());
    native.close.mockReset();
    legacyRead = vi.spyOn(ClientContext.prototype, "read").mockImplementation(async () => {
      throw new Error("A Rust read must not enter the legacy read pipeline.");
    });
  });

  afterEach(() => {
    for (const owner of clients) owner.dispose();
    clients.length = 0;
    expect(legacyRead).not.toHaveBeenCalled();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("loads lazily, initializes once, and returns the original public response class", async () => {
    const owner = client();
    const reference = item(owner);
    expect(native.create).not.toHaveBeenCalled();
    const [first, second] = await Promise.all([reference.read(), reference.read()]);
    expect(native.create).toHaveBeenCalledOnce();
    expect(native.readItem).toHaveBeenCalledWith("sales", "orders", "order-17", "customer-17");
    for (const result of [first, second]) {
      expect(result).toBeInstanceOf(ItemResponse);
      expect(result.item).toBe(reference);
      expect(result.resource).toEqual(order);
      expect(result.statusCode).toBe(200);
      expect(result.requestCharge).toBe(1.25);
      expect(result.etag).toBe('"version-17"');
      expect(result.activityId).toBe("activity-17");
      expect(result.headers["x-ms-session-token"]).toBe("0:17");
      expect(result.diagnostics.experimentalRustRead).toEqual({
        coverage: "partial",
        requests,
      });
    }
  });

  it("preserves native diagnostics after the standard wrapper for 404 responses", async () => {
    native.readItem.mockRejectedValue(failure(404));
    const reference = item();
    const result = await reference.read();
    expect(result).toBeInstanceOf(ItemResponse);
    expect(result.item).toBe(reference);
    expect(result.statusCode).toBe(404);
    expect(result.resource).toBeUndefined();
    expect(result.requestCharge).toBe(1.25);
    expect(result.diagnostics.experimentalRustRead.requests.requests[0].statusCode).toBe(404);
  });

  it("maps other driver failures without retrying or changing the status", async () => {
    const original = failure(429);
    native.readItem.mockRejectedValue(original);
    const error = await item()
      .read()
      .catch((value: unknown) => value);
    expect(error).toBeInstanceOf(ErrorResponse);
    expect(error).toMatchObject({
      code: 429,
      substatus: 1002,
      cause: original,
      retryAfterInMs: 25,
      retryAfterInMilliseconds: 25,
      activityId: "activity-17",
      requestCharge: 1.25,
      diagnostics: { experimentalRustRead: { coverage: "partial" } },
    });
    expect(native.readItem).toHaveBeenCalledOnce();
  });

  it("does not turn a non-wire 404 into a successful public response", async () => {
    native.readItem.mockRejectedValue(Object.assign(failure(404), { fromWire: false }));
    await expect(item().read()).rejects.toMatchObject({ code: 404 });
  });

  it.each([
    { body: new Uint8Array([0xff]) },
    { body: new TextEncoder().encode("{") },
    { body: new TextEncoder().encode("null") },
    { body: new TextEncoder().encode('{"id":"wrong"}') },
    { body: undefined },
    { requestCharge: undefined },
    { requestCharge: Number.NaN },
    { statusCode: 201 },
    { diagnostics: { ...requests, requestCount: 0 } },
  ])("rejects malformed native results instead of returning success: %j", async (change) => {
    native.readItem.mockResolvedValue({ ...response(), ...change });
    await expect(item().read()).rejects.toThrow();
  });

  it.each([undefined, 7, null, ["a", "b"]])(
    "rejects unsupported partition keys before initialization: %j",
    async (partitionKey) => {
      const reference = client().database("sales").container("orders").item(order.id, partitionKey);
      await expect(reference.read()).rejects.toThrow("explicit single string partition key");
      expect(native.create).not.toHaveBeenCalled();
    },
  );

  it("allows an explicitly supplied empty string partition key", async () => {
    await client().database("sales").container("orders").item(order.id, "").read();
    expect(native.readItem).toHaveBeenCalledWith("sales", "orders", order.id, "");
  });

  it.each([
    { sessionToken: "0:1" },
    { abortSignal: new AbortController().signal },
    { consistencyLevel: "Strong" as const },
  ])("rejects unsupported request options before initialization: %j", async (options) => {
    await expect(item().read(options)).rejects.toThrow("request options");
    expect(native.create).not.toHaveBeenCalled();
  });

  it.each([
    { plugins: [] },
    { defaultHeaders: {} },
    { consistencyLevel: "Strong" as const },
    { connectionPolicy: { preferredLocations: ["East US"] } },
    { connectionPolicy: { requestTimeout: 5 } },
    { key: undefined },
  ])("rejects unsupported client configuration before initialization: %j", async (options) => {
    await expect(item(client(options)).read()).rejects.toThrow("do not support");
    expect(native.create).not.toHaveBeenCalled();
  });

  it("retains initialization failure without silently retrying or falling back", async () => {
    const original = new Error("Native load failed");
    native.create.mockRejectedValue(original);
    const reference = item();
    await expect(reference.read()).rejects.toBe(original);
    await expect(reference.read()).rejects.toBe(original);
    expect(native.create).toHaveBeenCalledOnce();
  });

  it("keeps an accepted read alive when disposed during native initialization", async () => {
    let initialize: (value: typeof native) => void;
    native.create.mockReturnValue(
      new Promise<typeof native>((resolve) => {
        initialize = resolve;
      }),
    );
    const owner = client();
    const reference = item(owner);
    const pending = reference.read();
    owner.dispose();
    owner.dispose();
    await expect(reference.read()).rejects.toThrow("disposed");
    expect(native.close).not.toHaveBeenCalled();
    initialize(native);
    await expect(pending).resolves.toMatchObject({ resource: order });
    expect(native.close).toHaveBeenCalledOnce();
    owner.dispose();
    expect(native.close).toHaveBeenCalledOnce();
  });

  it("never initializes after disposal", async () => {
    const owner = client();
    owner.dispose();
    await expect(item(owner).read()).rejects.toThrow("disposed");
    expect(native.create).not.toHaveBeenCalled();
  });
});
