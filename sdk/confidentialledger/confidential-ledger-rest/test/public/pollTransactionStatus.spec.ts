// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { ConfidentialLedgerClient } from "../../src/clientDefinitions.js";
import { pollTransactionStatus } from "../../src/pollTransactionStatus.js";
import type {
  GetTransactionStatus200Response,
  GetTransactionStatusDefaultResponse,
} from "../../src/responses.js";

/**
 * Helper to create a mock 200 response with the given transaction state.
 */
function create200Response(
  state: "Committed" | "Pending",
  transactionId: string,
): GetTransactionStatus200Response {
  return {
    status: "200",
    body: { state, transactionId },
    headers: {},
    request: { url: "", method: "GET", headers: {}, timeout: 0, withCredentials: false },
  } as unknown as GetTransactionStatus200Response;
}

/**
 * Helper to create a mock error response with the given status code.
 */
function createErrorResponse(statusCode: number): GetTransactionStatusDefaultResponse {
  return {
    status: String(statusCode),
    body: { error: { code: String(statusCode), message: `Error ${statusCode}` } },
    headers: {},
    request: { url: "", method: "GET", headers: {}, timeout: 0, withCredentials: false },
  } as unknown as GetTransactionStatusDefaultResponse;
}

/**
 * Helper to create a mock client with a sequence of responses for the status polling endpoint.
 */
function createMockClient(
  responses: Array<GetTransactionStatus200Response | GetTransactionStatusDefaultResponse>,
): ConfidentialLedgerClient {
  let callIndex = 0;
  const getMock = vi.fn(async () => {
    const response = responses[callIndex];
    callIndex++;
    return response;
  });

  return {
    path: vi.fn().mockReturnValue({
      get: getMock,
    }),
  } as unknown as ConfidentialLedgerClient;
}

