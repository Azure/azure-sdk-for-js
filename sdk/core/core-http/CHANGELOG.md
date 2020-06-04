# Release History

## 1.1.3 (2020-06-03)

- Fix issue of `SystemErrorRetryPolicy` didn't retry on errors [PR #8803](https://github.com/Azure/azure-sdk-for-js/pull/8803)
- Add support for serialization of text media type. [PR #8977](https://github.com/Azure/azure-sdk-for-js/pull/8977)
- Fix issue with URLBuilder incorrectly handling full URL in path. [PR #9245](https://github.com/Azure/azure-sdk-for-js/pull/9245)

## 1.1.2 (2020-05-07)

- Fix issue with null/undefined values in array and tabs/space delimiter arrays during sendOperationRequest. [PR #8604](https://github.com/Azure/azure-sdk-for-js/pull/8604)

## 1.1.1 (2020-04-28)

- Add support for `text/plain` endpoints. [PR #7963](https://github.com/Azure/azure-sdk-for-js/pull/7963)
- Updated to use OpenTelemetry 0.6.1 via `@azure/core-tracing`.

## 1.1.0 (2020-03-31)

- A new interface `WebResourceLike` was introduced to avoid a direct dependency on the class `WebResource` in public interfaces. `HttpHeadersLike` was also added to replace references to `HttpHeaders`. This should improve cross-version compatibility for core-http. [PR #7873](https://github.com/Azure/azure-sdk-for-js/pull/7873)

- Add support to disable response decompression in `node-fetch` Http client. [PR #7878](https://github.com/Azure/azure-sdk-for-js/pull/7878)

## 1.0.4 (2020-03-03)

- When an operation times out based on the `timeout` configured in the `OperationRequestOptions`, it gets terminated with an error. In this update, the error that is thrown in browser for such cases is updated to match what is thrown in node i.e an `AbortError` is thrown instead of the previous `RestError`. [PR #7159](https://github.com/Azure/azure-sdk-for-js/pull/7159)
- Support for username and password in the proxy url [PR #7211](https://github.com/Azure/azure-sdk-for-js/pull/7211)
- Removed dependency on `lib.dom.d.ts` so TypeScript users no longer need `lib: ["dom"]` in their tsconfig.json file to use this library. [PR #7500](https://github.com/Azure/azure-sdk-for-js/pull/7500)

## 1.0.3 (2020-01-02)

- Added `x-ms-useragent` to the list of allowed headers in request logs.
- Fix issue of data being pushed twice when reporting progress ([PR #6427](https://github.com/Azure/azure-sdk-for-js/issues/6427))
- Move `getDefaultProxySettings()` calls into `proxyPolicy` so that libraries that don't use the PipelineOptions or createDefaultRequestPolicyFactories from core-http can use this behavior without duplicating code. ([PR #6478](https://github.com/Azure/azure-sdk-for-js/issues/6478))
- Fix tracingPolicy() to set standard span attributes ([PR #6565](https://github.com/Azure/azure-sdk-for-js/pull/6565)). Now the following are set correctly for the spans
  - `http.method`
  - `http.url`
  - `http.user_agent`
  - `http.status_code`
  - `requestId`
  - `serviceRequestId`
  - `kind` = Client
  - span name: URI path

## 1.0.2 (2019-12-02)

- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

## 1.0.0 (2019-10-29)

- This release marks the general availability of the `@azure/core-http` package.
- Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel.
  ([#5860](https://github.com/Azure/azure-sdk-for-js/pull/5860))

## 1.0.0-preview.6 (2019-10-22)

- Introduced a HTTP pipeline configuration type, `PipelineOptions`, which makes it easier to configure common settings for API requests. This is now the options type used in the `@azure/keyvault-*` data plane libraries.
- Support for HTTP request logging has been redesigned to use `@azure/logger`; use`AZURE_LOG_LEVEL="info"` to see full request/response logs when running in Node.js. In the browser, you can import `setLogLevel` from `@azure/logger` to change the log level; logs will then be written to the browser console.
- Removed error type `ResponseBodyNotFoundError` that was introduced in the previous preview. Use cases for it were removed.
- Fixed an issue where error response details were not being deserialized correctly when the default mapper is used.
- In Node.js, HTTP agents configured for proxy or keepAlive are now reused across requests. This resolves a memory leak reported in [#4964](https://github.com/Azure/azure-sdk-for-js/issues/4964).
- Fixes a memory leak issue resulting from event listeners not being removed from abortSignals.
- Cancelling an operation using an `abortSignal` will now throw an `AbortError`.
  The `name` property on the error will match "AbortError".

## 1.0.0-preview.4 (2019-10-07)

- No longer re-exports `@azure/core-tracing`. To enable tracing, call `setTracer` from `@azure/core-tracing` directly.
  ([PR #5389](https://github.com/Azure/azure-sdk-for-js/pull/5389))
- Report upload/download progress only after the first data chunk is received
  ([PR #5298](https://github.com/Azure/azure-sdk-for-js/pull/5298))
- Added new error type `ResponseBodyNotFoundError` for cases when the response body is unexpectedly empty.
  ([PR #5369](https://github.com/Azure/azure-sdk-for-js/pull/5369))
- Temporary fix for a memory leak issue resulting from creating new agents every time WebResource is cloned.
  ([PR #5396](https://github.com/Azure/azure-sdk-for-js/pull/5396))

## 1.0.0-preview.3 (2019-09-09)

- Syncs changes from `@azure/ms-rest-js` to `@azure/core-http`.
  ([PR #4756](https://github.com/Azure/azure-sdk-for-js/pull/4756)).
  - Updates HTTP clients to `fetch` and `node-fetch` for the browser and node.js respectively.
- Reintroduces `ServiceClientCredentials` type to `credentials` parameter of `ServiceClient`
  ([PR #4773](https://github.com/Azure/azure-sdk-for-js/pull/4773)).
- Updates types for better compatibility with TypeScript 3.6.x.
  ([PR #4928](https://github.com/Azure/azure-sdk-for-js/pull/4928)).
- Adds `TracingPolicy` to support setting `traceparent` and `tracestate` headers
  when setting spans in operation as per the [trace context HTTP headers format](https://www.w3.org/TR/trace-context/#trace-context-http-headers-format).
  ([PR #4712](https://github.com/Azure/azure-sdk-for-js/pull/4712)).
- Adds `text/plain` as an accepted MIME type for JSON output.
  ([PR #4975](https://github.com/Azure/azure-sdk-for-js/pull/4975)).
- Exposes `ProxySettings` type. ([PR #5043](https://github.com/Azure/azure-sdk-for-js/pull/5043)).
- Fixes bug where `WebResource.clone` would not copy `proxySettings` or `keepAlive` settings.
  ([PR #5047](https://github.com/Azure/azure-sdk-for-js/pull/5047)).

## 1.0.0-preview.2 (2019-08-05)

- Removed `ServiceClientCredentials` type from `credentials` parameter of `ServiceClient` ([PR #4367](https://github.com/Azure/azure-sdk-for-js/pull/4367)). Credential implementations are now standardized on `@azure/core-auth`'s `TokenCredential` interface and provided by `@azure/identity`.
- Added an `AccessTokenCache` so that access tokens can be cached across pipeline instances ([PR #4174](https://github.com/Azure/azure-sdk-for-js/pull/4174)).
- Fixed the issue preventing `ServiceClient` from correctly setting the scope's resource URI when creating a `BearerTokenAuthenticationPolicy` ([PR #4335](https://github.com/Azure/azure-sdk-for-js/pull/4335)).
- Migrated over `AxiosHttpClient` fixes from `@azure/ms-rest-js` ([PR #4106](https://github.com/Azure/azure-sdk-for-js/pull/4106)).

## 1.0.0-preview.1 (2019-06-25)

- Forked `@azure/ms-rest-js` to `@azure/core-http` to form the base HTTP pipeline of the Azure SDK TypeScript/JavaScript libraries.
- Added `TokenCredential` to define a simple interface for credentials that provided bearer tokens
- Added `BearerTokenAuthenticationPolicy` which can use a `TokenCredential` implementation to perform bearer token authentication against Azure services
