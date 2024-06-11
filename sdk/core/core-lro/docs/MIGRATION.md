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
