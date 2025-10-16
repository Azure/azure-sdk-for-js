# Guide for migrating to code generation from TypeSpec (Azure JavaScript SDK)

> **Terminology used in this guide**
>
> - **Libraries generated from TypeSpec**: Client libraries produced by the **TypeSpec Emitter** (the new generation toolchain).  
>   Previously referred to as *“modular”/“modularized libraries.”*
> - **Libraries generated with AutoRest**: Client libraries produced by the **AutoRest Code Generator** (previous generation).  
>   Previously referred to as *“HLC”, "Swagger generator", "OpenAPI Generator"*
This guide helps developers transition their JavaScript/TypeScript applications to use the *TypeSpec generated* Azure SDK libraries.

**For new customers of the JavaScript/TypeScript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)), please see [quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/quickstart-guide-for-libraries-generated-from-TypeSpec.md).**

## Current status

Several packages generated from *TypeSpec* have already reached General Availability (GA), including `@azure/arm-avs`, `@azure/arm-fabric`, `@azure/arm-oracledatabase`, `@azure/keyvault-admin`. We are actively working on releasing more packages and eventually cover all Azure services. Please find the latest version of those libraries in [npm](https://www.npmjs.com) and give them a try.

## Library improvements when generating from *TypeSpec*

We recommend reviewing the [complete guide](https://devblogs.microsoft.com/azure-sdk/azure-sdk-modularized-libraries-for-javascript/) for full details. Compared to libraries generated with *Autorest*, *TypeSpec code generation* has following key benefits:

1. Subpath exports: Libraries now leverage [subpath exports](https://nodejs.org/api/packages.html#subpath-exports)(introduced in Node.js version 12.7) to provide layered APIs. This means developer can access the familiar `Client` at the root level while also using the `/api` subpath for fine-grained, operation-level imports.
1. Bundle size optimization: By leveraging the new `/api` subpath export, developers can selectively import only the operations they need. This approach minimizes the overall library footprint in the application bundle, ensuring that only the required pieces are included.
1. Long-running operations: Based on customer feedback, we simplified the API to make it cleaner and more ergonomic. Previously, clients exposed two methods for each *long-running operation* (`beginDoSth` and `beginDoSthAndWait`), which often felt redundant and confusing. Libraries generated from *TypeSpec* now provide a single method (`doSth`) that supports both async and sync usage, reducing complexity while improving developer experience.


## How to migrate to libraries generated from TypeSpec

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
```

#### Poller type: `SimplePollerLike` → `PollerLike`

TypeSpec‑generated LROs return a `PollerLike`, which is also **Promise‑like**.

| Capability                                  | AutoRest (`SimplePollerLike`) | TypeSpec (`PollerLike`) |
|---------------------------------------------|-------------------------------|-------------------------|
| Return final results                        | `pollUntilDone()`             | `pollUntilDone()`       |
| Poll                                        | `poll()`                      | `poll()`                |
| Observe progress                            | `onProgress()`                | `onProgress()`          |
| Check completion                            | `getOperationState().isCompleted`/`isDone()` | `isDone`               |
| Stop / check stopped                        | `stopPolling()` / `isStopped()` | N/A                   |
| Read current state                          | `getOperationState()`         | `operationState`        |
| Access final result                         | `getResult()`                 | `result`                |
| Serialize poller state                      | `toString()`                  | `serialize()`           |
| Await initial submission                    | N/A                           | `submitted()`           |

> **Note:** `getOperationState(): TState` becomes the property `operationState?: TState`. Guard for `undefined` before access:

```ts
// Before
const status = poller.getOperationState().status;

// Now
const status = poller?.operationState?.status;
```

**Serialization change**
```ts
// Before
const serialized = poller.toString();

// Now
const serialized = await poller.serialize();
```
#### Rehydration (restoring a poller)

Rehydration moved from an operation option (`resumeFrom`) to a **client‑level helper**.

**Before → After**
```ts
// Before (AutoRest-generated)
const result = await client.beginStartAndWait({ resumeFrom: serializedState });

// After (TypeSpec-generated)
const result = await restorePoller(client, serializedState, client.start);
```
For more detail, see the core‑lro migration guide:  
https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/docs/MIGRATION.md

---

#### Quick migration checklist

- Replace `beginXxxAndWait()` → `await xxx()`.  
- Replace `await beginXxx()` → `const poller = xxx()`.  
- Replace `poller.toString()` → `await poller.serialize()`.  
- Replace `poller.getOperationState()` → `poller.operationState` (guard for `undefined`).  
- If you previously used `resumeFrom`, switch to `restorePoller(client, serialized, client.xxx)`.  
- If you depended on `stopPolling()`/`isStopped()`, revisit your control flow (these are not exposed on `PollerLike`).

---
### List operations (paging)
Paging has been simplified in libraries generated from TypeSpec. Two main changes:

- **Removed unsupported `maxpagesize`**  
- **Replaced `getContinuationToken` helper with direct `continuationToken` property**


#### `maxpagesize` removed
The `maxpagesize` setting was never supported in AutoRest-generated clients, so it has been removed from `PageSettings`. No behavioral impact is expected.

#### Continuation token access simplified
Previously, you needed a helper function to extract the continuation token:

**AutoRest-generated (previous)**  
```ts
const firstPage = await iter.byPage().next();
const continuationToken = getContinuationToken(firstPage);
```

Now, the token is exposed directly on the page object:

**TypeSpec-generated (current)**  
```ts
export type ContinuablePage<TElement, TPage = TElement[]> = TPage & {
  /** Token to continue iteration */
  continuationToken?: string;
};

const firstPage = await iter.byPage().next();
const continuationToken = firstPage.value.continuationToken;
```


### Model Property Flattening

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

#### What changed?
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

#### What does this mean for you?
Update your code to access nested properties through `properties`. For example:

```ts
// Before (AutoRest-generated)
const result = await client.hcxEnterpriseSites.get("resourceGroupName", "privateCloudName", "hcxEnterpriseSiteName");
console.log(result.activationKey);

// After (TypeSpec-generated)
const result = await client.hcxEnterpriseSites.get("resourceGroupName", "privateCloudName", "hcxEnterpriseSiteName");
console.log(result.properties?.activationKey);
```

> **Tip:** In most Azure resource models, flattening occurred under the `properties` bag, so expect to adjust references accordingly.


## Need help

If you have encountered an issue during migration, please file an issue via [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues) and make sure you add the 'Preview' label to the issue.
