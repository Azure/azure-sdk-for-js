# Breaking Changes

2018.12 10.3.0

* Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
* Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new BlobURL(url, pipeline)`.
  * URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if blob name includes `?` or `%`, `url` must be encoded manually.
* `SASQueryParameters` is not going to be exported in browser bundle, and exported in Node.js runtime.
* IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.

2018.11 10.2.0-preview

* Updated names of exported interfaces `IHTTPPipelineLogger` & `IHTTPClient` to `IHttpPipelineLogger` & `IHttpClient`.
* For `setMetadata()` and `setHTTPHeaders()`, `metadata` and `blobHTTPHeaders` are moved from `options` into top level parameter list.

2018.09 10.1.0-preview

* `Aborter.None` is renamed to `Aborter.none` for JavaScript naming conventions.
* Dropped built-in polyfills for `String`, and following polyfills need to be loaded external for IE11 now:
  * `Promise`
  * `String.prototype.startsWith`
  * `String.prototype.endsWith`
  * `String.prototype.repeat`
  * `String.prototype.includes`