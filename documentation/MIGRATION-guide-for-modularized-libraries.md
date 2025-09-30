# Guide for migrating to the modularized libraries of Azure JavaScript SDK

This guide helps developers transition their JavaScript/TypeScript applications to use the modularized Azure SDK libraries, also known as Modular SDKs.

**For new customers of the JavaScript/TypeScript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)), please see [quick start guide for modularized libraries](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/modularized-libraries-quickstart.md).**

## Current status

Several packages released from Modular libraries have already reached General Availability (GA), including `@azure/arm-avs`, `@azure/arm-fabric`, `@azure/arm-oracledatabase`, `@azure/keyvault-admin`. We are actively working on releasing more packages and eventually cover all Azure services. Please find the latest version of those libraries in [npm](https://www.npmjs.com) and give them a try.

## Why switching to the modularized libraries?

We recommend reviewing the [complete guide for the modularized libraries](https://devblogs.microsoft.com/azure-sdk/azure-sdk-modularized-libraries-for-javascript/) for full details. Compared to the traditional libraries, Modular SDKs have following key benefits:

1. Subpath exports: Modular SDKs use [subpath exports](https://nodejs.org/api/packages.html#subpath-exports)(available since Node.js version 12.7) to offer layered APIs. In which service client layer from `.` root subpath would provide similar experience to traditional client. And the API layer from `./api` subpath would provide more lightweight client context for shared state across operations.
1. Bundle size optimization: Modular SDKs rely on `@azure-rest/core-client`. This core package provides a general-purpose REST client and each package contains service-specific TypeScript type definitions. The TypeScript types are excluded from the assets bundle..
1. Long-running operations: in stead of two methods (beginDoSth and beginDoSthAndWait) in our traditional clients for each long-running operation, which are both redundant and confusing to customers. In Modular,  Modular SDKs offer a single method (doSth) that supports both async and sync usage.


## How to migrate to the modularized libraries?

If you're updating an existing app to use Modular SDKs, focus on these areas:

1. Long Running Operations
1. Paging Operations
1. Model property flattening

### Long Running Operations

Many operations may take a long time to finish before receiving the desired response. Instead of two methods (beginDoSth and beginDoSthAndWait), Modular SDKs offer a single method (doSth) that supports both async and sync usage. The changes mainly are three parts:

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
const result = await client.beginStartAndWait({resumeFrom: serializedState}); 

// Modular
const result = await restorePoller(client, serializedState, client.start);   
```
If you are interested in more details in core-lro and here is the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/docs/MIGRATION.md). 

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

Client libraries represent entities transferred to and from Azure services as model types. For the model types, in the traditional client we have supported the autorest extension [x-ms-client-flatten](https://azure.github.io/autorest/extensions/#x-ms-client-flatten). This extension allows to flatten deeply nested payloads into a top-level object structure. For example a payload that looks like this on the wire:

```json
{
  "hcxEnterpriseSite": {
    "name": "hcxEnterpriseSiteName",
    "properties": {
      "provisioningState": "succeed",
      "activationKey": "value2",
      "status": "ok"
    },
  },
}
```
Can be transformed into the following client model and see [generated code](https://github.com/Azure/azure-sdk-for-js/blob/835b3dca8d8c635c1471a8264b025409a75298fc/sdk/avs/arm-avs/src/models/index.ts#L1196C1-L1213C2):
```ts
/** An HCX Enterprise Site resource */
export interface HcxEnterpriseSite extends ProxyResource {
  /**
   * The provisioning state of the resource.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: HcxEnterpriseSiteProvisioningState;
  /**
   * The activation key
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly activationKey?: string;
  /**
   * The status of the HCX Enterprise Site
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: HcxEnterpriseSiteStatus;
}
```

Modular SDKs no longer support flattening to reduce confusion and maintenance overhead. So now [the model](https://github.com/azure/azure-sdk-for-js/blob/181311fe630b5609e78d55306ad2242bb881dacf/sdk/avs/arm-avs/src/models/models.ts#L3171-L3174) would be generated like below:
```ts
/** An HCX Enterprise Site resource */
export interface HcxEnterpriseSite extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HcxEnterpriseSiteProperties;
}

/** The properties of an HCX Enterprise Site */
export interface HcxEnterpriseSiteProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: HcxEnterpriseSiteProvisioningState;
  /** The activation key */
  readonly activationKey?: string;
  /** The status of the HCX Enterprise Site */
  readonly status?: HcxEnterpriseSiteStatus;
}
```

Which means for these changes, we need to update our code from `result.activationKey` to `result.properties?.activationKey`. So the before-and-after code would be like:

```ts
// traditional client
const result = await client.hcxEnterpriseSites.get("resourceGroupName", "privateCloudName", "hcxEnterpriseSiteName");
console.log(result.activationKey);

// Modular client
const result = await client.hcxEnterpriseSites.get("resourceGroupName", "privateCloudName", "hcxEnterpriseSiteName");
console.log(result.properties?.activationKey);
```

Please note for Azure models, majority of property flatten happened in `properties` property.


## Need help

If you have encountered an issue during migration, please file an issue via [Github Issues](https://github.com/Azure/azure-sdk-for-js/issues) and make sure you add the 'Preview' label to the issue.
