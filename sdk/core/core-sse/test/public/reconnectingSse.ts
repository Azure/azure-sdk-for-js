// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createReconnectingSseStream,
  type EventMessage,
  type EventMessageStream,
  type SseConnectOptions,
  type SseConnectResponse,
  SseRetryError,
  type SseStream,
} from "../../src/index.js";
import { assert, describe, expect, it, vi, type SuiteCollector } from "vitest";

interface BodyOptions {
  chunks?: string[];
  error?: Error;
  hang?: boolean;
  onCancel?: () => void;
}

interface TestResponse extends SseConnectResponse {
  status: number;
}

export function buildReconnectingSseTests(
  runtimeName: string,
  createBody: (options: BodyOptions) => SseStream,
): SuiteCollector {
  function response(body: SseStream | undefined, status = 200): TestResponse {
    return { body, status };
  }

  function acceptedOptions(
    overrides: Partial<Parameters<typeof createReconnectingSseStream<TestResponse>>[1]> = {},
  ): Parameters<typeof createReconnectingSseStream<TestResponse>>[1] {
    return {
      retryDelayInMs: 0,
      validateResponse: ({ status }) => (status === 204 ? "stop" : "accept"),
      ...overrides,
    };
  }

  async function readOne(stream: EventMessageStream): Promise<EventMessage> {
    const reader = stream.getReader();
    const result = await reader.read();
    assert.isFalse(result.done);
    await reader.cancel();
    return result.value;
  }

  return describe(`[${runtimeName}] Reconnecting server-sent events`, () => {
    it("connects eagerly and omits Last-Event-ID from the initial request", async () => {
      const attempts: SseConnectOptions[] = [];
      const connect = vi.fn(async (options: SseConnectOptions) => {
        attempts.push(options);
        return response(createBody({ chunks: ["data: first\n\n"], hang: true }));
      });

      const stream = await createReconnectingSseStream(connect, acceptedOptions());

      assert.equal(connect.mock.calls.length, 1);
      assert.notProperty(attempts[0], "lastEventId");
      assert.equal((await readOne(stream)).data, "first");
    });

    it("passes an explicitly configured Last-Event-ID to the initial request", async () => {
      const connect = vi.fn(async (options: SseConnectOptions) => {
        assert.equal(options.lastEventId, "initial");
        return response(createBody({ chunks: ["data: first\n\n"], hang: true }));
      });

      const stream = await createReconnectingSseStream(
        connect,
        acceptedOptions({ lastEventId: "initial" }),
      );

      assert.equal((await readOne(stream)).id, "initial");
    });

    it("passes an id-only update when reconnecting", async () => {
      const attempts: SseConnectOptions[] = [];
      const connect = vi.fn(async (options: SseConnectOptions) => {
        attempts.push(options);
        return attempts.length === 1
          ? response(createBody({ chunks: ["id: 42\n\n"] }))
          : response(createBody({ chunks: ["data: reconnected\n\n"], hang: true }));
      });
      const stream = await createReconnectingSseStream(connect, acceptedOptions());

      const event = await readOne(stream);
      assert.equal(event.data, "reconnected");
      assert.equal(event.id, "42");
      assert.equal(attempts[1].lastEventId, "42");
    });

    it("retains event ids across reconnections until explicitly changed or cleared", async () => {
      const attempts: SseConnectOptions[] = [];
      const bodies = [
        "id: A\ndata: first\n\n",
        "data: second\n\n",
        "id: B\ndata: third\n\n",
        "data: fourth\n\n",
        "id:\ndata: reset\n\n",
        "data: after reset\n\n",
      ];
      const stream = await createReconnectingSseStream(
        async (options) => {
          const body = bodies[attempts.length];
          attempts.push(options);
          return body === undefined
            ? response(undefined, 204)
            : response(createBody({ chunks: [body] }));
        },
        acceptedOptions({ maxRetries: bodies.length }),
      );
      const events: EventMessage[] = [];
      for await (const event of stream) {
        events.push(event);
      }

      assert.deepEqual(
        events.map(({ id, data }) => ({ id, data })),
        [
          { id: "A", data: "first" },
          { id: "A", data: "second" },
          { id: "B", data: "third" },
          { id: "B", data: "fourth" },
          { id: "", data: "reset" },
          { id: "", data: "after reset" },
        ],
      );
      assert.deepEqual(
        attempts.map(({ lastEventId }) => lastEventId),
        [undefined, "A", "A", "B", "B", undefined, undefined],
      );
      assert.notProperty(attempts[5], "lastEventId");
      assert.notProperty(attempts[6], "lastEventId");
    });

    it("retains the event id when a reconnect request must be retried", async () => {
      const connect = vi
        .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
        .mockResolvedValueOnce(response(createBody({ chunks: ["id: retained\n\n"] })))
        .mockRejectedValueOnce(new Error("connect failed"))
        .mockResolvedValueOnce(
          response(createBody({ chunks: ["data: recovered\n\n"], hang: true })),
        );
      const stream = await createReconnectingSseStream(connect, acceptedOptions({ maxRetries: 2 }));

      const event = await readOne(stream);
      assert.equal(event.data, "recovered");
      assert.equal(event.id, "retained");
      assert.equal(connect.mock.calls[1][0].lastEventId, "retained");
      assert.equal(connect.mock.calls[2][0].lastEventId, "retained");
    });

    it("does not retain an id from an incomplete event", async () => {
      const attempts: SseConnectOptions[] = [];
      const connect = vi.fn(async (options: SseConnectOptions) => {
        attempts.push(options);
        return attempts.length === 1
          ? response(createBody({ chunks: ["id: 42\ndata: incomplete"] }))
          : response(createBody({ chunks: ["data: reconnected\n\n"], hang: true }));
      });
      const stream = await createReconnectingSseStream(connect, acceptedOptions());

      assert.equal((await readOne(stream)).data, "reconnected");
      assert.notProperty(attempts[1], "lastEventId");
    });

    it("clears an id with an empty value and ignores an id containing U+0000", async () => {
      const attempts: SseConnectOptions[] = [];
      const bodies = [
        "id: retained\n\n",
        "id: ignored\0value\n\n",
        "id:\n\n",
        "data: reconnected\n\n",
      ];
      const connect = vi.fn(async (options: SseConnectOptions) => {
        attempts.push(options);
        const index = attempts.length - 1;
        return response(createBody({ chunks: [bodies[index]], hang: index === bodies.length - 1 }));
      });
      const stream = await createReconnectingSseStream(connect, acceptedOptions());

      assert.equal((await readOne(stream)).data, "reconnected");
      assert.equal(attempts[1].lastEventId, "retained");
      assert.equal(attempts[2].lastEventId, "retained");
      assert.notProperty(attempts[3], "lastEventId");
    });

    it("clears a retained id on a colonless id field after a blank line", async () => {
      const attempts: SseConnectOptions[] = [];
      const bodies = ["id: retained\n\n", "id\n\n", "data: reconnected\n\n"];
      const connect = vi.fn(async (options: SseConnectOptions) => {
        attempts.push(options);
        const index = attempts.length - 1;
        return response(createBody({ chunks: [bodies[index]], hang: index === bodies.length - 1 }));
      });
      const stream = await createReconnectingSseStream(connect, acceptedOptions());

      const event = await readOne(stream);
      assert.equal(event.id, "");
      assert.equal(attempts[1].lastEventId, "retained");
      assert.notProperty(attempts[2], "lastEventId");
    });

    it("does not clear a retained id from a colonless id without a blank line", async () => {
      const attempts: SseConnectOptions[] = [];
      const bodies = ["id: retained\n\n", "id\n", "data: reconnected\n\n"];
      const connect = vi.fn(async (options: SseConnectOptions) => {
        attempts.push(options);
        const index = attempts.length - 1;
        return response(createBody({ chunks: [bodies[index]], hang: index === bodies.length - 1 }));
      });
      const stream = await createReconnectingSseStream(connect, acceptedOptions());

      const event = await readOne(stream);
      assert.equal(event.id, "retained");
      assert.equal(attempts[1].lastEventId, "retained");
      assert.equal(attempts[2].lastEventId, "retained");
    });

    it("rejects invalid retryDelayInMs and maxRetries options", async () => {
      const connect = vi.fn(async () => response(createBody({ hang: true })));

      for (const retryDelayInMs of [
        -1,
        0.5,
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.MAX_SAFE_INTEGER + 1,
      ]) {
        await expect(
          createReconnectingSseStream(connect, acceptedOptions({ retryDelayInMs })),
        ).rejects.toThrow(RangeError);
      }
      for (const maxRetries of [-1, 1.5, Number.NaN]) {
        await expect(
          createReconnectingSseStream(connect, acceptedOptions({ maxRetries })),
        ).rejects.toThrow(RangeError);
      }
      assert.equal(connect.mock.calls.length, 0);

      const stream = await createReconnectingSseStream(
        connect,
        acceptedOptions({ retryDelayInMs: Number.MAX_SAFE_INTEGER }),
      );
      await stream.cancel();
    });

    it("waits the full safe retry delay across multiple timers", async () => {
      vi.useFakeTimers();
      try {
        const maxTimerDelayInMs = 2147483647;
        const longDelayInMs = maxTimerDelayInMs + 25;
        for (const source of ["option", "server"] as const) {
          const connect = vi
            .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
            .mockResolvedValueOnce(
              response(
                createBody({
                  chunks: source === "server" ? [`retry: ${longDelayInMs}\n\n`] : [],
                }),
              ),
            )
            .mockResolvedValueOnce(
              response(createBody({ chunks: ["data: reconnected\n\n"], hang: true })),
            );
          const stream = await createReconnectingSseStream(
            connect,
            acceptedOptions({ retryDelayInMs: source === "option" ? longDelayInMs : 0 }),
          );
          const reader = stream.getReader();
          const read = reader.read();

          await vi.advanceTimersByTimeAsync(maxTimerDelayInMs);
          assert.equal(connect.mock.calls.length, 1);
          await vi.advanceTimersByTimeAsync(24);
          assert.equal(connect.mock.calls.length, 1);
          await vi.advanceTimersByTimeAsync(1);
          assert.equal((await read).value?.data, "reconnected");
          await reader.cancel();
        }
      } finally {
        vi.useRealTimers();
      }
    });

    it("aborts a long retry delay after its first timer interval", async () => {
      vi.useFakeTimers();
      try {
        const aborter = new AbortController();
        const connect = vi.fn(async () => response(createBody({})));
        const stream = await createReconnectingSseStream(
          connect,
          acceptedOptions({
            abortSignal: aborter.signal,
            retryDelayInMs: 2147483647 + 25,
          }),
        );
        const read = stream.getReader().read();

        await vi.advanceTimersByTimeAsync(2147483647);
        aborter.abort();
        await expect(read).rejects.toMatchObject({ name: "AbortError" });
        await vi.advanceTimersByTimeAsync(25);
        assert.equal(connect.mock.calls.length, 1);
      } finally {
        vi.useRealTimers();
      }
    });

    it("fails the stream rather than rounding an unsafe server retry delay", async () => {
      for (const retry of ["9007199254740992", "999999999999999999999999999999999"]) {
        const connect = vi.fn(async () =>
          response(createBody({ chunks: [`retry: ${retry}\n\n`] })),
        );
        const stream = await createReconnectingSseStream(connect, acceptedOptions());

        await expect(stream.getReader().read()).rejects.toThrow(RangeError);
        assert.equal(connect.mock.calls.length, 1);
      }
    });

    it("uses the default delay and applies valid retry-only frames", async () => {
      vi.useFakeTimers();
      try {
        const connect = vi
          .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
          .mockResolvedValueOnce(response(createBody({ chunks: ["retry: 25\n\n"] })))
          .mockResolvedValueOnce(
            response(createBody({ chunks: ["data: reconnected\n\n"], hang: true })),
          );
        const stream = await createReconnectingSseStream(connect, {
          validateResponse: () => "accept",
        });
        const reader = stream.getReader();
        const read = reader.read();

        await vi.advanceTimersByTimeAsync(24);
        assert.equal(connect.mock.calls.length, 1);
        await vi.advanceTimersByTimeAsync(1);
        assert.equal((await read).value?.data, "reconnected");
        await reader.cancel();

        const defaultConnect = vi
          .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
          .mockResolvedValueOnce(response(createBody({})))
          .mockResolvedValueOnce(
            response(createBody({ chunks: ["data: default\n\n"], hang: true })),
          );
        const defaultStream = await createReconnectingSseStream(defaultConnect, {
          validateResponse: () => "accept",
        });
        const defaultReader = defaultStream.getReader();
        const defaultRead = defaultReader.read();
        await vi.advanceTimersByTimeAsync(2999);
        assert.equal(defaultConnect.mock.calls.length, 1);
        await vi.advanceTimersByTimeAsync(1);
        assert.equal((await defaultRead).value?.data, "default");
        await defaultReader.cancel();
      } finally {
        vi.useRealTimers();
      }
    });

    it("ignores malformed retry-only frames", async () => {
      vi.useFakeTimers();
      try {
        const connect = vi
          .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
          .mockResolvedValueOnce(response(createBody({ chunks: ["retry: 1ms\n\n"] })))
          .mockResolvedValueOnce(
            response(createBody({ chunks: ["data: reconnected\n\n"], hang: true })),
          );
        const stream = await createReconnectingSseStream(
          connect,
          acceptedOptions({ retryDelayInMs: 10 }),
        );
        const reader = stream.getReader();
        const read = reader.read();

        await vi.advanceTimersByTimeAsync(9);
        assert.equal(connect.mock.calls.length, 1);
        await vi.advanceTimersByTimeAsync(1);
        assert.equal((await read).value?.data, "reconnected");
        await reader.cancel();
      } finally {
        vi.useRealTimers();
      }
    });

    it("reconnects after EOF and body read errors", async () => {
      for (const firstBody of [createBody({}), createBody({ error: new Error("read failed") })]) {
        const connect = vi
          .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
          .mockResolvedValueOnce(response(firstBody))
          .mockResolvedValueOnce(
            response(createBody({ chunks: ["data: recovered\n\n"], hang: true })),
          );
        const stream = await createReconnectingSseStream(connect, acceptedOptions());

        assert.equal((await readOne(stream)).data, "recovered");
        assert.equal(connect.mock.calls.length, 2);
      }
    });

    it("throws SseRetryError when the lifetime retry limit is exhausted", async () => {
      const transportError = new Error("read failed");
      const stream = await createReconnectingSseStream(
        async () => response(createBody({ error: transportError })),
        acceptedOptions({ maxRetries: 0 }),
      );
      const reader = stream.getReader();

      await expect(reader.read()).rejects.toSatisfy((error: unknown) => {
        assert.instanceOf(error, SseRetryError);
        assert.equal((error as SseRetryError).cause, transportError);
        return true;
      });
    });

    it("throws SseRetryError after clean EOF exhausts the retry limit", async () => {
      const stream = await createReconnectingSseStream(
        async () => response(createBody({})),
        acceptedOptions({ maxRetries: 0 }),
      );

      await expect(stream.getReader().read()).rejects.toSatisfy((error: unknown) => {
        assert.instanceOf(error, SseRetryError);
        assert.isUndefined((error as SseRetryError).cause);
        return true;
      });
    });

    it("retries failed reconnect requests and applies the lifetime retry limit", async () => {
      const connect = vi
        .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
        .mockResolvedValueOnce(response(createBody({})))
        .mockRejectedValueOnce(new Error("connect failed"))
        .mockResolvedValueOnce(response(createBody({})));
      const stream = await createReconnectingSseStream(connect, acceptedOptions({ maxRetries: 2 }));

      await expect(stream.getReader().read()).rejects.toBeInstanceOf(SseRetryError);
      assert.equal(connect.mock.calls.length, 3);
    });

    it("aborts an active read and a pending delay without reconnecting", async () => {
      const readAborter = new AbortController();
      let canceled = false;
      const readConnect = vi.fn(async () =>
        response(createBody({ hang: true, onCancel: () => (canceled = true) })),
      );
      const readStream = await createReconnectingSseStream(
        readConnect,
        acceptedOptions({ abortSignal: readAborter.signal }),
      );
      const read = readStream.getReader().read();
      readAborter.abort();
      await expect(read).rejects.toMatchObject({ name: "AbortError" });
      assert.isTrue(canceled);
      assert.equal(readConnect.mock.calls.length, 1);

      vi.useFakeTimers();
      try {
        const delayAborter = new AbortController();
        const delayConnect = vi.fn(async () => response(createBody({})));
        const delayStream = await createReconnectingSseStream(
          delayConnect,
          acceptedOptions({ abortSignal: delayAborter.signal, retryDelayInMs: 100 }),
        );
        const delayedRead = delayStream.getReader().read();
        await vi.advanceTimersByTimeAsync(50);
        delayAborter.abort();
        await expect(delayedRead).rejects.toMatchObject({ name: "AbortError" });
        await vi.runAllTimersAsync();
        assert.equal(delayConnect.mock.calls.length, 1);
      } finally {
        vi.useRealTimers();
      }
    });

    it("aborts an in-flight reconnect request without issuing another request", async () => {
      const aborter = new AbortController();
      let rejectConnect: ((error: Error) => void) | undefined;
      const connect = vi
        .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
        .mockResolvedValueOnce(response(createBody({})))
        .mockImplementationOnce(
          () =>
            new Promise<TestResponse>((_resolve, reject) => {
              rejectConnect = reject;
            }),
        );
      const stream = await createReconnectingSseStream(
        connect,
        acceptedOptions({ abortSignal: aborter.signal }),
      );
      const read = stream.getReader().read();
      await vi.waitFor(() => assert.equal(connect.mock.calls.length, 2));
      aborter.abort();

      await expect(read).rejects.toMatchObject({ name: "AbortError" });
      rejectConnect?.(new Error("late failure"));
      assert.equal(connect.mock.calls.length, 2);
    });

    it("cancels a response that arrives after an aborted reconnect", async () => {
      const aborter = new AbortController();
      let resolveConnect: ((response: TestResponse) => void) | undefined;
      let lateResponseCanceled = false;
      const connect = vi
        .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
        .mockResolvedValueOnce(response(createBody({})))
        .mockImplementationOnce(
          () =>
            new Promise<TestResponse>((resolve) => {
              resolveConnect = resolve;
            }),
        );
      const stream = await createReconnectingSseStream(
        connect,
        acceptedOptions({ abortSignal: aborter.signal }),
      );
      const read = stream.getReader().read();
      await vi.waitFor(() => assert.equal(connect.mock.calls.length, 2));
      aborter.abort();

      await expect(read).rejects.toMatchObject({ name: "AbortError" });
      resolveConnect?.(
        response(
          createBody({
            hang: true,
            onCancel: () => (lateResponseCanceled = true),
          }),
        ),
      );
      await vi.waitFor(() => assert.isTrue(lateResponseCanceled));
      assert.equal(connect.mock.calls.length, 2);
    });

    it("aborts while validating a response and cleans up its body", async () => {
      const aborter = new AbortController();
      let bodyCanceled = false;
      let releaseValidation: (() => void) | undefined;
      let validationStarted: (() => void) | undefined;
      const started = new Promise<void>((resolve) => {
        validationStarted = resolve;
      });
      const validationGate = new Promise<void>((resolve) => {
        releaseValidation = resolve;
      });
      const streamPromise = createReconnectingSseStream(
        async () =>
          response(
            createBody({
              chunks: ["data: ignored\n\n"],
              hang: true,
              onCancel: () => (bodyCanceled = true),
            }),
          ),
        acceptedOptions({
          abortSignal: aborter.signal,
          validateResponse: async () => {
            validationStarted?.();
            await validationGate;
            return "accept" as const;
          },
        }),
      );
      await started;
      aborter.abort();
      releaseValidation?.();

      await expect(streamPromise).rejects.toMatchObject({ name: "AbortError" });
      await vi.waitFor(() => assert.isTrue(bodyCanceled));
    });

    it("treats validator stop and failures as terminal and cleans response bodies", async () => {
      let stopCanceled = false;
      const stopConnect = vi.fn(async () =>
        response(createBody({ hang: true, onCancel: () => (stopCanceled = true) }), 204),
      );
      const stopped = await createReconnectingSseStream(stopConnect, acceptedOptions());
      assert.deepEqual(await stopped.getReader().read(), { value: undefined, done: true });
      await vi.waitFor(() => assert.isTrue(stopCanceled));
      assert.equal(stopConnect.mock.calls.length, 1);

      let failureCanceled = false;
      const expected = new Error("invalid content type");
      await expect(
        createReconnectingSseStream(
          async () =>
            response(createBody({ hang: true, onCancel: () => (failureCanceled = true) })),
          acceptedOptions({
            validateResponse: () => {
              throw expected;
            },
          }),
        ),
      ).rejects.toBe(expected);
      await vi.waitFor(() => assert.isTrue(failureCanceled));
    });

    it("does not retry a validator failure on a reconnect response", async () => {
      let failureCanceled = false;
      const expected = new Error("invalid reconnect response");
      const connect = vi
        .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
        .mockResolvedValueOnce(response(createBody({})))
        .mockResolvedValueOnce(
          response(createBody({ hang: true, onCancel: () => (failureCanceled = true) }), 500),
        );
      const stream = await createReconnectingSseStream(
        connect,
        acceptedOptions({
          validateResponse: ({ status }) => {
            if (status !== 200) {
              throw expected;
            }
            return "accept";
          },
        }),
      );

      await expect(stream.getReader().read()).rejects.toBe(expected);
      await vi.waitFor(() => assert.isTrue(failureCanceled));
      assert.equal(connect.mock.calls.length, 2);
    });

    it("does not reconnect after break, cancel, or async disposal", async () => {
      for (const stop of ["break", "cancel", "dispose"] as const) {
        let canceled = false;
        const connect = vi.fn(async () =>
          response(
            createBody({
              chunks: [`data: ${stop}\n\n`],
              hang: true,
              onCancel: () => (canceled = true),
            }),
          ),
        );
        const stream = await createReconnectingSseStream(connect, acceptedOptions());

        if (stop === "break") {
          for await (const event of stream) {
            assert.equal(event.data, stop);
            break;
          }
        } else {
          const reader = stream.getReader();
          assert.equal((await reader.read()).value?.data, stop);
          reader.releaseLock();
          if (stop === "cancel") {
            await stream.cancel();
          } else {
            await stream[Symbol.asyncDispose]();
          }
        }

        await vi.waitFor(() => assert.isTrue(canceled));
        assert.equal(connect.mock.calls.length, 1);
      }
    });

    it("reconnects an unread metadata-only stream", async () => {
      vi.useFakeTimers();
      try {
        const connect = vi
          .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
          .mockResolvedValueOnce(response(createBody({ chunks: ["id: retained\n\n"] })))
          .mockResolvedValueOnce(response(createBody({ chunks: ["data: next\n\n"], hang: true })));
        const stream = await createReconnectingSseStream(connect, acceptedOptions());

        await vi.advanceTimersByTimeAsync(1);
        assert.equal(connect.mock.calls.length, 2);
        assert.equal(connect.mock.calls[1][0].lastEventId, "retained");

        const reader = stream.getReader();
        assert.equal((await reader.read()).value?.data, "next");
        await reader.cancel();
      } finally {
        vi.useRealTimers();
      }
    });

    it("can reconnect while a consumer handles the last event before breaking", async () => {
      vi.useFakeTimers();
      try {
        let canceled = false;
        const connect = vi
          .fn<(options: SseConnectOptions) => Promise<TestResponse>>()
          .mockResolvedValueOnce(response(createBody({ chunks: ["data: last\n\n"] })))
          .mockResolvedValueOnce(
            response(createBody({ hang: true, onCancel: () => (canceled = true) })),
          );
        const stream = await createReconnectingSseStream(connect, acceptedOptions());

        for await (const event of stream) {
          assert.equal(event.data, "last");
          await vi.advanceTimersByTimeAsync(1);
          assert.equal(connect.mock.calls.length, 2);
          break;
        }
        await vi.advanceTimersByTimeAsync(1);
        assert.isTrue(canceled);
        assert.equal(connect.mock.calls.length, 2);
      } finally {
        vi.useRealTimers();
      }
    });

    it("supports UTF-8 string chunks from Node-style readable streams", async () => {
      if (runtimeName !== "Node") {
        return;
      }
      const data = "string \u00e9 \u{1f680}";
      const stream = await createReconnectingSseStream(
        async () => response(createBody({ chunks: [`data: ${data}\n\n`], hang: true })),
        acceptedOptions(),
      );
      assert.equal((await readOne(stream)).data, data);
    });
  });
}
