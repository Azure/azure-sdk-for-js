# Release History

## 2.1.0 (Unreleased)

### Features Added

- Add support for session-level sanitization using the `Recorder.addSessionSanitizers` static method. [#21533](https://github.com/Azure/azure-sdk-for-js/pull/21533)
- Added logging to help with debugging tests. [#21641](https://github.com/Azure/azure-sdk-for-js/pull/21641)
- Allow mapping the test-proxy tool to ports other than just 5000(for HTTP) using the environment variable `TEST_PROXY_HTTP_PORT`(and `TEST_PROXY_HTTPS_PORT` for 5001(for HTTPS)).
  - If `TEST_PROXY_HTTP_PORT` is undefined, we'll try for 5000 as usual.
  - For browsers, this variable has to be added as part of the environment variables listed under `envPreprocessor` array in `karma.conf.js` so that the recorder knows the port to hit.

### Breaking Changes

### Bugs Fixed

- Fixed redirects not being passed to the test proxy in the browser. [#21713](https://github.com/Azure/azure-sdk-for-js/pull/21713)
- The value of the `TEST_MODE` environment variable is no longer case-sensitive. [#22118](https://github.com/Azure/azure-sdk-for-js/pull/22118)
- Fixed "ReferenceError: atob is not defined" in node where the `atob` method isn't available([deprecated](https://stackoverflow.com/questions/23097928/node-js-throws-btoa-is-not-defined-error)) in the environment, which masked the actual error that is supposed to throw from the test proxy tool. [#22266](https://github.com/Azure/azure-sdk-for-js/issues/22266)

### Other Changes

- Improved formatting of error messages returned by the test proxy. [#21575](https://github.com/Azure/azure-sdk-for-js/pull/21575)

## 2.0.0 (2022-04-11)

Marks the first release of recorder v2. This project is a test utility that assits with testing the packages maintained at the Azure SDK for JavaScript repository by leveraging the unified out-of-process test proxy server. This is not intended for the public utilization.

### Features Added

- Allows adding sanitizers in playback mode as well. [#20612](https://github.com/Azure/azure-sdk-for-js/pull/20612)

  - If the sanitizer options are passed as part of the `recorder.start()`, they'll only be used in "record" mode and will be applied on the recordings.
  - Use the `recorder.addSanitizers()` call instead if you want the sanitizers to be added in a specific test mode or in a combination of modes by providing the optional "mode" argument.
  - "live" mode has no impact as usual.

- Add support for `addTransform`, which allows for transforms to be applied to saved recordings in playback mode. The following transforms are supported:
  - `ApiVersionTransform`: During playback mode, echoes back the `api-version` header provided by the request
  - `ClientIdTransform`, `StorageRequestIdTransform`: these echo back the `X-MS-Client-Id` and the `X-MS-Client-Request-Id` headers respectively
  - `HeaderTransform`: adds an arbitrary header and value to the returned request. These are provided by the `key` and `value` parameters to `addTransform`.
- `CustomDefaultMatcher`- exposes the default matcher in a customizable way. Currently, this includes enabling/disabling body match, adding additional excluded headers, and enable/disable matching the order of query params in the requests.
  [#20404](https://github.com/Azure/azure-sdk-for-js/pull/20404)

- [#19920](https://github.com/Azure/azure-sdk-for-js/pull/19920) Added support for adding polices as part of the client options with the new "additionalPolicies" array.
  By leveraging the new option, `configureClientOptions` method is added to the `Recorder`.

  [#20175](https://github.com/Azure/azure-sdk-for-js/pull/20175)

  - With the support from the new `Recorder#configureClientOptions` method, we no longer need the `Recorder#configureClient` that used to access the private "pipeline" object internal to the client to add/modify the policies.
  - [#20175](https://github.com/Azure/azure-sdk-for-js/pull/20175) removes the `Recorder#configureClient` along with the new addition.

- Add support for the new string sanitizers, including **breaking changes**:

  - Removed the `Sanitizer` class, instead making the `addSanitizers` function in `sanitizer.ts` take in a `HttpClient` and recording ID as parameter.
  - Refactored the `addSanitizers` function to call smaller functions for each sanitizer (some of which are a bit FP-style) instead of using if statements + special cases. Hopefully this will make things a bit easier to maintain.
  - Some other minor refactors (e.g. extracting duplicated `createRecordingRequest` function into a utility).
  - Add support for the string sanitizers in what I think is the most logical way, but there is a **breaking change**:
    - When calling `addSanitizers`, instead of specifying `generalRegexSanitizers: [...]` etc., you now specify `generalSanitizers: [...]`. Both regex sanitizers and string sanitizers can be used in this way, for example:

  ```ts
  recorder.addSanitizers({
    generalSanitizers: [
      {
        regex: true, // Regex matching is enabled by setting the 'regex' option to true.
        target: ".*regex",
        value: "sanitized",
      },
      {
        // Note that `regex` defaults to false and doesn't need to be specified when working with bare strings.
        // In my experience, this is the most common scenario anyway.
        target: "Not a regex",
        value: "sanitized",
      },
    ],
  });
  ```

  [#19954](https://github.com/Azure/azure-sdk-for-js/pull/19954)

- Bug Fix - Fixed the bug where the `recordingId` was being ignored in the add-sanitizer requests which led the test level sanitizers to be treated as session level sanitizers.
  [#20393](https://github.com/Azure/azure-sdk-for-js/pull/20393)

- Renaming the package `@azure-tools/test-recorder-new@1.0.0` as `@azure-tools/test-recorder@2.0.0`.
  [#19561](https://github.com/Azure/azure-sdk-for-js/pull/19561)

- Allows passing `undefined` as keys in the sanitizer options so that devs don't have to add additional checks if a certain env variable exists in playback.
- Exports `delay`

  - waits for expected time in record/live modes
  - no-op in playback

  [#19561](https://github.com/Azure/azure-sdk-for-js/pull/19561)

- Refactoring the test proxy http clients for better clarity for the end users [#19446](https://github.com/Azure/azure-sdk-for-js/pull/19446)

  - Client rename `TestProxyHttpClient` -> `Recorder`
  - Removing the separate `TestProxyHttpClientCoreV1`
    - Instead of passing the whole client as the `httpClient` for core-v1 sdks, users are now expected to call `recorder.configureClientOptionsCoreV1` on the client options while passing to the respective client(where `recorder` is an instantiation of `Recorder`). This modifies the httpClient in the options to allow redirecting the requests to the test-proxy tool.
  - Duplicated helpers from old recorder to not depend on old recorder package.. with an intention to replace the recorder package as 2.0 and not merge since the old recorder is published already
  - Makes the following members of `Recorder` private
    - `httpClient`
    - `redirectRequest`
    - `recorderHttpPolicy`
    - `createHttpClientCoreV1`

- Moving `NoOpCredential` to the new `@azure-tools/test-credential` package.

- Change the API for using variables. Variables can now be accessed using the syntax:

  ```ts
  const variable = recorder.variable(<variable name>, <value in record mode>);
  ```

  A shorthand is also added for when accessing a variable a second time in
  the same test, which does not require an initial value be set, e.g.:

  ```ts
  recorder.variable("variableName", <value in record mode>);

  // later on in your code
  const value = recorder.variable("variableName");
  ```

  [#19388](https://github.com/Azure/azure-sdk-for-js/pull/19388)

- Add `configureClient` method to the `TestProxytHttpClient` to allow instrumenting the client with the recorder policy which helps in enabling the recorder to redirect the requests of your tests to the proxy tool.

  - Also un-exports `recorderHttpPolicy` function.
    [#19362](https://github.com/Azure/azure-sdk-for-js/pull/19362)

- Add support for `setMatcher`, which can be used to instruct the proxy tool to ignore headers (using `HeaderlessMatcher`) or the request body (using `BodilessMatcher`) when matching requests to recordings.

  Example:

  ```ts
  await recorder.setMatcher("HeaderlessMatcher");
  ```

- Loads the .env file using with the help of "dotenv" by default.
  [#19139](https://github.com/Azure/azure-sdk-for-js/pull/19139)

- Adds NoOp AAD Credential for playback `NoOpCredential`. Using this as your AAD credential in playback mode would avoid the AAD traffic in playback.
  [#18904](https://github.com/Azure/azure-sdk-for-js/pull/18904)

- Allows storing dynamically created variables in record mode. The recorder registers the variables as part of the recording and stores their values in the recording file. Using the `variables` in playback mode produces the key-value pairs that were stored in the recording file.

  Example:

  ```ts
  if (!isPlaybackMode()) {
    recorder.variables["random-1"] = `random-${Math.ceil(Math.random() * 1000 + 1000)}`;
  }
  ```

  Use `recorder.variables["random-1"]` to access the value of the variable after setting it. The variable can be accessed in all three modes -- record, playback, and live -- as long as it is set in record mode before it is accessed.

  [#17379](https://github.com/Azure/azure-sdk-for-js/pull/17379)

- Added `addSanitizers` method to support
  - BodyKeySanitizer
  - BodyRegexSanitizer
  - GeneralRegexSanitizer
  - HeaderRegexSanitizer
  - RemoveHeaderSanitizer
  - UriRegexSanitizer
  - UriSubscriptionIdSanitizer
  - Connection String sanitizer
- Adds `SanitizerOptions`, env setup for playback as the options of the `start()` method
  - Applies `generalRegexSanitizers` on the env setup for playback options by default to eliminate any plain text secrets in the recordings
- Testing - All the tests are run in the `recorder-new` folder run in all three modes - "record", "playback" and "live" everytime the test commands are run

  [#17388](https://github.com/Azure/azure-sdk-for-js/pull/17388)

- `TestProxyClient` now takes the test context to determine the location of the recordings.
- Adds a server for the tests, to play the role of an actual service to be able to test the proxy-tool end-to-end.

- Building the unified recorder prototype leveraging the proxy-tool, works for both core-v1 and core-v2 SDKs. Shows data-tables and storage-queue as examples for core-v2 and core-v1 respectively.
  [#15826](https://github.com/Azure/azure-sdk-for-js/pull/15826)
