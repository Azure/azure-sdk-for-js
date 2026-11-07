// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CosmosClient } from "../../../src/CosmosClient.js";
import type { CosmosClientOptions } from "../../../src/CosmosClientOptions.js";
import { ItemResponse } from "../../../src/client/Item/ItemResponse.js";
import { ErrorResponse } from "../../../src/request/ErrorResponse.js";
import type { NativeReadResponse } from "../../../src/rust/NativeReadClient.js";
import { ClientContext } from "../../../src/ClientContext.js";
import * as diagnostics from "../../../src/utils/diagnostics.js";

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

  it("attaches final diagnostics without allocating a placeholder", async () => {
    const empty = vi.spyOn(diagnostics, "getEmptyCosmosDiagnostics");
    const reference = item();
    const first = await reference.read();
    const second = await reference.read();
    expect(empty).not.toHaveBeenCalled();
    expect(first.diagnostics).not.toBe(second.diagnostics);
    expect(first.diagnostics.experimentalRustRead.requests).toEqual(requests);
    expect(second.diagnostics.experimentalRustRead.requests).toEqual(requests);
  });

  it("reuses its decoder without carrying UTF-8 or BOM state across reads", async () => {
    const decode = vi.spyOn(TextDecoder.prototype, "decode");
    const body = new TextEncoder().encode(
      `\uFEFF${JSON.stringify({ ...order, status: "\u00e9\u{1f680}" })}`,
    );
    const padded = new Uint8Array(body.length + 2);
    padded.set(body, 1);
    const valid = { ...response(), body: padded.subarray(1, -1) };
    native.readItem
      .mockResolvedValueOnce(valid)
      .mockResolvedValueOnce({ ...response(), body: new Uint8Array([0xf0, 0x9f]) })
      .mockResolvedValueOnce({ ...response(), body: new TextEncoder().encode("{") })
      .mockResolvedValueOnce(valid);
    const reference = item();
    await expect(reference.read()).resolves.toMatchObject({
      resource: { status: "\u00e9\u{1f680}" },
    });
    for (let index = 0; index < 2; index++) {
      await expect(reference.read()).rejects.toMatchObject({
        diagnostics: { experimentalRustRead: { coverage: "partial", requests } },
      });
    }
    await expect(reference.read()).resolves.toMatchObject({
      resource: { status: "\u00e9\u{1f680}" },
    });
    expect(new Set(decode.mock.contexts).size).toBe(1);
    expect(decode).toHaveBeenCalledTimes(4);
    expect(native.create).toHaveBeenCalledOnce();
  });

  it("keeps response headers independent and preserves zero and missing values", async () => {
    native.readItem
      .mockResolvedValueOnce({ ...response(), requestCharge: 0, retryAfterMs: "0" })
      .mockResolvedValueOnce({
        ...response(),
        activityId: undefined,
        etag: undefined,
        sessionToken: undefined,
      });
    const reference = item();
    const first = await reference.read();
    const second = await reference.read();
    expect(first.headers["x-ms-request-charge"]).toBe("0");
    expect(first.headers["x-ms-retry-after-ms"]).toBe("0");
    expect(second.headers).not.toBe(first.headers);
    expect(second.headers["x-ms-request-charge"]).toBe("1.25");
    expect(second.headers).not.toHaveProperty("x-ms-retry-after-ms");
    expect(second.headers).not.toHaveProperty("etag");
    expect(second.headers).not.toHaveProperty("x-ms-activity-id");
    expect(second.headers).not.toHaveProperty("x-ms-session-token");
    expect(first.etag).toBe('"version-17"');
  });

  it("dispatches initialized reads without another initialization await and drains on dispose", async () => {
    const owner = client();
    const reference = item(owner);
    await reference.read();
    let finishFirst: (value: NativeReadResponse) => void;
    let finishSecond: (value: NativeReadResponse) => void;
    native.readItem
      .mockImplementationOnce(
        () =>
          new Promise<NativeReadResponse>((resolve) => {
            finishFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<NativeReadResponse>((resolve) => {
            finishSecond = resolve;
          }),
      );
    const first = reference.read();
    const second = reference.read();
    expect(native.readItem).toHaveBeenCalledTimes(3);
    owner.dispose();
    await expect(reference.read()).rejects.toThrow("disposed");
    expect(native.close).not.toHaveBeenCalled();
    finishFirst(response());
    await first;
    expect(native.close).not.toHaveBeenCalled();
    finishSecond({ ...response(), body: new Uint8Array([0xff]) });
    await expect(second).rejects.toThrow();
    expect(native.close).toHaveBeenCalledOnce();
    expect(native.create).toHaveBeenCalledOnce();
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

  it.each([404, 429])(
    "preserves zero-valued failure metadata and fallback diagnostics for %s",
    async (status) => {
      const result = response();
      result.body = undefined;
      result.statusCode = status;
      result.requestCharge = 0;
      result.retryAfterMs = "0";
      result.diagnostics.requests[0].statusCode = status;
      const original = Object.assign(failure(status), {
        response: result,
        diagnostics: undefined,
      });
      native.readItem.mockRejectedValue(original);
      const expected = {
        requestCharge: 0,
        headers: { "x-ms-request-charge": "0", "x-ms-retry-after-ms": "0" },
        diagnostics: {
          experimentalRustRead: { coverage: "partial", requests: result.diagnostics },
        },
      };
      if (status === 404) {
        await expect(item().read()).resolves.toMatchObject({
          ...expected,
          statusCode: 404,
          resource: undefined,
        });
      } else {
        await expect(item().read()).rejects.toMatchObject({
          ...expected,
          code: 429,
          retryAfterInMs: 0,
          retryAfterInMilliseconds: 0,
          cause: original,
        });
      }
      expect(native.readItem).toHaveBeenCalledOnce();
    },
  );

  it("preserves partial native evidence rather than inventing missing attempts", async () => {
    const result = response();
    result.diagnostics.requestCount = 3;
    native.readItem.mockResolvedValue(result);
    const actual = await item().read();
    expect(actual.diagnostics.experimentalRustRead).toEqual({
      coverage: "partial",
      requests: result.diagnostics,
    });
    expect(actual.diagnostics.experimentalRustRead.requests.retainedRequestCount).toBe(1);
    expect(actual.diagnostics.experimentalRustRead.requests.requests).toHaveLength(1);
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
    {
      diagnostics: {
        ...requests,
        requests: [{ pipeline: "invalid", transport: "gateway_v2", statusCode: 200 }],
      },
    },
    {
      diagnostics: {
        ...requests,
        requests: [{ pipeline: "data_plane", transport: "invalid", statusCode: 200 }],
      },
    },
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

  it("settles concurrent initialization failures after disposal without reading or closing an absent client", async () => {
    let rejectInitialization: (error: Error) => void;
    native.create.mockReturnValue(
      new Promise((_resolve, reject) => {
        rejectInitialization = reject;
      }),
    );
    const owner = client();
    const reference = item(owner);
    const outcomes = Promise.allSettled([reference.read(), reference.read()]);
    owner.dispose();
    const original = new Error("Initialization failed");
    rejectInitialization(original);
    expect(await outcomes).toEqual([
      { status: "rejected", reason: original },
      { status: "rejected", reason: original },
    ]);
    expect(native.create).toHaveBeenCalledOnce();
    expect(native.readItem).not.toHaveBeenCalled();
    expect(native.close).not.toHaveBeenCalled();
    await expect(reference.read()).rejects.toThrow("disposed");
  });

  it("drains synchronous native submission failures on the initialized fast path", async () => {
    const owner = client();
    const reference = item(owner);
    await reference.read();
    const original = new Error("Native submission failed");
    native.readItem.mockImplementationOnce(() => {
      throw original;
    });
    const pending = reference.read();
    owner.dispose();
    await expect(pending).rejects.toBe(original);
    expect(native.close).toHaveBeenCalledOnce();
    expect(native.create).toHaveBeenCalledOnce();
    expect(native.readItem).toHaveBeenCalledTimes(2);
    await expect(reference.read()).rejects.toThrow("disposed");
  });
});

describe("JavaScript item response finalization", () => {
  const storedOrder = {
    ...order,
    _rid: "rid-17",
    _self: "items/17",
    _etag: '"version-17"',
    _ts: 0,
  };
  let owner: CosmosClient;
  beforeEach(() => {
    vi.stubEnv("AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION", "javascript");
    owner = new CosmosClient({
      endpoint: "https://example.documents.azure.com",
      key: "dGVzdC1rZXk=",
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });
  });
  afterEach(() => {
    owner.dispose();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.each([200, 404])(
    "preserves public responses and diagnostics for status %s without placeholders",
    async (status) => {
      const empty = vi.spyOn(diagnostics, "getEmptyCosmosDiagnostics");
      const read = vi.spyOn(ClientContext.prototype, "read");
      if (status === 200) {
        class PluginResponse {
          readonly headers = {};
          readonly code = 200;
          readonly substatus = 0;
          get result(): typeof storedOrder {
            return storedOrder;
          }
        }
        read.mockResolvedValue(Object.freeze(new PluginResponse()));
      } else {
        read.mockRejectedValue(
          Object.assign(new ErrorResponse("missing"), { code: 404, headers: {} }),
        );
      }
      const reference = owner
        .database("sales")
        .container("orders")
        .item(order.id, order.customerId);
      const result = await reference.read();
      expect(result).toBeInstanceOf(ItemResponse);
      expect(result.item).toBe(reference);
      expect(result.statusCode).toBe(status);
      expect(result.resource).toEqual(status === 200 ? storedOrder : undefined);
      expect(result.diagnostics.clientSideRequestStatistics).toBeDefined();
      expect(result.diagnostics.experimentalRustRead).toBeUndefined();
      expect(empty).not.toHaveBeenCalled();
      if (status === 200) {
        expect(await read.mock.results[0].value).not.toHaveProperty("diagnostics");
      }
    },
  );

  it("preserves failed-read diagnostics and the original error", async () => {
    const original = Object.assign(new ErrorResponse("failed"), { code: 503, headers: {} });
    vi.spyOn(ClientContext.prototype, "read").mockRejectedValue(original);
    const reference = owner.database("sales").container("orders").item(order.id, order.customerId);
    await expect(reference.read()).rejects.toBe(original);
    expect(original.diagnostics.clientSideRequestStatistics).toBeDefined();
  });
});
