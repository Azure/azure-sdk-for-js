# Breaking Changes

2019.6 Version 11.0.0-preview.1.0
* The type of the `include` field of both `ServiceListQueuesOptions` and `ServiceListQueuesSegmentOptions` has changed from `ListQueuesIncludeType` to `ListQueuesIncludeType[]` due to changes in the underlying OpenAPI specification.
* `TokenCredential` has been renamed to `RawTokenCredential` to make way for the new `@azure/identity` library's `TokenCredential` interface.

2019.1 Version 10.1.0
* Updated convenience layer methods enum type parameters into typescript union types, this will help to reduce bundle footprint.
* `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
* IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
