# Breaking Changes

2018.11 10.2.0-preview

* Updated names of exported interfaces `IHTTPPipelineLogger` & `IHTTPClient` to `IHttpPipelineLogger` & `IHttpClient`.
* For `setMetadata()` and `setHTTPHeaders()`, `metadata` and `blobHTTPHeaders` are moved from `options` into top level paramters list.

2018.09 10.1.0-preview

* `Aborter.None` is renamed to `Aborter.none` for JavaScript naming conventions.
* Dropped built-in polyfills for `String`, and following polyfills need to be loaded external for IE11 now:
  * `Promise`
  * `String.prototype.startsWith`
  * `String.prototype.endsWith`
  * `String.prototype.repeat`
  * `String.prototype.includes`