describe("pollTransactionStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return immediately when transaction is already committed", async () => {
    const client = createMockClient([create200Response("Committed", "tx-1")]);

    const result = await pollTransactionStatus(client, "tx-1", { intervalInMs: 10 });

    expect(result.state).toBe("Committed");
    expect(result.transactionId).toBe("tx-1");
    expect(result.response.status).toBe("200");
    expect(client.path).toHaveBeenCalledWith("/app/transactions/{transactionId}/status", "tx-1");
  });

  it("should retry on 200 Pending and resolve on Committed", async () => {
    const client = createMockClient([
      create200Response("Pending", "tx-2"),
      create200Response("Pending", "tx-2"),
      create200Response("Committed", "tx-2"),
    ]);

    const promise = pollTransactionStatus(client, "tx-2", { intervalInMs: 10 });
    // Advance timers to allow the delays to complete
    await vi.advanceTimersByTimeAsync(100);
    const result = await promise;

    expect(result.state).toBe("Committed");
    expect(result.transactionId).toBe("tx-2");
  });

  it("should treat 404 as transient and retry up to max404Retries", async () => {
    const client = createMockClient([
      createErrorResponse(404),
      createErrorResponse(404),
      create200Response("Committed", "tx-3"),
    ]);

    const promise = pollTransactionStatus(client, "tx-3", {
      intervalInMs: 10,
      max404Retries: 5,
    });
    await vi.advanceTimersByTimeAsync(100);
    const result = await promise;

    expect(result.state).toBe("Committed");
    expect(result.transactionId).toBe("tx-3");
  });

  it("should throw after exceeding max404Retries", async () => {
    const client = createMockClient([
      createErrorResponse(404),
      createErrorResponse(404),
      createErrorResponse(404),
    ]);

    const promise = pollTransactionStatus(client, "tx-4", {
      intervalInMs: 10,
      max404Retries: 2,
    });
    // Attach the rejection handler before advancing timers to avoid unhandled rejection
    const expectation = expect(promise).rejects.toThrow(
      /Transaction tx-4 not found after 2 retries/,
    );
    await vi.advanceTimersByTimeAsync(100);
    await expectation;
  });

  it("should treat 406 as transient and retry indefinitely until committed", async () => {
    const client = createMockClient([
      createErrorResponse(406),
      createErrorResponse(406),
      createErrorResponse(406),
      createErrorResponse(406),
      createErrorResponse(406),
      create200Response("Committed", "tx-5"),
    ]);

    const promise = pollTransactionStatus(client, "tx-5", { intervalInMs: 10 });
    await vi.advanceTimersByTimeAsync(200);
    const result = await promise;

    expect(result.state).toBe("Committed");
    expect(result.transactionId).toBe("tx-5");
  });

  it("should handle mixed 404, 406, and Pending responses before Committed", async () => {
    const client = createMockClient([
      createErrorResponse(404),
      createErrorResponse(406),
      create200Response("Pending", "tx-6"),
      createErrorResponse(406),
      create200Response("Committed", "tx-6"),
    ]);

    const promise = pollTransactionStatus(client, "tx-6", {
      intervalInMs: 10,
      max404Retries: 3,
    });
    await vi.advanceTimersByTimeAsync(200);
    const result = await promise;

    expect(result.state).toBe("Committed");
    expect(result.transactionId).toBe("tx-6");
  });

  it("should throw on unexpected error status codes (e.g. 500)", async () => {
    const client = createMockClient([createErrorResponse(500)]);

    const promise = pollTransactionStatus(client, "tx-7", { intervalInMs: 10 });

    await expect(promise).rejects.toThrow(/Unexpected status 500 while polling transaction tx-7/);
  });

  it("should throw on unexpected error status codes (e.g. 401)", async () => {
    const client = createMockClient([createErrorResponse(401)]);

    const promise = pollTransactionStatus(client, "tx-8", { intervalInMs: 10 });

    await expect(promise).rejects.toThrow(/Unexpected status 401 while polling transaction tx-8/);
  });

  it("should respect the abort signal", async () => {
    // Create a client that always returns Pending to ensure the poller keeps running
    let callCount = 0;
    const getMock = vi.fn(async () => {
      callCount++;
      return create200Response("Pending", "tx-9");
    });
    const client = {
      path: vi.fn().mockReturnValue({ get: getMock }),
    } as unknown as ConfidentialLedgerClient;

    const controller = new AbortController();
    const promise = pollTransactionStatus(client, "tx-9", {
      intervalInMs: 10,
      abortSignal: controller.signal,
    });

    // Attach the rejection handler before aborting to avoid unhandled rejection
    const expectation = expect(promise).rejects.toThrow("The polling operation was aborted.");

    // Let the first poll go through, then abort
    await vi.advanceTimersByTimeAsync(5);
    controller.abort();
    await vi.advanceTimersByTimeAsync(20);
    await expectation;
  });

  it("should use default max404Retries of 10", async () => {
    // Create 11 404 responses (exceeding the default of 10)
    const responses: Array<GetTransactionStatus200Response | GetTransactionStatusDefaultResponse> =
      [];
    for (let i = 0; i < 11; i++) {
      responses.push(createErrorResponse(404));
    }

    const client = createMockClient(responses);

    const promise = pollTransactionStatus(client, "tx-10", { intervalInMs: 10 });
    // Attach the rejection handler before advancing timers to avoid unhandled rejection
    const expectation = expect(promise).rejects.toThrow(
      /Transaction tx-10 not found after 10 retries/,
    );
    await vi.advanceTimersByTimeAsync(500);
    await expectation;
  });

  it("should maintain cumulative 404 count when 406 responses are intermixed", async () => {
    // 404 count is cumulative across all retries
    const client = createMockClient([
      createErrorResponse(404),
      createErrorResponse(406),
      createErrorResponse(404),
      create200Response("Committed", "tx-11"),
    ]);

    const promise = pollTransactionStatus(client, "tx-11", {
      intervalInMs: 10,
      max404Retries: 3,
    });
    await vi.advanceTimersByTimeAsync(200);
    const result = await promise;

    expect(result.state).toBe("Committed");
    expect(result.transactionId).toBe("tx-11");
  });
});
