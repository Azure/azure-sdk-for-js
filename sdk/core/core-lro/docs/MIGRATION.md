# Migration Guide

This document shows the customers of v2 LRO (Long Running Operations) on how to migrate their code to use the v3 libraries.

## Main difference between v2 and v3

In v2, you have to `await` the LRO to get this poller. But `await` doesn't give you the final result, it gives you the poller to track the operation's status. This has confused some users who thought `await` would give them the final result.

To make things clearer and easier to understand, we've changed how this works in v3. Now, our poller interface blends the need to track long-running operations with the usual way of handling asynchronous programming. And this is the main difference between them.

Except that the `LroEngine` is no longer supported and you could use `createHttpPoller` to create a poller instead.

If you have an existing application that uses our v2 libaries and you're interested in updating your application to use the latest one, here are the things that you need to do for the migration:

## Creation of Poller

In v2 we have two implementations for LRO: `LroEngine` and `SimplePollerLike` with `createHttpPoller`. In v3 we deprecate the former and keep the `PollerLike` with `createHttpPoller` to build the poller. And the return type is changed from `SimplePollerLike` to `PollerLike`. The creation code would be changed as below.

From

```typescript
const pollerSetting: LongRunningOperation<TResult> = {
  requestMethod: "{http-method}",
  requestPath: "{path}",
  sendInitialRequest: async () => {
    // your code to send initial request
  },
  sendPollRequest: async (path) => {
    // your code to trigger polling request
  },
};
const httpPoller = await createHttpPoller(pollerSetting, options);
```

To

```typescript
const pollerSetting: RunningOperation<TResult> = {
  sendInitialRequest: async () => {
    // your code to send initial request
  },
  sendPollRequest: async (path) => {
    // your code to trigger polling request
  },
};
const httpPoller = createHttpPoller(pollerSetting, options);
```

Now please notice if you `await` the helper you would get the final result.

```typescript
const result = await httpPoller;
```

## Poller API

Also the return type for `createHttpPoller` is renamed from `SimplePollerLike` to `PollerLike`.The following table compares `SimplePollerLike` and `PollerLike`:

| operation                                                                  | `SimplePollerLike`    | `PollerLike`      |
| -------------------------------------------------------------------------- | --------------------- | ----------------- |
| return final results                                                       | `pollUntilDone()`     | `pollUntilDone()` |
| poll                                                                       | `poll()`              | `poll()`          |
| access the current state after receiving the response of each poll request | `onProgress()`        | `onProgress()`    |
| check whether the operation finished                                       | `isDone()`            | `isDone`          |
| stop polling                                                               | `stopPolling()`       | N/A               |
| check if the polling stopped                                               | `isStopped()`         | N/A               |
| get the current operation state                                            | `getOperationState()` | `operationState`  |
| access the final result                                                    | `getResult()`         | `result`          |
| serialize the poller state                                                 | `toString()`          | `serialize()`     |
| wait the poller submitted successfully                                     | N/A                   | `submitted`       |

Please note the operation `getOperationState(): TState` is changed to attribute `operationState: TState | undefined`, so the value could be `undefined` if the poller is not initialized yet.

```ts
const status = poller.getOperationState().status;
```

now

```ts
const status = poller?.operationState?.status;
```

If you want to serialize a poller, use the `serialize` instead.

```ts
const serializeState = poller.toString();
```

now

```ts
const serializeState = await poller.serialize();
```

## `core-lro-shim`

There are situations where we don't want to break existing code and want to keep backward compatibility. Here we prepare `core-lro-shim` scripts for you, in which we implemented v2 `SimplePollerLike` interfaces with v3 interfaces.

Once you copy them into your environment and the only thing you need to do is to update your lro references to that shim.

```ts
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  CancelOnProgress,
  CreateHttpPollerOptions,
  OperationState,
  RunningOperation,
  createHttpPoller as createInternalHttpPoller,
} from "@azure/core-lro";

/**
 * A simple poller that can be used to poll a long running operation.
 */
export interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Returns true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * Returns the state of the operation.
   */
  getOperationState(): TState;
  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<TState>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;

  /**
   * Wait the poller to be submitted.
   */
  submitted(): Promise<void>;

  /**
   * Returns a string representation of the poller's operation. Similar to serialize but returns a string.
   */
  toString(): string;

  /**
   * Stops the poller from continuing to poll. Please note this will only stop the client-side polling
   */
  stopPolling(): void;
}

export async function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: RunningOperation,
  options?: CreateHttpPollerOptions<TResult, TState>,
): Promise<SimplePollerLike<TState, TResult>> {
  const httpPoller = createInternalHttpPoller(lro, options);
  const abortController = new AbortController();
  const simplePoller: SimplePollerLike<TState, TResult> = {
    isDone() {
      return httpPoller.isDone;
    },
    isStopped() {
      return abortController.signal.aborted;
    },
    getOperationState() {
      if (!httpPoller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().",
        );
      }
      return httpPoller.operationState;
    },
    getResult() {
      return httpPoller.result;
    },
    toString() {
      if (!httpPoller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().",
        );
      }
      return JSON.stringify({
        state: httpPoller.operationState,
      });
    },
    stopPolling() {
      abortController.abort();
    },
    onProgress: httpPoller.onProgress,
    poll: httpPoller.poll,
    pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }) {
      function abortListener(): void {
        abortController.abort();
      }
      const inputAbortSignal = pollOptions?.abortSignal;
      const abortSignal = abortController.signal;
      if (inputAbortSignal?.aborted) {
        abortController.abort();
      } else if (!abortSignal.aborted) {
        inputAbortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      return httpPoller.pollUntilDone({ abortSignal: abortController.signal });
    },
    submitted: httpPoller.submitted,
  };
  await httpPoller.submitted();
  return simplePoller;
}

```
