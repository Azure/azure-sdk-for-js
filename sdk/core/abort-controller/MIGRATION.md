<!-- dev-tool snippets ignore -->

# Migrating abort-controller from 1.x to 2.x

This guide is intended to provide an overview for the changes between 1.x and 2.x of the `@azure/abort-controller` package. This is one of our core packages, and so is not intended to be used directly by consumers of Azure SDKs.

## Background and platform support

For general information about how we use `AbortSignal` and `AbortController` in the SDKs to handle cancelation, please review Brian's [blog post on canceling operations](https://devblogs.microsoft.com/azure-sdk/how-to-use-abort-signals-to-cancel-operations-in-the-azure-sdk-for-javascript-typescript/)

As these platform features were originally designed in the browser to support the `fetch` API, they had to later be implemented in NodeJS. Both of these primitives were [marked as stable in version 15](https://nodejs.org/docs/latest/api/globals.html#class-abortcontroller).

Only even version numbers of NodeJS are eligible for long term support, so it wasn't until Node 14 reached end of life that our minimum supported environment moved to Node16 per our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md#microsoft-support-policy) and we could rely on this feature.

Besides removing unneeded surface, a key motivation for the migration were issues with reference leaks (see [issue 12030](https://github.com/Azure/azure-sdk-for-js/issues/12030)) as well as cases where we were not able to interop correctly with native browser `fetch`.

## Changes in 2.x

[PR 27921](https://github.com/Azure/azure-sdk-for-js/pull/27921) introduced changes to remove polyfills for `AbortController` and `AbortSignal` as they were now natively available in our supported runtimes.

This means that all SDK packages can now assume `AbortController` and `AbortSignal` are globally present without any need to import them.

## Adopting 2.x

The first step is to remove any imports from `@azure/abort-controller` to either `AbortController` or `AbortSignal`. References to `AbortSignalLike` or `AbortError` are still okay, as these are still provided by this package.

The main effort in migration is due to differences between our polyfill and the native platform implementation of `AbortController`.

### Timeout static moved from `AbortController` to `AbortSignal`:

We implemented a static `timeout` method on AbortController to quickly manufacture an `AbortSignal` that would raise an `AbortError` after a given number of milliseconds. This is natively available as a static member of `AbortSignal`.

Previous:

```ts
AbortController.timeout(1000);
```

New:

```ts
AbortSignal.timeout(1000);
```

### AbortController no longer takes an array of child AbortSignals

A common scenario is an operation may internally use an `AbortController` for cancelation, but the user can also pass their own input signal.

As a convenience, our 1.x polyfill included the ability to create a new `AbortController` from existing child signals passed into the constructor. This is not available in the native version.

Previous:

```ts
new AbortController([inputAbortSignal, abortController.signal]);
```

New:

```ts
// create a delegate to handle calling abort on the controller for this operation
function abortListener(): void {
  abortController.abort();
}
const abortSignal = abortController.signal;
if (inputAbortSignal?.aborted) {
  // abort immediately if the parent signal is aborted
  abortController.abort();
} else if (!abortSignal.aborted) {
  // listen for the abort event on the signal passed from the user
  inputAbortSignal?.addEventListener("abort", abortListener, { once: true });
}
try {
  // pass in abortSignal from the current context's abortController as our delegate will handle propagating the input signal
} finally {
  // clean up the listener after the operation is finished
  inputAbortSignal?.removeEventListener("abort", abortListener);
}
```

Once Node 20 becomes our minimum bar, we can use `AbortSignal.any` instead:

```ts
AbortSignal.any([inputAbortSignal, abortController.signal]);
```

### AbortSignal.none removed

This feature was intended to be a convenience to indicate that an operation will never be cancelled in the case that an `AbortSignal` was a required property. This was briefly used by preview versions of Storage packages before being changed to make the signal optional.

As the platform has no analog for this and we do not have a compelling use case in any SDK, it was removed with no replacement.
