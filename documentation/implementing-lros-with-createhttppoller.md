# Implementing Long-Running Operations
Implementing LROs is a daunting task because of the complexity of managing transitions between states and in the same time taking care of behavioral details such as dynamic polling spacing and aborting. To make it easier for client authors to implement LROs, `@azure/core-lro` exports a function named `createHttpPoller` that abstracts away all LRO-specific implementation details.

## Overview
`createHttpPoller` constructs a poller from a few pieces, mainly, 
- a way to initialize the operation, 
- a way to poll it, 
- a way to convert the last polling response into a result object, and 
- a way to update the poller state from a polling response. 

The first two pieces are captured by the first parameter of the function which is of type `LongRunningOperation`:
```ts
export interface LongRunningOperation<T = unknown> {
  requestPath?: string;
  requestMethod?: string;
  sendInitialRequest: () => Promise<LroResponse<unknown>>;
  sendPollRequest: (path: string, options?: { abortSignal?: AbortSignalLike }) => Promise<LroResponse<T>>;
}
```

More specifically, those two pieces are the values of `sendInitialRequest` and `sendPollRequest` respectively. Note that `requestPath` and `requestMethod` are optional properties that are needed by `PUT` LROs only, in which case, `requestPath` is the URL path of the resource, and `requestMethod` is `"PUT"`.

Moreover, the last two pieces are options in the options bag which is defined as follows:
```ts
export interface CreateHttpPollerOptions<TResult, TState> {
  processResult?: (result: unknown, state: TState) => TResult;
  updateState?: (state: TState, response: LroResponse) => void;
  intervalInMs?: number;
  restoreFrom?: string;
  resourceLocationConfig?: LroResourceLocationConfig;
  withOperationLocation?: (operationLocation: string) => void;
  resolveOnUnsuccessful?: boolean;
}
```

More specifically, those two pieces are the values of `processResult` and `updateState` respectively. `processResult` takes the last polling response and the state as input and returns a `TResult`, which will eventually be returned to the customer when they call `poller.pollUntilDone()`. `updateState` can mutate the state with specific information from every polling response such as updating metadata fields (e.g. many operations return a `lastUpdatedDateTime` field in their polling responses to tell the customer when last time their operation had an activity).

These are the main four pieces of information needed to construct the poller but there are other options that can be used to adjust the poller behavior:
- `intervalInMs`: controls the time interval between polling requests
- `restoreFrom`: enables creating a poller for an existing operation from a serialized state
- `resourceLocationConfig`: controls the polling behavior and typically used only when the LRO swagger extension is used in the swagger
- `withOperationLocation`: a callback that gets called every time the operation location header is first returned or updated. This callback is useful to save the operation URL for later use, e.g. get pages from it if the result is pageable
- `resolveOnUnsuccessful`: controls whether to throw exceptions when the operation is canceled or failed. Typically needed by REST-level clients (RLCs) only

## Example
Please see [`@azure/ai-language-text`](https://github.com/Azure/azure-sdk-for-js/blob/f8e83621a047113ae8d408e552d7d7f32cd82075/sdk/cognitivelanguage/ai-language-text/src/textAnalysisClient.ts#L690-L703) for an example of how to use `createHttpPoller`.

## Benefits of using `createHttpPoller`

- it is plug-in and forget it setup, with zero maintenance cost on the client author side
- it provides a good logging experience
- it is feature-complete
- it is battle-tested with a [comprehensive test suite](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/test/lro.spec.ts) that has many customer-reported cases and no major gh issue currently open against it
- it is being used in all types of clients, REST-level, management-plane, data-plane, etc

## Migrating existing LROs

Please note that `createHttpPoller` returns an object of type `SimplePollerLike<TResult>` which is slightly different from `PollerLike<TResult>` that many libraries still use. There are a couple of differences between the two interfaces:
- `PollerLike` has `isCanceled`, `isFailed`, and `isCompleted` boolean fields but `SimplePollerLike` has `status` which is a closed enum of `notStarted`, `running`, `succeeded`, `failed`, and `canceled` values. Using `status` improves the customer experience because it can be consumed by a simple switch statement and typically corresponds directly to a field in the response object with the same name, so no need for the customer to be familiar with how the client interprets the operation's status.
- `PollerLike` has a `cancelOperation` method that is not implemented by the majority of LROs, which is misleading to our customers. `SimplePollerLike` doesn't have such method but you can always add it to your poller object if one is needed.

To avoid breaking changes, you may want to update the return object from `createHttpPoller` to be compatible with `PollerLike` as follows:
- utilize `updateState` to add `isCanceled`, `isFailed`, and `isCompleted` fields to your poller state
- tack on a `cancelOperation` method