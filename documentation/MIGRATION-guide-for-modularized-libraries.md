# Guide for migrating to the modularized libraries of Azure JavaScript SDK

This document shows the customers of the JavaScript/TypeScript libraries on how to migrate their code to use the modularized libraries which are also known as Modular SDKs.

**For new customers of the JavaScript/TypeScript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)), please see [quick start guide for modularized libraries](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/modularized-libraries-quickstart.md).**

## Current status

Several packages released from Modular libraries have already reached General Availability (GA), including `@azure/arm-avs`, `@azure/arm-fabric`, `@azure/arm-oracledatabase`, `@azure/keyvault-admin`. We are actively working on releasing more packages and eventually cover all Azure services. Please find the latest version of those libraries in [npm](https://www.npmjs.com) and give them a try.

## Why switching to the modularized libraries?

We have a [complete guide for the modularized libraries](https://devblogs.microsoft.com/azure-sdk/azure-sdk-modularized-libraries-for-javascript/) and feel free to take a look. Compared to the current management libraries, the modularized libraries have following advantages:

1. Subpath exports: we leverage [subpath exports](https://nodejs.org/api/packages.html#subpath-exports), available since Node.js version 12.7, to offer multiple layers API for customers. Service client layer from `.` root subpath would provide similar experience to traditional client. And the API layer from `./api` subpath would provide more light-weight client context to encapsulates the common state shared across operations.
1. Bundle size optimization: we minimize the footprint of adding an extra library by relying on a core package called `@azure-rest/core-client`. This core package provides a general-purpose REST client and each package contains service-specific TypeScript type definitions. The TypeScript types are excluded from the assets bundle..
1. Long-running operations: previously, in our traditional clients, we generated two operations (beginDoSth and beginDoSthAndWait) for each of the long-running operations, which are both redundant and confusing to our customers. In Modular, there's just one operation (doSth) for each of the long-running operations. Customers can choose to call it in an asynchronous or synchronized fashion.


## How to migrate to the modularized libraries?

If you have an existing application that uses the JavaScript/TypeScript Azure SDK packages and you're interested in updating your application to use the Modular SDKs, here are the main changes that you need to do for the migration

1. Long Running Operations
1. Paging Operations
1. Model property flattening
1. Other changes

### Long Running Operations

Many operations may take a long time to finish before receiving the desired response. The LRO breakings are because in Modular we re-designed the LRO and implemented it in core-lro if you are interested in this change and here is the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/docs/MIGRATION.md). The changes  mainly are three parts:

- Method signature changes
- LRO poller changes from SimplePollerLike to PollerLike
- Rehydration changes

#### Method signature changes

Taking a simple LRO operation as an example with operationId `IntegrationRuntimes_Start`. In traditional client we would have two methods([link](https://github.com/Azure/azure-sdk-for-js/blob/8c1c0027d79354d2b91b318c4ceb52e462f7db92/sdk/datafactory/arm-datafactory/src/operationsInterfaces/integrationRuntimes.ts#L193)).

```ts
beginStart(
    options?: IntegrationRuntimesStartOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<IntegrationRuntimesStartResponse>,
      IntegrationRuntimesStartResponse
    >
  >;
beginStartAndWait(
    options?: IntegrationRuntimesStartOptionalParams,
  ): Promise<IntegrationRuntimesStartResponse>;
```
Now we would only have one method in Modular SDK.

```ts
start(options?: IntegrationRuntimesStartOptionalParams): PollerLike<
      OperationState<IntegrationRuntimesStartResponse>,
      IntegrationRuntimesStartResponse
    >;
```
So the before-and-after code would be like below:
| traditional client                                          | Modular                                                                        |
|----------------------------------------------|--------------------------------------------------------------------------------|
| const result = await beginStartAndWait();    | const result = await start(); // awaiting would get result directly                                                 |
| const poller = await beginStart();           | const poller = start(); // directly get the poller                             |
|                                              | await poller.submitted(); // await the poller submitted if interested          |
| const result = await poller.pollUntilDone(); | const result = await poller; // Or const result = await poller.pollUntilDone() |

Please note considering the impact of LROs whether we should provide a beginXXX method with brownfeild SDKs in modular is not decided yet and let's discussion more in https://github.com/Azure/autorest.typescript/issues/2715.

#### LRO poller change from SimplePollerLike to PollerLike

In traditional client, the return type of  `beginXXX` method is `SimplePollerLike`. Now the return type is changed to `PollerLike` in Modular and this interface is also a PromiseLike. The following table compares `SimplePollerLike` and `PollerLike`:

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
| wait the poller submitted successfully                                     | N/A                   | `submitted()`       |

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
#### Rehydration change

We also change the way to restore an existing LRO. The main change is we deliver the restore functionality as a helper function not binding with methods.

In traditional client we build an option `resumeFrom`.

```ts
export interface IntegrationRuntimesStartOptionalParams
  extends coreClient.OperationOptions {
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}
```
Now we build a client-level helper for this.
```ts
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: DataFactoryManagementClient,
  serializedState: string,
  sourceOperation: (
    ...args: any[]
  ) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult>
```

The before-and-after code would be like:

```ts
// traditional client
const result = await beginStartAndWait({resumeFrom: serializedState}); 

// Modular
const result = await restorePoller(client, serializedState, client.start);   
```

### List Operations
In Modular we adjusted paging interfaces a little for better experience and mainly are two parts:
- Remove un-supported maxpagesize in PageSetting
- Use `continuationToken` to replace the helper `getContinuationToken`

#### Remove un-supported maxpagesize in PageSetting
The `maxpagesize` is not supported in tranditional client so in Modular we remove this setting winthin PageSettings. This are supposed to have no impact for customers.

#### Remove the helper `getContinuationToken`
In traditional client we build an util function to help customers to get the continuation token([here](https://github.com/Azure/azure-sdk-for-js/blob/735677407c4fbbceea95200f6d6de00e29804740/sdk/datadog/arm-datadog/src/pagingHelper.ts#L22-L29)).

So we could reference the token by code.

```ts
const firstPage = await iter.byPage().next();
const continuationToken = getContinuationToken(getContinuationToken);
```

Now we directly deliver the `continuationToken` with byPage return.

```ts
export type ContinuablePage<TElement, TPage = TElement[]> = TPage & {
  /**
   * The token that keeps track of where to continue the iterator
   */
  continuationToken?: string;
};
```
So we could reference the token like below:
```ts
const firstPage = await iter.byPage().next();
const continuationToken = firstPage.value.continuationToken;
```

## Model property flattening


## Need help

If you have encountered an issue during migration, please file an issue via [Github Issues](https://github.com/Azure/azure-sdk-for-js/issues) and make sure you add the 'Preview' label to the issue.
