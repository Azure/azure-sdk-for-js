# Guide for migrating to code generation from TypeSpec (Azure JavaScript SDK)

This guide helps developers transition their JavaScript/TypeScript applications to use the modularized Azure SDK libraries, also known as Modular SDKs.

**For new customers of the JavaScript/TypeScript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)), please see [quick start guide for modularized libraries](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/modularized-libraries-quickstart.md).**

## Current status

Several packages released from Modular libraries have already reached General Availability (GA), including `@azure/arm-avs`, `@azure/arm-fabric`, `@azure/arm-oracledatabase`, `@azure/keyvault-admin`. We are actively working on releasing more packages and eventually cover all Azure services. Please find the latest version of those libraries in [npm](https://www.npmjs.com) and give them a try.

## Why switching to the modularized libraries?

We recommend reviewing the [complete guide](https://devblogs.microsoft.com/azure-sdk/azure-sdk-modularized-libraries-for-javascript/) for full details. Compared to libraries generated with *Autorest*, *TypeSpec code generation* has following key benefits:

1. Subpath exports: Libraries now leverage [subpath exports](https://nodejs.org/api/packages.html#subpath-exports)(introduced in Node.js version 12.7) to provide layered APIs. This means developer can access the familiar `Client` at the root level while also using the `/api` subpath for fine-grained, operation-level imports.
1. Bundle size optimization: By leveraging the new `/api` subpath export, developers can selectively import only the operations they need. This approach minimizes the overall library footprint in the application bundle, ensuring that only the required pieces are included.
1. Long-running operations: Based on customer feedback, we simplified the API to make it cleaner and more ergonomic. Previously, clients exposed two methods for each *long-running operation* (`beginDoSth` and `beginDoSthAndWait`), which often felt redundant and confusing. Libraries generated from *TypeSpec* now provide a single method (`doSth`) that supports both async and sync usage, reducing complexity while improving developer experience.


## How to migrate to the modularized libraries?

If you’re updating an existing application from **libraries generated with AutoRest** to **libraries generated from TypeSpec**, focus on these key areas:

1. **Long-running operations (LROs)** – Updated method signatures and poller behavior
2. **List operations (paging)** – Simplified continuation token handling
3. **Model property flattening** – **Libraries generated from TypeSpec** no longer support client-side flattening. This decision was based on customer feedback to reduce confusion and maintenance overhead

### Long-running Operations (LROs)

Based on customer feedback, we simplified LROs to make the API **cleaner and more ergonomic**. Three changes matter for migration:

- **Method shape**: two methods → one method  
- **Poller type**: `SimplePollerLike` → `PollerLike` (Promise‑like)  
- **Rehydration**: option‑based → helper function
#### Method signature changes
Previously (libraries generated with **AutoRest**), each LRO exposed two methods (e.g., `beginStart` and `beginStartAndWait`).  
Now (libraries generated from **TypeSpec**), there’s a **single** method that behaves as a poller **and** can be directly awaited.

**AutoRest‑generated (previous)**  
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
**TypeSpec‑generated (current)**

```ts
start(options?: IntegrationRuntimesStartOptionalParams): PollerLike<
      OperationState<IntegrationRuntimesStartResponse>,
      IntegrationRuntimesStartResponse
    >;
```
**Migrate your usage**
```ts
// Before (AutoRest-generated)
const result = await beginStartAndWait();

const poller = await beginStart();
const result2 = await poller.pollUntilDone();

// After (TypeSpec-generated)
const result = await start();           // awaiting returns the final result
const poller = start();                 // direct access to the poller
await poller.submitted();               // optional: await initial submission
const result2 = await poller;           // or: await poller.pollUntilDone()

#### Poller type: `SimplePollerLike` → `PollerLike`

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
The `maxpagesize` is not supported in traditional client so in Modular we remove this setting within PageSettings. These changes are supposed to have no impact for customers.

#### Remove the helper `getContinuationToken`
In traditional client we build an util function to help customers to get the continuation token([here](https://github.com/Azure/azure-sdk-for-js/blob/735677407c4fbbceea95200f6d6de00e29804740/sdk/datadog/arm-datadog/src/pagingHelper.ts#L22-L29)).

So we could reference the token by code.

```ts
const firstPage = await iter.byPage().next();
const continuationToken = getContinuationToken(firstPage);
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

## Model Property Flattening

Previously, **libraries generated with AutoRest** supported the `x-ms-client-flatten` extension, which allowed deeply nested payloads to be flattened into a top-level object structure. For example, a payload like this:

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
would generate a model where `activationKey` and other properties were surfaced at the top level:
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

### What changed?
**Libraries generated from TypeSpec** no longer support client-side flattening. This decision was based on customer feedback to reduce confusion and maintenance overhead. Models now preserve the original structure, so properties are grouped under a `properties` object (as defined in TypeSpec):
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

### What does this mean for you?
Update your code to access nested properties through `properties`. For example:

```ts
// traditional client
const result = await client.hcxEnterpriseSites.get("resourceGroupName", "privateCloudName", "hcxEnterpriseSiteName");
console.log(result.activationKey);

// Modular client
const result = await client.hcxEnterpriseSites.get("resourceGroupName", "privateCloudName", "hcxEnterpriseSiteName");
console.log(result.properties?.activationKey);
```

> **Tip:** In most Azure resource models, flattening occurred under the `properties` bag, so expect to adjust references accordingly.


## Need help

If you have encountered an issue during migration, please file an issue via [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues) and make sure you add the 'Preview' label to the issue.
